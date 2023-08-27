from django.contrib import admin
from listings.models import Rumah, Kamar
from listings.models import Poi, Transaction, Review, FasilitasKamar, FasilitasRumah
from .forms import PoisForm

class PoiAdmin(admin.ModelAdmin):
    form = PoisForm


admin.site.register(Rumah)
admin.site.register(Poi, PoiAdmin)
admin.site.register(Transaction)
admin.site.register(Review)
admin.site.register(Kamar)
# admin.site.register(FasilitasKamar)
# admin.site.register(FasilitasRumah)

