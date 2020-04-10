from django.contrib import admin
from .models import Contact

class ContactsAdmin(admin.ModelAdmin):
    fields = (('fname','lname'),'email','reason','message')
    
    def has_add_permission(self, request):
        return False

    def has_change_permission(self, request, obj=None):
        return False

admin.site.register(Contact, ContactsAdmin)