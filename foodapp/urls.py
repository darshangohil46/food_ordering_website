from django.urls import path
from .views import SampleAPIView
from .views import (
    FoodItemAPIView,
    CarouselAPIView,
    ReviewAPIView,
    MenuAPIView,
    DiscountAPIView,
    CartAPIView,
    submit_data,
    check_phone,
    verify_otp,
    contact_view,
    get_user_data,
    user_logout,
    add_to_cart,
    show_conformed,
    UpdateProfileView,
    generate_payment,
    submit_review,
    remove_from_cart
)

urlpatterns = [
    path("", SampleAPIView.as_view(), name="sample-api"),
    path("api/fooditems/", FoodItemAPIView.as_view(), name="food-item-api"),
    path("api/carousel/", CarouselAPIView.as_view(), name="carousel-api"),
    # data
    path("api/submit-data/", submit_data, name="submit-data"),
    path("api/check-phone/", check_phone, name="check_phone"),
    path("api/verify-otp/", verify_otp, name="verify_otp"),
    path("api/contactus/", contact_view, name="contactus"),
    path("api/menuitems/", MenuAPIView.as_view(), name="menuitems"),
    path("api/check-authentication/", get_user_data, name="check_authentication"),
    path("api/logout/", user_logout, name="user_logout"),
    path("api/get-discount/", DiscountAPIView.as_view(), name="get-discount"),
    path("api/add-to-cart/", add_to_cart, name="add-to-cart"),
    path("api/cart-items/", CartAPIView.as_view(), name="cart-items"),
    # for remove from cart
    path(
        "api/remove-from-cart/",
        remove_from_cart,
        name="remove-from-cart",
    ),
    path(
        "api/confirm-order/<int:item_id>/", CartAPIView.as_view(), name="confirm-order"
    ),
    # use for show only confirmed payements
    path("api/show_conformed/", show_conformed, name="show-confirm-order"),
    # update profile by id:xyz
    path(
        "api/update-profile/<int:id>/",
        UpdateProfileView.as_view(),
        name="update-profile",
    ),
    # for send confirmation mail
    path("api/generate-payment/", generate_payment, name="generate_payment_details"),
    # for review
    path("api/review/", ReviewAPIView.as_view(), name="get-review"),
    path("api/review-submit/", submit_review, name="submit_review"),
]
