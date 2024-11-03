from rest_framework import status
from rest_framework.response import responses
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated

from api.models.diary import Diary
from api.serializers.diary_serializer import DiarySerializer
from api.models.time_traveller import TimeTraveller


# handle creation and listing all diaries
class DiaryCreateListView(generics.ListCreateAPIView):
    serializer_class = DiarySerializer
    # permission_classes = [IsAuthenticated]

    # return diaries for currently logged in time traveller
    def get_queryset(self):
        # get the time traveller for the currently logged in user
        time_traveller = TimeTraveller.objects.get(user=self.request.user)
        
        return Diary.objects.filter(time_traveller=time_traveller)

    # Automatically set the time traveller to the logged-in time traveller when creating a diary entry
    def perform_create(self, serializer):
        # get the time traveller for the currently logged in user
        time_traveller = TimeTraveller.objects.get(user=self.request.user)

        serializer.save(time_traveller=time_traveller)

# get, delete, update specific diary entry 
class DiarySingleView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Diary.objects.all()
    serializer_class = DiarySerializer
    permission_classes = [IsAuthenticated]

    # Return a specific diary entry for the logged-in user
    def get_queryset(self):
        # get the time traveller for the currently logged in user
        time_traveller = TimeTraveller.objects.get(user=self.request.user)

        return Diary.objects.filter(time_traveller=time_traveller)

