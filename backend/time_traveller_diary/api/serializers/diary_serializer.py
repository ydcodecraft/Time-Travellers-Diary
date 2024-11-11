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
    diary_entries = DiaryEntryUpdateCreateSerializer(many=True, allow_null=True)
    class Meta:
        model = Diary
        fields = ['date', 'is_active', 'diary_entries']
        read_only_fields = ['id', 'time_traveller']

    # need to override this method because we are creating diary and diary entries in a sigle API call
    # DRF doens't support nested serialzier creation by default
    def create(self, validated_data):
        diary_entries = validated_data.pop('diary_entries', [])

        diary = Diary.objects.create(**validated_data)

        for diary_entry in diary_entries:
            DiaryEntry.objects.create(diary=diary, **diary_entry)

            return diary