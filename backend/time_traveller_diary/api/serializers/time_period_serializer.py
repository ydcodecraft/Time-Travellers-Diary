from rest_framework import serializers

from time_traveller_diary.api.models.time_period import TimePeriod


class TimePeriodSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimePeriod
        fields = "__all__"