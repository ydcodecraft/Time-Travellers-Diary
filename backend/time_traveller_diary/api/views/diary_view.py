from rest_framework import status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import generics, mixins
from rest_framework.permissions import IsAuthenticated

from drf_spectacular.utils import extend_schema, OpenApiParameter

from api.models.diary import Diary
from api.serializers.diary_serializer import DiaryCreateSerializer, DiarySerializer
from api.models.time_traveller import TimeTraveller
from api.models.app_user import AppUser



# handle creation and listing all diaries
class DiaryListCreateView(mixins.CreateModelMixin, generics.GenericAPIView):
    serializer_class = DiarySerializer

    # def get_serializer_class(self):
    #     if self.request.method == 'POST':
    #         return DiaryCreateSerializer
    #     return DiarySerializer


    # set this up to use drf spectacular to annotate the swagger doc
    @extend_schema(
        responses={200: DiarySerializer(many=True)}
    )
    def get(self, request, *args, **kwargs):
        app_user = AppUser.objects.get(username=self.request.user)
        
        if hasattr(app_user, 'time_traveller') is False:
            content = {'Time Traveller Not Found':'You have not created a time traveller for this account yet!'}
            return Response(content, status=status.HTTP_404_NOT_FOUND)
        
        time_traveller = TimeTraveller.objects.get(user=app_user)
        diary_list = Diary.objects.filter(time_traveller=time_traveller)
        serializer = self.get_serializer(diary_list, many=True)
        return Response(serializer.data, status=status.HTTP_200_OK)
    
    # Automatically set the time traveller to the logged-in time traveller when creating a diary entry
    def post(self, request, *args, **kwargs):
        serializer = DiaryCreateSerializer(data=request.data)
        # have to call is_valid before i can call .save()
        serializer.is_valid(raise_exception=True)

        # Get the time_traveller for the currently logged-in user
        time_traveller = TimeTraveller.objects.get(user=self.request.user)
        diary = serializer.save(time_traveller=time_traveller)
        
        # Use DiarySerializer to serialize the full diary object for the response
        response_serializer = DiarySerializer(diary)
        
        return Response(response_serializer.data, status=status.HTTP_201_CREATED)
    


# get, delete, update specific diary entry 
class DiaryRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    serializer_class = DiarySerializer

    # Return a specific diary entry for the logged-in user
    def get_queryset(self):
        # get the time traveller for the currently logged in user
        time_traveller = TimeTraveller.objects.get(user=self.request.user)

        return Diary.objects.filter(time_traveller=time_traveller)

# @api_view()
# def authorized_heart_beat_test(request):
#     return Response("You have to be authorized to see this!")

