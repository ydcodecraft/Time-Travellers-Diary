from django.db import models
import uuid 

from .time_traveller import TimeTraveller

# represent a single diary object, there is only one diary per day but there can be many diary entries for that diary 
class Diary(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    time_traveller = models.ForeignKey(TimeTraveller, on_delete=models.CASCADE, related_name='diary')
    title = models.CharField(max_length=200)
    date = models.DateField()
    is_active = models.BooleanField(default=True)

    # metadata
    # created_date_time = models.DateTimeField(auto_now_add=True)
    # updated_date_time = models.DateTimeField(auto_now=True, auto_now_add=True)

    def __str__(self):
        return self.title
    
    def delete(self, *args, **kwargs):
        self.is_active = False
        self.save()