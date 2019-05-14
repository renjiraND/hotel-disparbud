from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import Hotel # User, Hotel
from django.contrib.auth import get_user_model
from django.contrib.auth.forms import UserChangeForm

User = get_user_model()

class MyUserChangeForm(UserChangeForm):
    class Meta(UserChangeForm.Meta):
        model = User

class MyUserAdmin(UserAdmin):
    form = MyUserChangeForm

    fieldsets = UserAdmin.fieldsets + (
            (None, {'fields': ('name', 'is_lsu',)}),
    )


admin.site.register(User, MyUserAdmin)

admin.site.register(Hotel)
