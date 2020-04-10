from django.urls import path
from . import views

urlpatterns = [
    path("login/", views.loginView, name="login"),
    path("logout/", views.signout, name="logout"),
    path("profile/", views.profile, name="profile"),
    path("signup/", views.signup, name="signup")
]
