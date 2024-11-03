from rest_framework import serializers

from time_traveller_diary.api.models.app_user import AppUser


class AppUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = AppUser
        fields = "__all__"