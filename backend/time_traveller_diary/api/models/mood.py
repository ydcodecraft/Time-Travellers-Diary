from django.db import models
import uuid


# represent the mood our time traveller is in
class Mood(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    label = models.CharField(max_length=20)
    
    def __str__(self):
        return self.label