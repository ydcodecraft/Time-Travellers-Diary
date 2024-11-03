from rest_framework import serializers

from api.models.diary import Diary

class DiarySerializer(serializers.ModelSerializer):
    class Meta:
        model = Diary
        fields = "__all__"