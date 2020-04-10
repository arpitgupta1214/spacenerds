from django.db import models

class Contact(models.Model):
    fname = models.CharField(max_length=50, verbose_name="First Name")
    lname = models.CharField(max_length=50, verbose_name="Last Name")
    email = models.EmailField()
    reason = models.CharField(max_length=20,choices=[("a","assistance"), ("i","information")])
    message = models.TextField(max_length=500)
    def __str__(self):
        return self.email
    
