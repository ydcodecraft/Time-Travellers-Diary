from django.urls import path

from .views import diary_view, diary_entry_view, time_traveller_view, time_period_view, mood_view


urlpatterns = [
    path('diary/', diary_view.DiaryListCreateView.as_view(), name='diary_list_create'),
    path('diary/<uuid:pk>/', diary_view.DiaryRetrieveUpdateDestroyView.as_view(), name='diary_retrieve_update_destroy'),
    path('diary_entry/', diary_entry_view.DiaryEntryListCreateView.as_view(), name='diary_entry_list_create'),
    path('diary_entry/<uuid:pk>/', diary_entry_view.DiaryEntryRetrieveUpdateDestroyView.as_view(), name='diary_entry_retrieve_update_destroy'),
    path('time_traveller/', time_traveller_view.TimeTravellerListCreateView.as_view(), name="time_traveller_list_create"),
    path('time_traveller/<uuid:pk>/', time_traveller_view.TimeTravellerRetrieveUpdateDestroyView.as_view(), name="time_traveller_retrieve_update_destroy"),
    path('time_period/', time_period_view.TimePeriodListCreateView.as_view(), name='time_period_list_create'),
    path('time_period/<uuid:pk>/', time_period_view.TimePeriodRetrieveUpdateDestroyView.as_view(), name='time_period_retrieve_update_destroy'),
    path('mood/', mood_view.MoodListCreateView.as_view(), name='mood_list_create'),
    path('mood/<uuid:pk>/', mood_view.MoodRetrieveUpdateDestroyView.as_view(), name='mood_retrieve_update_destroy'),


    # path('authorized_heart_beat_test', diary_view.authorized_heart_beat_test),
]

