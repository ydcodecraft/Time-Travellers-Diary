from rest_framework import serializers
from drf_spectacular.utils import extend_schema_field

from api.models.diary_entry import DiaryEntry
from api.serializers.mood_serializer import MoodSerializer
from api.serializers.time_period_serializer import TimePeriodSerializer

class DiaryEntrySerializer(serializers.ModelSerializer):
    mood = serializers.SerializerMethodField()
    time_period = serializers.SerializerMethodField()

    class Meta:
        model = DiaryEntry
        fields = ["id", "diary", "time", "description", "mood", "time_period", "is_active"]

    # change the mood field from the uuid to an object of uuid and its label
    @extend_schema_field(MoodSerializer)
    def get_mood(sef, obj):
        if obj.mood:
            return {
                'id': str(obj.mood.id),
                'label': obj.mood.label
            }
        return None

    # change the time_period field from the uuid to an object of uuid and its label
    @extend_schema_field(TimePeriodSerializer)
    def get_time_period(self, obj):
        if obj.time_period:
            return {
                'id': str(obj.time_period.id),
                'label': obj.time_period.label
            }
        return None


class DiaryEntryUpdateCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = DiaryEntry
        fields = ["diary", "description", "mood", "time_period"]