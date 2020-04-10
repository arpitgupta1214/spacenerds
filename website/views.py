from django.shortcuts import render
from django.http import HttpResponse
import json
from .models import Contact


def home(request):
    user = request.user
    if str(user) == "AnonymousUser":
        logged_in = False
        context = {"logged_in": logged_in}
        return render(request, "website/home.html", context)
    else:
        logged_in = True
        print(user.first_name)
        context = {"logged_in": logged_in, "fname": user.first_name}
        return render(request, "website/home.html", context)


def contact(request):
    data = json.loads(request.body)
    Contact(
        fname=data["fname"],
        lname=data["lname"],
        email=data["email"],
        reason=data["reason"],
        message=data["message"],
    ).save()
    return HttpResponse(request.body)
