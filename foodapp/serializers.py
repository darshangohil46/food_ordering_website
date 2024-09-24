from rest_framework import serializers
from .models import *


class FoodItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = FoodItem
        fields = "__all__"


class CarouselItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Carousel
        fields = "__all__"


class MenuItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Menu
        fields = "__all__"


class DiscountItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = DiscountCoupon
        fields = "__all__"


class CartItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Cart
        fields = "__all__"


class ReviewSerializer(serializers.ModelSerializer):
    user_first_name = serializers.CharField(source="user.first_name", read_only=True)
    user_last_name = serializers.CharField(source="user.last_name", read_only=True)
    user_my_username = serializers.CharField(source="user.my_username", read_only=True)

    class Meta:
        model = Review
        fields = [
            "id",
            "rating",
            "review_text",
            "created_at",
            "updated_at",
            "user_first_name",
            "user_last_name",
            "user_my_username",
        ]
