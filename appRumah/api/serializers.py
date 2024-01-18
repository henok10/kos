from rest_framework import serializers
from appRumah.models import Rumah, Poi, Transaction, Review, Kamar, FasilitasKamar, FasilitasRumah, RuleRumah
from appUsers.models import Customer
from django.contrib.gis.measure import D
from django.contrib.gis.db.models.functions import Distance
from django.contrib.gis.geos import Point


class ListingSerializer(serializers.ModelSerializer):
    country = serializers.SerializerMethodField()
    user_username = serializers.SerializerMethodField()
    listing_poi = serializers.SerializerMethodField()
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

    def get_listing_poi(self, obj):
        listing_location = Point(obj.latitude, obj.longitude, srid=4326)
        query = Poi.objects.filter(
            location__distance_lte=(listing_location, D(km=4))
        ).annotate(
            distance=Distance('location', listing_location)
        ).order_by('distance')

        query_serialized = PoiSerializer(query, many=True)

        return query_serialized.data

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
    phoneNumber = serializers.ReadOnlyField(
        source='user.customer.phone_number')

    class Meta:
        model = Transaction
        fields = ['id', 'kamar', 'rumah', 'noRekening', 'listing_title', 'addressKamar', 'addressRoom',
                  'user', 'buktiTransfer', 'fullName', 'phoneNumber', 'rentalFrequency', 'nominal', 'date', 'approve']


class ReviewSerializer(serializers.ModelSerializer):
    user_username = serializers.ReadOnlyField(source='user.username')

    class Meta:
        model = Review
        fields = ['id', 'user', 'rumah', 'rate',
                  'comment', 'create_at', 'user_username']


class FasilitasKamarSerializer(serializers.ModelSerializer):
    class Meta:
        model = FasilitasKamar
        fields = '__all__'


class FasilitasRumahSerializer(serializers.ModelSerializer):
    class Meta:
        model = FasilitasRumah
        fields = '__all__'


class RuleRumahSerializer(serializers.ModelSerializer):
    class Meta:
        model = RuleRumah
        fields = '__all__'

# class RuleKamarSerializer(serializers.ModelSerializer):
#     class Meta:
#         model = RuleKamar
#         fields = '__all__'


class TransactionsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Transaction
        fields = '__all__'


class KamarSerializer(serializers.ModelSerializer):
    fasilitaskamar = FasilitasKamarSerializer(many=True, read_only=True)
    # rulekamar = RuleKamarSerializer(many=True, read_only=True)
    approvekamar = serializers.SerializerMethodField()

    def get_approvekamar(self, obj):
        transactions = Transaction.objects.filter(kamar=obj)
        return TransactionsSerializer(transactions, many=True).data

    class Meta:
        model = Kamar
        fields = ['id', 'rumah', 'fasilitaskamar', 'approvekamar', 'price_day', 'price_month',
                  'price_year', 'picture_room', 'room_size', 'address_room', 'barang_dipesan']
