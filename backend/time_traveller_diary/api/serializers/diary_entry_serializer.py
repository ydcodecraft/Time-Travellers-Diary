from rest_framework import serializers

from api.models.diary_entry import DiaryEntry

class DiaryEntrySerializer(serializers.ModelSerializer):
    class Meta:
        model = DiaryEntry
        fields = "__all__"