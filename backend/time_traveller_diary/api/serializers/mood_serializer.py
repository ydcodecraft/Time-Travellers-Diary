from rest_framework import serializers

from time_traveller_diary.api.models.mood import Mood


class MoodSerializer(serializers.ModelSerializer):
    class Meta:
        model = Mood
        fields = "__all__"