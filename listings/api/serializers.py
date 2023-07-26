from rest_framework import serializers
from listings.models import Rumah, Poi, Transaction, Review
from django.contrib.gis.measure import D
from django.contrib.gis.geos import Point


class ListingSerializer(serializers.ModelSerializer):
    country = serializers.SerializerMethodField()
    user_username = serializers.SerializerMethodField()
    # user_agency_name = serializers.SerializerMethodField()
    listing_pois_within_10km = serializers.SerializerMethodField()

    def get_listing_pois_within_10km(self, obj):
        listing_location = Point(obj.latitude, obj.longitude, srid=4326)
        query = Poi.objects.filter(
            location__distance_lte=(listing_location, D(km=3)))
        query_serialized = PoiSerializer(query, many=True)
        return query_serialized.data
    
    # def get_user_agency_name(self, obj):
    #     return obj.user.agency_name

    def get_user_username(self, obj):
        return obj.owner.user.username


    def get_country(self, obj):
        return "Indonesia"

    class Meta:
        model = Rumah
        fields = '__all__'


class PoiSerializer(serializers.ModelSerializer):
    class Meta:
        model = Poi
        fields = '__all__'
        
class TransactionSerializer(serializers.ModelSerializer):
    listing_title = serializers.ReadOnlyField(source='rumah.title')
    class Meta:
        model = Transaction
        fields = ['id', 'rumah', 'listing_title', 'customer', 'buktiTransfer', 'fullName', 'phoneNumber', 'rentalFrequency', 'date', 'barang_dipesan', 'barang_dibeli']

class ReviewSerializer(serializers.ModelSerializer):
    user_username = serializers.ReadOnlyField(source='customer.user.username')
    class Meta:
        model = Review
        fields = ['customer', 'rumah', 'rate', 'comment', 'create_at', 'user_username']