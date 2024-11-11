from rest_framework import serializers

from api.models.time_traveller import TimeTraveller


class TimeTravellerSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimeTraveller
        fields = "__all__"


class TimeTravellerCreateSerializer(serializers.ModelSerializer):
    class Meta:
        model = TimeTraveller
        fields = ["character_name", "age"]