from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Customer, Owner

class Customerline(admin.TabularInline):
    model = Customer

class Ownerline(admin.TabularInline):
    model = Owner

class Admins(UserAdmin):
    fieldsets = (
        (None, {'fields': ('email', 'password')}),
        ('Permissions', {'fields': ('is_active', 'is_staff', 'is_superuser', 'is_customer', 'is_owner')}),
    )
    list_display = ['email', 'is_customer', 'is_owner']
    search_fields = ['email', 'username']
    list_filter = ['is_customer', 'is_owner']

    # Fungsi untuk menentukan inline instances yang akan ditampilkan
    def get_inline_instances(self, request, obj=None):
        if obj and obj.is_customer:
            return [Customerline(self.model, self.admin_site)]
        elif obj and obj.is_owner:
            return [Ownerline(self.model, self.admin_site)]
        return []

# Registrasi model User dengan Admins
admin.site.register(User, Admins)
