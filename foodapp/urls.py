from django.urls import path
from .views import SampleAPIView
from .views import *

urlpatterns = [
    path("", SampleAPIView.as_view(), name="sample-api"),
    path("api/fooditems/", FoodItemAPIView.as_view(), name="food-item-api"),
    path("api/carousel/", CarouselAPIView.as_view(), name="carousel-api"),
]
urlpatterns += [
    # data
    path("api/submit-data/", submit_data, name="submit-data"),
    path("api/check-phone/", check_phone, name="check_phone"),
    path("api/verify-otp/", verify_otp, name="verify_otp"),
    path("api/contactus/", contact_view, name="contactus"),
    path("api/check-authentication/", get_user_data, name="check_authentication"),
    path("api/logout/", user_logout, name="user_logout"),
    path("api/get-discount/", DiscountAPIView.as_view(), name="get-discount"),
]
urlpatterns += [
    path("api/menuitems/", MenuAPIView.as_view(), name="menuitems"),
    path("api/pizza-burger/", PizzaBurgerAPIView.as_view(), name="pizza-burger-item"),
    path("api/dessert/", DessertAPIView.as_view(), name="dessert-item"),
    path("api/gujarati/", GujaratiAPIView.as_view(), name="gujarati-item"),
    path("api/punjabi/", PanjabiAPIView.as_view(), name="panjabi-item"),
    path("api/southindian/", SouthIndianAPIView.as_view(), name="south-indian-item"),
]
urlpatterns += [
    path(
        "api/increase-quantity/<int:cart_item_id>/",
        increase_quantity,
        name="increase_quantity",
    ),
    path(
        "api/decrease-quantity/<int:cart_item_id>/",
        decrease_quantity,
        name="decrease_quantity",
    ),
    path("api/add-to-cart/", add_to_cart, name="add-to-cart"),
    path("api/cart-items/", CartAPIView.as_view(), name="cart-items"),
    path(
        "api/remove-from-cart/",
        remove_from_cart,
        name="remove-from-cart",
    ),
    path("api/confirm-order/<int:item_id>/", confirm_order, name="confirm-order"),
    # use for show only confirmed payements
    path("api/show_conformed/", show_conformed, name="show-confirm-order"),
    # update profile by id:xyz
    path(
        "api/update-profile/<int:id>/",
        UpdateProfileView.as_view(),
        name="update-profile",
    ),
    # for send confirmation mail
    path("api/generate-bill/", generate_bill, name="generate_payment_details"),
]

urlpatterns += [
    # for review
    path("api/review/", ReviewAPIView.as_view(), name="get-review"),
    path("api/review-submit/", submit_review, name="submit_review"),
]
urlpatterns += [
    path("api/admin-orders/", admin_orders, name="admin-orders"),
    path("api/delete-order/", delete_order, name="admin-orders"),
]
