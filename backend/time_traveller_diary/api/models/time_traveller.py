from django.db import models

from time_traveller_diary.api.models.app_user import AppUser

# our hero in the story of their own diary
class TimeTraveller(models.Model):
    user = models.OneToOneField(AppUser, on_delete=models.CASCADE)
    character_name = models.CharField(max_length=150)
    
