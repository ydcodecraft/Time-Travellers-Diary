from rest_framework import serializers

from api.models.diary_entry import DiaryEntry

class DiaryEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = DiaryEntry
        fields = "__all__"


class DiaryEntryCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = DiaryEntry
        fields = ["description", "mood", "time_period"]