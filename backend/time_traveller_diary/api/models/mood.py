from django.db import models


# represent the mood our time traveller is in
class Mood(models.Model):
    label = models.CharField(max_length=20)
    
    def __str__(self):
        return self.label