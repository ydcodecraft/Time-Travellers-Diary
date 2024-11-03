from rest_framework import serializers

from time_traveller_diary.api.models.time_traveller import TimeTraveller


class TimeTravellerSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimeTraveller
        fields = "__all__"