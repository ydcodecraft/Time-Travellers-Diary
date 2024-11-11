from rest_framework import generics
from api.serializers.mood_serializer import MoodSerializer
from api.models.mood import Mood


class MoodListCreateView(generics.ListCreateAPIView):
    queryset = Mood.objects.all()
    serializer_class = MoodSerializer
    

class MoodRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = Mood.objects.all()
    serializer_class = MoodSerializer