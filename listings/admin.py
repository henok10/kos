from django.contrib import admin
from listings.models import Rumah
from listings.models import Poi, Transaction, Review
from .forms import PoisForm

class PoiAdmin(admin.ModelAdmin):
    form = PoisForm


admin.site.register(Rumah)
admin.site.register(Poi, PoiAdmin)
admin.site.register(Transaction)
admin.site.register(Review)

