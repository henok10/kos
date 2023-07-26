from django.core.files import File
from io import BytesIO
import PIL
from random import choices
from django.contrib.gis.db import models
from django.utils import timezone
from django.contrib.gis.geos import Point
from django.contrib.auth import get_user_model
from users.models import Customer, Owner
User = get_user_model()
from cloudinary.models import CloudinaryField
import os
import uuid


# def compress(picture):
#     if picture:
#         pic = PIL.Image.open(picture)
#         buf = BytesIO()
#         pic.save(buf, 'JPEG', quality=35)
#         new_pic = File(buf, name=picture.name)
#         return new_pic
#     else:
#         return None
def upload_to(instance, filename):
    # Dapatkan ekstensi berkas
    ext = filename.split('.')[-1]
    # Buat bagian unik dengan uuid
    unique_filename = f"{uuid.uuid4().hex}.{ext}"
    # Gabungkan nama unik dengan folder tujuan (misalnya "pictures/")
    return os.path.join("pictures/", unique_filename)


class Rumah(models.Model):
    owner = models.ForeignKey(
        Owner, on_delete=models.CASCADE, blank=True, null=True)
    title = models.CharField(max_length=150)
    description = models.TextField(null=True, blank=True)
    address = models.TextField(null=True, blank=True)
    borough = models.CharField(max_length=50, blank=True, null=True)
    no_rekening = models.CharField(max_length=100, blank=True, null=True)
    rooms = models.IntegerField(blank=True, null=True)
    furnished = models.BooleanField(default=False)
    pool = models.BooleanField(default=False)
    elevator = models.BooleanField(default=False)
    cctv = models.BooleanField(default=False)
    parking = models.BooleanField(default=False)
    date_posted = models.DateTimeField(default=timezone.now)
    latitude = models.FloatField(blank=True, null=True)
    longitude = models.FloatField(blank=True, null=True)
    picture1 = models.ImageField(
        blank=True, null=True, upload_to=upload_to, max_length=455)
    picture2 = models.ImageField(
        blank=True, null=True, upload_to=upload_to, max_length=455)
    picture3 = models.ImageField(
        blank=True, null=True, upload_to=upload_to, max_length=455)
    picture4 = models.ImageField(
        blank=True, null=True, upload_to=upload_to, max_length=455)
    picture5 = models.ImageField(
        blank=True, null=True, upload_to=upload_to, max_length=455)

       # tambahan atribut available_rooms
    @property
    def available_rooms(self):
        transactions = self.transactions.filter(barang_dibeli=True)
        num_items_bought = transactions.count()
        return self.rooms - num_items_bought

    def __str__(self):
        return self.title

class Kamar(models.Model):
    rumah = models.ForeignKey(Rumah, on_delete=models.CASCADE, blank=True, null=True, related_name='kamar')
    price_day = models.DecimalField(max_digits=50, decimal_places=0, blank=True, null=True)
    price_month = models.DecimalField(max_digits=50, decimal_places=0, blank=True, null=True)
    price_year = models.DecimalField(max_digits=50, decimal_places=0, blank=True, null=True)
    picture_room = models.ImageField(
            blank=True, null=True, upload_to=upload_to, max_length=455)
    room_size = models.CharField(max_length=150, blank=True, null=True)
    address_room = models.CharField(max_length=150, blank=True, null=True)

class Poi(models.Model):
    name = models.CharField(max_length=120, blank=True, null=True)
    choices_type = (
        ('University', 'University'),
        ('Hospital', 'Hospital'),
        ('Stadium', 'Stadium'),
    )
    type = models.CharField(max_length=50, choices=choices_type)
    location = models.PointField(srid=4326, blank=True, null=True)

    def __str__(self):
        return self.name

class Transaction(models.Model):
    rumah = models.ForeignKey(Rumah, on_delete=models.CASCADE, blank=True, null=True, related_name='transactions')
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, blank=True, null=True)
    buktiTransfer = models.ImageField(
        blank=True, null=True, upload_to=upload_to, max_length=455)
    # fullName = models.CharField(max_length=20, null=True, blank=True)
    # phoneNumber = models.CharField(max_length=20, null=True, blank=True)
    nominal = models.DecimalField(max_digits=50, decimal_places=0, blank=True, null=True)
    choices_rental_frequency = (
        ('Year', 'Year'),
        ('Month', 'Month'),
        ('Day', 'Day'),
    )
    rentalFrequency = models.CharField(
        max_length=20, blank=True, null=True, choices=choices_rental_frequency)
    date = models.DateTimeField(default=timezone.now)
    barang_dipesan = models.BooleanField(default=False)
    approve = models.BooleanField(default=False)

    def __str__(self):
        return self.fullName

class Review(models.Model):
    rumah = models.ForeignKey(Rumah, on_delete=models.CASCADE,  blank=True, null=True, related_name='review')
    customer = models.ForeignKey(Customer, on_delete=models.CASCADE, null=True)
    comment = models.TextField(max_length=500)
    rate = models.IntegerField(default=0)
    create_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.rumah.title


