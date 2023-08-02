from rest_framework import generics, permissions, status
from .serializers import ListingSerializer, TransactionSerializer, ReviewSerializer, KamarSerializer, FasilitasKamarSerializer, FasilitasRumahSerializer
from listings.models import Rumah, Transaction, Review, Kamar, FasilitasKamar, FasilitasRumah
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from users.models import User, Customer, Owner
from rest_framework.response import Response

class ListingList(generics.ListAPIView):
    queryset = Rumah.objects.all().order_by('date_posted')
    serializer_class = ListingSerializer

class ListingUserList(generics.ListAPIView):
    serializer_class = ListingSerializer

    def get_queryset(self):
        user_id = self.kwargs['user']
        try:
            user = User.objects.get(id=user_id)
            queryset = Rumah.objects.filter(user=user).order_by('date_posted')
        except User.DoesNotExist:
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
        queryset = Transaction.objects.filter(kamar__rumah=rumah, approve=False).order_by('-date')
        return queryset

class TransactionUpdate(generics.UpdateAPIView):
    serializer_class = TransactionSerializer
    queryset = Transaction.objects.all()
class TransactionKamarUpdate(generics.UpdateAPIView):
    serializer_class = TransactionSerializer
    queryset = Transaction.objects.all()
    lookup_field = 'kamar'

class TransactionListUser(generics.ListAPIView):
    serializer_class = TransactionSerializer
    def get_queryset(self):
        rumah_id = self.kwargs['rumah']
        rumah = Rumah.objects.get(id=rumah_id)
        queryset = Transaction.objects.filter(kamar__rumah=rumah, approve=True).order_by('-date')
        return queryset

class TransactionUser(generics.ListAPIView):
    serializer_class = TransactionSerializer
    def get_queryset(self):
        user_id = self.kwargs['user']
        user = User.objects.get(pk=user_id)  # Fetch the User instance
        # customer = Customer.objects.get(user=user)  # Get the associated Customer instance
        queryset = Transaction.objects.filter(user=user).order_by('-date')
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


class TransactionDeleteKamar(generics.DestroyAPIView):
    queryset = Transaction.objects.all()
    serializer_class = TransactionSerializer
    lookup_field = 'kamar'

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

# class KamarCreate(generics.CreateAPIView):
#     serializer_class = KamarSerializer
#     queryset = Kamar.objects.all()

class KamarCreate(generics.CreateAPIView):
    def post(self, request, format=None):
        serializer = KamarSerializer(data=request.data)

        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class KamarDelete(generics.DestroyAPIView):
    queryset = Kamar.objects.all()
    serializer_class = KamarSerializer

class KamarList(generics.ListAPIView):
    serializer_class = KamarSerializer
    def get_queryset(self):
        rumah_id = self.kwargs['rumah']
        rumah = Rumah.objects.get(id=rumah_id)
        queryset = Kamar.objects.filter(rumah=rumah).order_by('address_room')
        return queryset

class KamarUpdate(generics.UpdateAPIView):
    queryset = Kamar.objects.all()
    serializer_class = KamarSerializer

class KamarDetail(generics.RetrieveAPIView):
    serializer_class = KamarSerializer
    queryset = Kamar.objects.all()

class FasilitasKamarList(generics.ListAPIView):
    serializer_class = FasilitasKamarSerializer
    def get_queryset(self):
        kamar_id = self.kwargs['kamar']
        kamar = Kamar.objects.get(id=kamar_id)
        queryset = FasilitasKamar.objects.filter(kamar=kamar).order_by('name')
        return queryset

class FasilitasRumahList(generics.ListAPIView):
    serializer_class = FasilitasRumahSerializer
    def get_queryset(self):
        rumah_id = self.kwargs['rumah']
        rumah = Rumah.objects.get(id=rumah_id)
        queryset = FasilitasRumah.objects.filter(rumah=rumah).order_by('nama_fasilitas')
        return queryset

class FasilitasRumahCreate(generics.CreateAPIView):
    serializer_class = FasilitasRumahSerializer
    queryset = FasilitasRumah.objects.all()
  