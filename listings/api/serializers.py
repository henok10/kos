from rest_framework import serializers
from listings.models import Rumah, Poi, Transaction, Review, Kamar, FasilitasKamar, FasilitasRumah
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
        return obj.user.username


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
    addressRoom = serializers.ReadOnlyField(source='kamar.address_room')
    rumah = serializers.ReadOnlyField(source='kamar.rumah.id')
    fullName = serializers.ReadOnlyField(source='user.customer.full_name')
    phoneNumber = serializers.ReadOnlyField(source='user.customer.phone_number') 

    class Meta:
        model = Transaction
        fields = ['id', 'kamar', 'rumah', 'listing_title', 'addressRoom', 'user', 'buktiTransfer', 'fullName', 'phoneNumber', 'rentalFrequency', 'nominal', 'date', 'approve']



class ReviewSerializer(serializers.ModelSerializer):
    user_username = serializers.ReadOnlyField(source='user.username')
    class Meta:
        model = Review
        fields = ['user', 'rumah', 'rate', 'comment', 'create_at', 'user_username']

# class KamarSerializer(serializers.ModelSerializer):
#     kamar_transaksi = serializers.SerializerMethodField()
#     Fasilitas_kamar = serializers.SerializerMethodField()

#     def get_kamar_transaksi(self, obj):
#         query = Transaction.objects.filter(kamar=obj)  # Menggunakan obj yang merupakan objek Kamar
#         transaction_serialized = TransactionSerializer(query, many=True)
#         return transaction_serialized.data

#     def get_fasilitas_kamar(self, obj):
#         query = FasilitasKamar.objects.filter(kamar=obj)  # Menggunakan obj yang merupakan objek Kamar
#         Fasilitaskamar_serialized = FasilitasKamarSerializer(query, many=True)
#         return Fasilitaskamar_serialized.data


#     class Meta:
#         model = Kamar
#         fields = '__all__'



class FasilitasKamarSerializer(serializers.ModelSerializer):
    class Meta:
        model = FasilitasKamar
        fields = '__all__'

class FasilitasRumahSerializer(serializers.ModelSerializer):
    class Meta:
        model = FasilitasRumah
        fields = '__all__'

class KamarSerializer(serializers.ModelSerializer):
    fasilitaskamar_set = FasilitasKamarSerializer(many=True, required=False)

    class Meta:
        model = Kamar
        fields = '__all__'

    def create(self, validated_data):
        fasilitaskamar_data = validated_data.pop('fasilitaskamar_set', [])
        kamar = Kamar.objects.create(**validated_data)

        for fasilitas_data in fasilitaskamar_data:
            FasilitasKamar.objects.create(kamar=kamar, **fasilitas_data)

        return kamar