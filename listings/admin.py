from django.contrib import admin
from listings.models import Rumah, Kamar, Poi, Transaction, Review
from .forms import PoisForm

class PoiAdmin(admin.ModelAdmin):
    form = PoisForm
    list_display = ('name', 'type', 'location')
    list_filter = ('type',)
    search_fields = ('name',)

class KamarInline(admin.TabularInline):
    model = Kamar



class TransactionAdmin(admin.ModelAdmin):
    list_display = ('kamar', 'user', 'customer', 'nominal', 'rentalFrequency', 'date', 'approve')
    list_filter = ('approve', 'rentalFrequency', 'date')
    search_fields = ('kamar__address_room', 'user__username')

class ReviewInline(admin.TabularInline):
    model = Review
    fields = ['rumah', 'user', 'comment', 'rate']

class RumahAdmin(admin.ModelAdmin):
    list_display = ('title', 'user', 'date_posted')
    list_filter = ('user', 'date_posted')
    search_fields = ('title', 'user__username')
    inlines = [KamarInline, ReviewInline]

admin.site.register(Rumah, RumahAdmin)
admin.site.register(Poi, PoiAdmin)
admin.site.register(Transaction, TransactionAdmin)

