from rest_framework import generics

from api.serializers.diary_entry_serializer import DiaryEntrySerializer, DiaryEntryUpdateCreateSerializer
from api.models.diary_entry import DiaryEntry


class DiaryEntryListCreateView(generics.ListCreateAPIView):
    queryset = DiaryEntry.objects.all()
    serializer_class = DiaryEntrySerializer

    def get_serializer_class(self):
        if (self.request.method == 'GET'):
            return DiaryEntrySerializer
        return DiaryEntryUpdateCreateSerializer


class DiaryEntryRetrieveUpdateDestroyView(generics.RetrieveUpdateDestroyAPIView):
    queryset = DiaryEntry.objects.all()
    serializer_class = DiaryEntrySerializer


    def get_serializer_class(self):
        if (self.request.method == 'PATCH' or self.request.method == 'PUT'):
            return DiaryEntryUpdateCreateSerializer
        return DiaryEntrySerializer

    