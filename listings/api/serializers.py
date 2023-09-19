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
    price_day = serializers.SerializerMethodField() 
    price_month = serializers.SerializerMethodField() 
    price_year = serializers.SerializerMethodField() 

    def get_price_day(self, obj):
    # Get the first related Kamar instance or None if there are none
        kamar_instance = obj.kamar.first()

        if kamar_instance:
            return kamar_instance.price_day
        else:
            return None
    
    def get_price_month(self, obj):
    # Get the first related Kamar instance or None if there are none
        kamar_instance = obj.kamar.first()

        if kamar_instance:
            return kamar_instance.price_month
        else:
            return None
    
    def get_price_year(self, obj):
    # Get the first related Kamar instance or None if there are none
        kamar_instance = obj.kamar.first()

        if kamar_instance:
            return kamar_instance.price_year
        else:
            return None

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
    addressKamar = serializers.ReadOnlyField(source='kamar.rumah.address')
    addressRoom = serializers.ReadOnlyField(source='kamar.address_room')
    rumah = serializers.ReadOnlyField(source='kamar.rumah.id')
    noRekening = serializers.ReadOnlyField(source='kamar.rumah.no_rekening')
    fullName = serializers.ReadOnlyField(source='user.customer.full_name')
    phoneNumber = serializers.ReadOnlyField(source='user.customer.phone_number') 

    class Meta:
        model = Transaction
        fields = ['id', 'kamar', 'rumah', 'noRekening', 'listing_title', 'addressKamar', 'addressRoom', 'user', 'buktiTransfer', 'fullName', 'phoneNumber', 'rentalFrequency', 'nominal', 'date', 'approve']

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

# class FasilitasKamarSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = FasilitasKamar
#         fields = '__all__'

class TransactionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = '__all__'

class KamarSerializer(serializers.ModelSerializer):
    fasilitaskamar = FasilitasKamarSerializer(many=True, read_only=True)
    approvekamar = serializers.SerializerMethodField()

    def get_approvekamar(self, obj):
        transactions = Transaction.objects.filter(kamar=obj)
        return TransactionsSerializer(transactions, many=True).data

    class Meta:
        model = Kamar
        fields = ['id', 'rumah', 'fasilitaskamar', 'approvekamar', 'price_day', 'price_month', 'price_year', 'picture_room', 'room_size', 'address_room', 'barang_dipesan']
