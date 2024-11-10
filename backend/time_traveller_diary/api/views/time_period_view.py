from rest_framework import generics
from api.serializers.time_period_serializer import TimePeriodSerializer
from api.models.time_period import TimePeriod


class TimePeriodListCreateView(generics.ListCreateAPIView):
    queryset = TimePeriod.objects.all()
    serializer_class = TimePeriodSerializer


class TimePeriodRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = TimePeriod.objects.all()
    serializer_class = TimePeriodSerializer