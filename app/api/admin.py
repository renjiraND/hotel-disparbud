from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Hotel
# Register your models here.
class UserAdminPage(UserAdmin):
    pass
admin.site.register(User, UserAdminPage)
admin.site.register(Hotel)
