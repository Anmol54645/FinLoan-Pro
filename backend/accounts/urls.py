from django.urls import path
from .views import RegisterView, UserInfoView

urlpatterns = [
    path("register/", RegisterView.as_view()),
    path("me/", UserInfoView.as_view()),
]