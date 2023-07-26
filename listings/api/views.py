from rest_framework import generics, permissions
from .serializers import ListingSerializer, TransactionSerializer, ReviewSerializer, KamarSerializer
from listings.models import Rumah, Transaction, Review, Kamar
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from users.models import User, Customer, Owner

class ListingList(generics.ListAPIView):
    queryset = Rumah.objects.all().order_by('-date_posted')
    serializer_class = ListingSerializer

class ListingUserList(generics.ListAPIView):
    serializer_class = ListingSerializer

    def get_queryset(self):
        owner_id = self.kwargs['owner']
        try:
            owner = Owner.objects.get(id=owner_id)
            queryset = Rumah.objects.filter(owner=owner).order_by('-date_posted')
        except Owner.DoesNotExist:
            queryset = Rumah.objects.none()  # Mengembalikan queryset kosong jika Owner tidak ditemukan
        return queryset

class ListingCreate(generics.CreateAPIView):
    queryset = Rumah.objects.all()
    serializer_class = ListingSerializer


class ListingDetail(generics.RetrieveAPIView):
    queryset = Rumah.objects.all()
    serializer_class = ListingSerializer


class ListingDelete(generics.DestroyAPIView):
    queryset = Rumah.objects.all()
    serializer_class = ListingSerializer


class ListingUpdate(generics.UpdateAPIView):
    queryset = Rumah.objects.all()
    serializer_class = ListingSerializer

class TransactionList(generics.ListAPIView):
    serializer_class = TransactionSerializer
    def get_queryset(self):
        rumah_id = self.kwargs['rumah']
        rumah = Rumah.objects.get(id=rumah_id)
        queryset = Transaction.objects.filter(rumah=rumah, barang_dibeli=False).order_by('-date')
        return queryset

class TransactionUpdate(generics.UpdateAPIView):
    serializer_class = TransactionSerializer
    queryset = Transaction.objects.all()

class TransactionListUser(generics.ListAPIView):
    serializer_class = TransactionSerializer
    def get_queryset(self):
        rumah_id = self.kwargs['rumah']
        rumah = Rumah.objects.get(id=rumah_id)
        queryset = Transaction.objects.filter(rumah=rumah, barang_dibeli=True).order_by('-date')
        return queryset

class TransactionUser(generics.ListAPIView):
    serializer_class = TransactionSerializer
    def get_queryset(self):
        customer_id = self.kwargs['customer']
        customer = Customer.objects.get(id=customer_id)
        queryset = Transaction.objects.filter(customer=customer).order_by('-date')
        return queryset
    
class TransactionCreate(generics.CreateAPIView):
    serializer_class = TransactionSerializer
    queryset = Transaction.objects.all()

class TransactionDetail(generics.RetrieveAPIView):
    serializer_class = TransactionSerializer
    queryset = Transaction.objects.all()

class TransactionDelete(generics.DestroyAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer

class ReviewCreate(generics.CreateAPIView):
    serializer_class = ReviewSerializer
    queryset = Review.objects.all()

class ReviewList(generics.ListAPIView):
    serializer_class = ReviewSerializer
    def get_queryset(self):
        rumah_id = self.kwargs['rumah']
        rumah = Rumah.objects.get(id=rumah_id)
        queryset = Review.objects.filter(rumah=rumah).order_by('-create_at')
        return queryset

class KamarCreate(generics.CreateAPIView):
    serializer_class = KamarSerializer
    queryset = Kamar.objects.all()

class KamarList(generics.ListAPIView):
    serializer_class = KamarSerializer
    def get_queryset(self):
        rumah_id = self.kwargs['rumah']
        rumah = Rumah.objects.get(id=rumah_id)
        queryset = Kamar.objects.filter(rumah=rumah).order_by('-address_room')
        return queryset

class KamarUpdate(generics.UpdateAPIView):
    queryset = Kamar.objects.all()
    serializer_class = KamarSerializer