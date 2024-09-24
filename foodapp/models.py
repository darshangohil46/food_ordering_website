from django.db import models
from django.conf import settings


# from django.contrib.auth.models import User
from django.utils import timezone

from django.contrib.auth.models import User
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager

from django.contrib.contenttypes.fields import GenericForeignKey
from django.contrib.contenttypes.models import ContentType

# Create your models here.


class FoodItem(models.Model):
    category = models.CharField(max_length=100)
    title = models.CharField(max_length=100)
    special = models.CharField(max_length=100)
    description = models.TextField()
    imageUrl = models.URLField()

    def __str__(self):
        return self.title


class Carousel(models.Model):
    title = models.CharField(max_length=100)
    description = models.TextField()
    imageUrl = models.URLField()

    def __str__(self):
        return self.title


class Menu(models.Model):
    img_url = models.URLField(max_length=500)
    price = models.CharField(max_length=100)
    restaurant_name = models.CharField(max_length=255)
    type = models.CharField(max_length=255)
    address = models.TextField()

    def __str__(self):
        return f"{self.restaurant_name} - {self.type}"


class DiscountCoupon(models.Model):
    code = models.CharField(max_length=50, unique=True)  # Unique coupon code
    discount_percentage = models.PositiveIntegerField()
    expiration_date = models.DateTimeField()  # Expiration date for the coupon
    is_active = models.BooleanField(default=True)  # To enable or disable the coupon

    def __str__(self):
        return self.code

    def is_valid(self):
        return self.is_active and self.expiration_date > timezone.now()


# class Pizza(models.Model):
#     img_url = models.URLField(max_length=500)
#     price = models.CharField(max_length=100)
#     restaurant_name = models.CharField(max_length=255)
#     type = models.CharField(max_length=255)  # e.g., 'Pizza'
#     address = models.TextField()

#     def __str__(self):
#         return f"{self.restaurant_name} - {self.type}"


# class Burger(models.Model):
#     img_url = models.URLField(max_length=500)
#     price = models.CharField(max_length=100)
#     restaurant_name = models.CharField(max_length=255)
#     type = models.CharField(max_length=255)  # e.g., 'Burger'
#     address = models.TextField()

#     def __str__(self):
#         return f"{self.restaurant_name} - {self.type}"


# class Other(models.Model):
#     img_url = models.URLField(max_length=500)
#     price = models.CharField(max_length=100)
#     restaurant_name = models.CharField(max_length=255)
#     type = models.CharField(max_length=255)  # e.g., 'Other'
#     address = models.TextField()

#     def __str__(self):
#         return f"{self.restaurant_name} - {self.type}"


class Cart(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    cart_details = models.JSONField()  # Store cart items in JSON format
    ordered = models.BooleanField(default=False)  # Status of the order
    last_updated = models.DateTimeField(auto_now=True)  # Auto update on every save
    email = models.EmailField()  # User's email
    quantity = models.IntegerField(default=1)

    def __str__(self):
        return f"Cart for {self.id} ({self.user.my_username}) {self.user.first_name} {self.user.last_name} {self.user.phone} - [{'Ordered' if self.ordered else 'Pending'}] {self.last_updated}"


class UserDataSetManager(BaseUserManager):
    def create_user(
        self, phone, first_name, last_name, email, address, my_username, password=None
    ):
        if not phone:
            raise ValueError("The Phone number field is required")
        user = self.model(
            phone=phone,
            first_name=first_name,
            last_name=last_name,
            email=email,
            address=address,
            my_username=my_username,
        )
        user.set_password(password)
        user.save(using=self._db)
        return user

    def create_superuser(
        self, phone, first_name, last_name, email, address, my_username, password=None
    ):
        user = self.create_user(
            phone=phone,
            first_name=first_name,
            last_name=last_name,
            email=email,
            address=address,
            my_username=my_username,
            password=password,
        )
        user.is_admin = True
        user.save(using=self._db)
        return user


class UserDataSet(AbstractBaseUser):
    phone = models.CharField(max_length=15, unique=True)
    first_name = models.CharField(max_length=30)
    last_name = models.CharField(max_length=30)
    email = models.EmailField(max_length=100)
    address = models.TextField()
    my_username = models.CharField(max_length=150, unique=True)
    password = models.CharField(max_length=128)
    otp = models.CharField(max_length=6, null=True, blank=True)  # Temporary OTP storage
    otp_created_at = models.DateTimeField(null=True, blank=True)

    # Additional fields required by Django
    is_active = models.BooleanField(default=True)
    is_admin = models.BooleanField(default=False)

    objects = UserDataSetManager()

    USERNAME_FIELD = "phone"
    REQUIRED_FIELDS = ["first_name", "last_name", "email", "address", "my_username"]

    def __str__(self):
        return (
            f"{self.first_name} {self.last_name} {self.id} (Is Admin: {self.is_admin})"
        )

    def has_perm(self, perm, obj=None):
        return True

    def has_module_perms(self, app_label):
        return True

    @property
    def is_staff(self):
        return self.is_admin


class FinalOrder(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    order_details = models.JSONField()
    order_id = models.CharField(max_length=100)
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    name = models.CharField(max_length=255)
    email = models.EmailField()
    phone = models.CharField(max_length=15)
    discount = models.CharField(max_length=15)
    address = models.CharField(max_length=15)
    quantity = models.IntegerField(default=1, blank=True)
    last_updated = models.DateTimeField(default=timezone.now)
    complete = models.BooleanField(default=False)  # Status of the order

    def __str__(self):
        return f"ID: {self.id} Total pay: {self.amount*self.quantity} :: {self.amount} {self.order_id} - {self.user}"


class Review(models.Model):
    RATING_CHOICES = [
        (1, "1 - Poor"),
        (2, "2 - Fair"),
        (3, "3 - Good"),
        (4, "4 - Very Good"),
        (5, "5 - Excellent"),
    ]

    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE)
    rating = models.IntegerField(choices=RATING_CHOICES, null=True, blank=True)
    review_text = models.TextField()
    created_at = models.DateTimeField(default=timezone.now)
    updated_at = models.DateTimeField(auto_now=True)

    def __str__(self):
        return f"Review by {self.user.phone} {self.user.my_username} {self.rating}"

    class Meta:
        ordering = ["-created_at"]
