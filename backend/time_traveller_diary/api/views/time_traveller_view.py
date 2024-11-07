from rest_framework import generics

from api.serializers.time_traveller_serializer import TimeTravellerSerializer
from api.models.time_traveller import TimeTraveller


class TimeTravellerListCreateView(generics.ListCreateAPIView):
    queryset = TimeTraveller.objects.all()
    serializer_class = TimeTravellerSerializer