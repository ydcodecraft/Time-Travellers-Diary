from django.db import models
from django.core.validators import MaxValueValidator
import uuid

from .app_user import AppUser

# our hero in the story of their own diary
class TimeTraveller(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    user = models.OneToOneField(AppUser, on_delete=models.CASCADE, related_name="time_traveller")
    character_name = models.CharField(max_length=150)
    age = models.IntegerField(validators=[MaxValueValidator(99)])
