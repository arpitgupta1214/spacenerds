from django.shortcuts import render
from django.http import JsonResponse
from django.http import HttpResponse
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.models import User
import json


def loginView(request):
    if request.method == "GET":
        if str(request.user) == "AnonymousUser":
            return render(request, "authsystem/login.html")
        else:
            return HttpResponse("Already logged in")
    else:
        data = json.loads(request.body)
        user = authenticate(username=data["username"], password=data["password"])
        if user:
            login(request, user)
            return JsonResponse({"response": "OK"})
        else:
            return JsonResponse({"response": "Fail"})


def profile(request):
    if str(request.user) == "AnonymousUser":
        return HttpResponse("Please login to view this page")
    else:
        context = {
            "fname": request.user.first_name,
            "lname": request.user.last_name,
            "username": request.user.username,
            "email": request.user.email,
        }
        return render(request, "authsystem/profile.html", context)


def signout(request):
    if request.method == "GET":
        return HttpResponse("Oops! Looks like something is wrong")
    else:
        user = request.user
        if str(user) == "AnonymousUser":
            return HttpResponse("Oops! Looks like something is wrong")
        else:
            logout(request)


def signup(request):
    if request.method == "GET":
        return render(request, "authsystem/signup.html")
    else:
        data = json.loads(request.body)
        username = data["username"]
        email = data["email"]
        usernameExists = False
        emailExists = False
        if User.objects.filter(username=username).first():
            usernameExists = True
        if User.objects.filter(email=email).first():
            emailExists = True
        if not usernameExists and not emailExists:
            User.objects.create_user(
                username=username,
                password=data["password"],
                email=email,
                first_name=data["fname"],
                last_name=data["lname"],
            )
        return JsonResponse(
            {"emailExists": emailExists, "usernameExists": usernameExists}
        )
