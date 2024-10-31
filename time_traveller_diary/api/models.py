from django.db import models

# can potentially separate this file into multiple files if the application ends up bigger
# Django doesn't seem to mind having multiple models in the same file based on their documentation


# our hero in the story of their own diary
class TimeTraveller(models.Model):
    pass

# represent the mood our time traveller is in
class Mood(models.Model):
    label = models.CharField(max_length=20)
    
    def __str__(self):
        return self.label

# represent the time period our time traveller can traverse
class TimePeriod(models.Model):
    pass

# represent a single diary object, there is only one diary per day but there can be many diary entries for that diary 
class Diary(models.Model):
    user = models.ForeignKey(TimeTraveller, on_delete=models.CASCADE, related_name='diary')
    title = models.CharField(max_length=200)
    date = models.DateField()

    # metadata
    created_date_time = models.DateTimeField(auto_now_add=True)
    updated_date_time = models.DateTimeField(auto_now=True, auto_now_add=True)

    def __str__(self):
        return self.title

# The many heroics of our time travellers are stored here
# Many diary entries can be added to a single diary, becasue many things may happen in one day
class DiaryEntry(models.Model):
    diary = models.ForeignKey(Diary, on_delete=models.CASCADE, related_name='diary_entries')
    title = models.CharField(max_length=200)
    time = models.TimeField(auto_now_add=True)
    description = models.TextField()
    mood = models.models.ForeignKey(Mood, on_delete=models.SET_NULL)
    # should default a value for this? maybe do it in the service layer rather than DB layer
    time_period = models.ForeignKey(TimePeriod, on_delete=models.SET_DEFAULT)
    

    def __str__(self):
        return self.title



