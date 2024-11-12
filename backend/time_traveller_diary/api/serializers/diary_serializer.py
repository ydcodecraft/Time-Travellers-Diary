from rest_framework import serializers

from api.models.diary import Diary
from api.models.diary_entry import DiaryEntry
from api.serializers.diary_entry_serializer import DiaryEntryUpdateCreateSerializer, DiaryEntrySerializer

class DiarySerializer(serializers.ModelSerializer):
    diary_entries = DiaryEntrySerializer(many=True, read_only=True, allow_null=True)
    class Meta:
        model = Diary
        fields = "__all__"


class DiaryCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Diary
        fields = ['date']

    