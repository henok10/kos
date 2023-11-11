from django.contrib import admin
from appRumah.models import Rumah, Kamar, Poi, Transaction, Review
from .forms import PoisForm

class PoiAdmin(admin.ModelAdmin):
    form = PoisForm
    list_display = ('name', 'type', 'location')
    list_filter = ('type',)
    search_fields = ('name',)


admin.site.register(Poi, PoiAdmin)


