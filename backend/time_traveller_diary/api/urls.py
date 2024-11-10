from django.urls import path
from .views import diary_view, time_traveller_view


urlpatterns = [
    path('diary/', diary_view.DiaryListCreateView.as_view(), name='diary_list_create'),
    # path('diary/', diary_view.DiaryCreateView.as_view(), name='diary_create'),
    path('diary/<uuid:pk>/', diary_view.DiaryRetrieveUpdateDestroyView.as_view(), name='diary_retrieve_update_destroy'),
    path('time_traveller/', time_traveller_view.TimeTravellerListCreateView.as_view(), name="time_traveller_list_create"),
    # path('authorized_heart_beat_test', diary_view.authorized_heart_beat_test),
]

