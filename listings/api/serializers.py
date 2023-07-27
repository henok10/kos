from rest_framework import serializers
from listings.models import Rumah, Poi, Transaction, Review, Kamar
from users.models import Customer
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
    listing_title = serializers.ReadOnlyField(source='kamar.rumah.title')
    rumahId = serializers.ReadOnlyField(source='kamar.rumah.id')
    fullName = serializers.ReadOnlyField(source='customer.full_name')
    phoneNumber = serializers.ReadOnlyField(source='customer.phone_number')
    
    class Meta:
        model = Transaction
        fields = ['id', 'kamar', 'rumahId', 'listing_title', 'customer', 'buktiTransfer', 'fullName', 'phoneNumber', 'rentalFrequency', 'nominal', 'date', 'barang_dipesan', 'approve']

class ReviewSerializer(serializers.ModelSerializer):
    user_username = serializers.ReadOnlyField(source='customer.user.username')
    class Meta:
        model = Review
        fields = ['customer', 'rumah', 'rate', 'comment', 'create_at', 'user_username']

class KamarSerializer(serializers.ModelSerializer):
    # user_username = serializers.ReadOnlyField(source='customer.user.username')
    class Meta:
        model = Kamar
        fields = '__all__'