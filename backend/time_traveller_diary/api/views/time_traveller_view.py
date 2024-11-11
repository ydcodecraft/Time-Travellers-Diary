from django.shortcuts import get_object_or_404
from rest_framework import generics

from api.serializers.time_traveller_serializer import TimeTravellerCreateSerializer, TimeTravellerSerializer
from api.models.time_traveller import TimeTraveller
from api.models.app_user import AppUser


class TimeTravellerListCreateView(generics.ListCreateAPIView):
    queryset = TimeTraveller.objects.all()
    serializer_class = TimeTravellerSerializer

    def get_serializer_class(self):
        if self.request.method == 'POST':
            return TimeTravellerCreateSerializer
        return TimeTravellerSerializer
    
    # Automatically set the time traveller to the logged-in time traveller when creating a diary entry
    def perform_create(self, serializer):
        # get the time traveller for the currently logged in user
        serializer.save(user=self.request.user)



class TimeTravellerRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = TimeTraveller.objects.all()
    serializer_class = TimeTravellerSerializer


class CheckTimeTravellerExistView(generics.RetrieveAPIView):
    serializer_class = TimeTravellerSerializer
    
    def get_object(self):
        print(self.kwargs['user_name'])
        appUser = AppUser.objects.get(username=self.kwargs['user_name'])
        return get_object_or_404(TimeTraveller, user_id=appUser.id)

    