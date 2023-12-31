from rest_framework import generics, permissions, status
from .serializers import ListingSerializer, TransactionSerializer, ReviewSerializer, KamarSerializer, FasilitasKamarSerializer, FasilitasRumahSerializer, PoiSerializer, RuleRumahSerializer
from appRumah.models import Rumah, Transaction, Review, Kamar, FasilitasKamar, FasilitasRumah, Poi, RuleRumah
from rest_framework import generics
from rest_framework.permissions import IsAuthenticated
from appUsers.models import User, Customer, Owner
from rest_framework.response import Response


from django.shortcuts import get_object_or_404 


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
            # Mengembalikan queryset kosong jika Owner tidak ditemukan
            queryset = Rumah.objects.none()
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
        user_id = self.kwargs['user']
        users = User.objects.get(id=user_id)
        queryset = Transaction.objects.filter(
            kamar__rumah__user=users, approve=True).order_by('-id')
        return queryset

class TransactionListOrder(generics.ListAPIView):
    serializer_class = TransactionSerializer

    def get_queryset(self):
        user_id = self.kwargs['user']
        users = User.objects.get(id=user_id)
        queryset = Transaction.objects.filter(
            kamar__rumah__user=users, approve=False).order_by('-id')
        return queryset

class TransactionBeforeApprove(generics.ListAPIView):
    serializer_class = TransactionSerializer

    def get_queryset(self):
        rumah_id = self.kwargs['rumah']
        rumah = Rumah.objects.get(id=rumah_id)
        queryset = Transaction.objects.filter(
            kamar__rumah=rumah, approve=False).order_by('-date')
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
        rumah = Rumah.objects.get(id=rumah_id)  # Fetch the User instance
        # customer = Customer.objects.get(user=user)  # Get the associated Customer instance
        queryset = Transaction.objects.filter(
            kamar__rumah=rumah, approve=True).order_by('-date')
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


class KamarCreate(generics.CreateAPIView):
    serializer_class = KamarSerializer
    queryset = Kamar.objects.all()


class FasilitasKamarCreate(generics.CreateAPIView):
    queryset = FasilitasKamar.objects.all()
    serializer_class = FasilitasKamarSerializer


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

class KamarUserList(generics.ListAPIView):
    serializer_class = KamarSerializer
    def get_queryset(self):
        user_id = self.kwargs['user']
        users = User.objects.get(id=user_id)
        queryset = Kamar.objects.filter(rumah__user=users).order_by('id')
        return queryset

# class KamarUserList(generics.ListAPIView):
#     serializer_class = KamarSerializer

#     def get_queryset(self):
#         user_id = self.kwargs['user']

#         # Menggunakan get_list_or_404 untuk menangani jika Rumah tidak ditemukan
#         rumah = get_object_or_404(Rumah.objects.filter(user=user_id).order_by('id'))

#         # Mengubah filter menjadi rumah, bukan rumah.user
#         queryset = Kamar.objects.filter(rumah=rumah).order_by('address_room')
#         return queryset

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


class FasilitasKamarUpdate(generics.UpdateAPIView):
    serializer_class = FasilitasKamarSerializer
    queryset = FasilitasKamar.objects.all()


class FasilitasRumahUpdate(generics.UpdateAPIView):
    serializer_class = FasilitasRumahSerializer
    queryset = FasilitasRumah.objects.all()


class FasilitasRumahList(generics.ListAPIView):
    serializer_class = FasilitasRumahSerializer

    def get_queryset(self):
        rumah_id = self.kwargs['rumah']
        rumah = Rumah.objects.get(id=rumah_id)
        queryset = FasilitasRumah.objects.filter(rumah=rumah).order_by('name')
        return queryset


class FasilitasRumahCreate(generics.CreateAPIView):
    serializer_class = FasilitasRumahSerializer
    queryset = FasilitasRumah.objects.all()


class FasilitasKamarDelete(generics.DestroyAPIView):
    serializer_class = FasilitasKamarSerializer
    queryset = FasilitasKamar.objects.all()


class FasilitasRumahDelete(generics.DestroyAPIView):
    serializer_class = FasilitasRumahSerializer
    queryset = FasilitasRumah.objects.all()


class RuleRumahUpdate(generics.UpdateAPIView):
    serializer_class = RuleRumahSerializer
    queryset = RuleRumah.objects.all()


class RuleRumahList(generics.ListAPIView):
    serializer_class = RuleRumahSerializer

    def get_queryset(self):
        rumah_id = self.kwargs['rumah']
        rumah = Rumah.objects.get(id=rumah_id)
        queryset = RuleRumah.objects.filter(rumah=rumah).order_by('aturan')
        return queryset


class RuleRumahCreate(generics.CreateAPIView):
    serializer_class = RuleRumahSerializer
    queryset = RuleRumah.objects.all()


# class RuleKamarUpdate(generics.UpdateAPIView):
#     serializer_class = RuleKamarSerializer
#     queryset = RuleKamar.objects.all()


# class RuleKamarList(generics.ListAPIView):
#     serializer_class = RuleKamarSerializer

#     def get_queryset(self):
#         kamar_id = self.kwargs['kamar']
#         kamar = Kamar.objects.get(id=kamar_id)
#         queryset = RuleKamar.objects.filter(kamar=kamar).order_by('aturan')
#         return queryset


# class RuleKamarCreate(generics.CreateAPIView):
#     serializer_class = RuleKamarSerializer
#     queryset = RuleKamar.objects.all()


class RuleRumahDelete(generics.DestroyAPIView):
    serializer_class = RuleRumahSerializer
    queryset = RuleRumah.objects.all()


# class RuleKamarDelete(generics.DestroyAPIView):
#     serializer_class = RuleKamarSerializer
#     queryset = RuleKamar.objects.all()


class PoiList(generics.ListAPIView):
    serializer_class = PoiSerializer
    queryset = Poi.objects.all()
