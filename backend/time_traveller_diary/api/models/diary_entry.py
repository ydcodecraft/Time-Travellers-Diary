from django.db import models
from .diary import Diary
from .mood import Mood
from .time_period import TimePeriod

# The many heroics of our time travellers are stored here
# Many diary entries can be added to a single diary, becasue many things may happen in one day
class DiaryEntry(models.Model):
    diary = models.ForeignKey(Diary, on_delete=models.CASCADE, related_name='diary_entries')
    title = models.CharField(max_length=200)
    time = models.TimeField(auto_now_add=True)
    description = models.TextField()
    mood = models.ForeignKey(Mood, on_delete=models.SET_NULL)
    # should default a value for this? maybe do it in the service layer rather than DB layer
    time_period = models.ForeignKey(TimePeriod, on_delete=models.SET_DEFAULT)
    is_active = models.BooleanField(deafult=True)
    
    
    def __str__(self):
        return self.title

    def delete(self, *args, **kwargs):
        self.is_active = False
        self.save()