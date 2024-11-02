from rest_framework import serializers

from time_traveller_diary.api.models.diary_entry import DiaryEntry

class DiaryEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = DiaryEntry
        fields = []