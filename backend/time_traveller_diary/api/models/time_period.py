from django.db import models
import uuid

# represent the time period our time traveller can traverse
class TimePeriod(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    label = models.CharField(max_length=100)