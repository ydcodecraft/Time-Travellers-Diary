from django.urls import path
from .views import diary_view


urlpatterns = [
    path('diary/', diary_view.DiaryCreateListView.as_view(), name='diary_list_create'),
    path('diary/<uuid:pk>/', diary_view.DiarySingleView.as_view(), name='diary_single'),
    path('authorized_heart_beat_test', diary_view.authorized_heart_beat_test),
]

