from django.shortcuts import render, HttpResponse
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.mail import send_mail
from django.contrib.auth import authenticate, login, logout

from django.contrib.auth.hashers import make_password
from django.contrib.auth.models import User
from django.contrib.auth import get_user_model

from django.conf import settings
from datetime import timedelta


from django.template.loader import render_to_string
from django.utils.html import strip_tags
from rest_framework.decorators import api_view
from django.shortcuts import get_object_or_404


from twilio.rest import Client
from django.utils import timezone

User = get_user_model()

import json, random, re

# Create your views here.
from rest_framework.views import APIView
from rest_framework.response import Response

from django.views import View
from django.utils.decorators import method_decorator


from .serializers import *
from rest_framework import status
from django.views.decorators.http import require_http_methods

# import models
from .models import *


otp_signup = None


# sample api (show all links)
class SampleAPIView(APIView):
    x = "http://127.0.0.1:8000/"

    def get(self, request):
        data = {
            "food-item-api": f"{self.x}api/fooditems/",
            "carousel-api": f"{self.x}api/carousel/",
            "menuitems": f"{self.x}api/menuitems/",
            "discount": f"{self.x}api/get-discount/",
            "review": f"{self.x}api/review/",
            # "submit-data": f"{self.x}api/submit-data/",
            # "check-phone": f"{self.x}api/check-phone/",
            # "verify-phone": f"{self.x}api/verify-otp/",
            # "contactus": f"{self.x}api/contactus/",
            # "check_authentication": f"{self.x}api/check-authentication/",
            # "user-logout": f"{self.x}api/logout/",
            # "add-to-cart": f"{self.x}api/add-to-cart/",
            # "cart-items": f"{self.x}api/cart-items/",
            # "remove-from-cart": f"{self.x}api/remove-from-cart/",
            # "confirm-order": f"{self.x}api/confirm-order/",
            # "show-confirm-order": f"{self.x}api/show_confirmed/",
            # "api/update-profile/<str:username>/": f"{self.x}api/update-profile/",
        }
        return Response(data)


# food items show on home page (get, post)
class FoodItemAPIView(APIView):
    def get(self, request):
        food_items = FoodItem.objects.all()
        serializer = FoodItemSerializer(food_items, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = FoodItemSerializer(data=request.data, many=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# carousel scrolling(get, post)
class CarouselAPIView(APIView):
    def get(self, request):
        carousel_items = Carousel.objects.all()
        serializer = CarouselItemSerializer(carousel_items, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CarouselItemSerializer(data=request.data, many=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# menu data rest framework(get, post)
class MenuAPIView(APIView):
    def get(self, request):
        menu_items = Menu.objects.all()
        serializer = MenuItemSerializer(menu_items, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = MenuItemSerializer(data=request.data, many=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# review page (get)
class ReviewAPIView(APIView):
    def get(self, request):
        reviews = Review.objects.all()
        serializer = ReviewSerializer(reviews, many=True)
        return Response(serializer.data)


# (done) for submit user rivew for website
@csrf_exempt
def submit_review(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            user_id = data.get("user")
            if not user_id:
                return JsonResponse(
                    {"status": "error", "message": "User ID is required"}, status=400
                )
            try:
                user = UserDataSet.objects.get(id=user_id)
            except UserDataSet.DoesNotExist:
                return JsonResponse(
                    {"status": "error", "message": "User not found"}, status=404
                )

            rating = data.get("rating")
            print(rating, "fugufewfiuewvkb")
            review_text = data.get("review_text")

            if not rating or not review_text:
                return JsonResponse(
                    {
                        "status": "error",
                        "message": "Rating and review text are required",
                    },
                    status=400,
                )
            review = Review(user=user, rating=rating, review_text=review_text)
            review.save()
            return JsonResponse(
                {"status": "success", "message": "Review submitted successfully"},
                status=201,
            )
        except json.JSONDecodeError:
            return JsonResponse(
                {"status": "error", "message": "Invalid JSON format"}, status=400
            )
        except Exception as e:
            return JsonResponse(
                {"status": "error", "message": f"Error: {str(e)}"}, status=500
            )
    return JsonResponse(
        {"status": "error", "message": "Only POST method is allowed"}, status=405
    )


# discount data rest framework(get, post)(done)
class DiscountAPIView(APIView):
    def get(self, request):
        discount_items = DiscountCoupon.objects.all()
        serializer = DiscountItemSerializer(discount_items, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = DiscountItemSerializer(data=request.data, many=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# cart data rest framework(get, post, delete)(done)
class CartAPIView(APIView):
    # get cart data
    def get(self, request):
        user_id = request.query_params.get("user_id")
        if not user_id:
            return Response(
                {"error": "user_id parameter is required"},
                status=status.HTTP_400_BAD_REQUEST,
            )
        try:
            cart_items = Cart.objects.filter(user_id=user_id)
            serializer = CartItemSerializer(cart_items, many=True)
            return Response(serializer.data)
        except Exception as e:
            return Response(
                {"error": str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR
            )


# for write true in confirm (done)
@csrf_exempt
def confirm_order(request, item_id):
    if request.method == "POST":
        try:
            cart_item = Cart.objects.get(id=item_id)

            # Update the ordered status to True
            cart_item.ordered = True
            cart_item.save()

            return JsonResponse(
                {"message": "Order confirmed successfully!"}, status=200
            )
        except Cart.DoesNotExist:
            return JsonResponse({"error": "Cart item not found"}, status=404)
    else:
        return JsonResponse({"error": "Invalid request method"}, status=405)


@csrf_exempt  # Disabling CSRF protection (done)
def remove_from_cart(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)  # Parse the incoming request body
            item_id = data.get("id")

            if not item_id:
                return JsonResponse(
                    {"status": "error", "message": "No item ID provided."},
                    status=status.HTTP_400_BAD_REQUEST,
                )

            # Fetch the cart item using the item_id
            cart_item = Cart.objects.get(id=item_id)
            cart_item.delete()  # Delete the item from the cart

            return JsonResponse(
                {"status": "success", "message": "Item removed from cart."},
                status=status.HTTP_200_OK,
            )

        except Cart.DoesNotExist:
            return JsonResponse(
                {"status": "error", "message": "Item not found in cart."},
                status=status.HTTP_404_NOT_FOUND,
            )

        except Exception as e:
            return JsonResponse(
                {"status": "error", "message": str(e)},
                status=status.HTTP_500_INTERNAL_SERVER_ERROR,
            )
    return JsonResponse(
        {"status": "error", "message": "Invalid method"},
        status=status.HTTP_500_INTERNAL_SERVER_ERROR,
    )


# for use of Account react component and update value of user indatabase
# (put method) (done)
@method_decorator(csrf_exempt, name="dispatch")
class UpdateProfileView(View):
    # update user details
    def put(self, request, id, *args, **kwargs):
        try:
            # Parse the request body to get the new profile data
            data = json.loads(request.body)
            print(data)

            # Find the user by username
            user = UserDataSet.objects.get(id=id)
            print(user)

            # Update user fields
            user.first_name = data.get("first_name", user.first_name)
            user.last_name = data.get("last_name", user.last_name)
            user.email = data.get("email", user.email)
            user.address = data.get("address", user.address)
            user.my_username = data.get("my_username", user.my_username)
            user.phone = data.get("phone", user.phone)

            # Save the updated user object
            user.save()

            return JsonResponse(
                {"status": "success", "message": "Profile updated successfully"},
                status=200,
            )

        except User.DoesNotExist:
            return JsonResponse({"error": "User not found"}, status=404)
        except Exception as e:
            return JsonResponse({"error": str(e)}, status=500)


# check phone number is valid or not
@csrf_exempt
def check_phone(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            phone = data.get("phone")
            type = data.get("type")

            if not phone or not type:
                return JsonResponse(
                    {"status": "error", "message": "Phone number or type is missing."},
                    status=400,
                )

            if type == "signin":
                try:
                    user = UserDataSet.objects.get(phone=phone)
                    otp = str(random.randint(100000, 999999))  # Generate a 6-digit OTP

                    # Send OTP to the user's phone
                    # --------------------------------------------------
                    client = Client(
                        settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN
                    )

                    message = client.messages.create(
                        body=f"Welcome! To Our FOOD ORDER WEBSITE F00die...\nYour Verification Code (OTP - One Time Password) for Login is: {otp}",
                        from_=settings.TWILIO_PHONE_NUMBER,  # Twilio phone number
                        to="+91" + phone,  # The phone number to send the message to
                    )
                    print(message.sid)
                    # --------------------------------------------------

                    user.otp = otp
                    user.otp_created_at = timezone.now()
                    print("------------------------------")
                    print(otp)
                    print("------------------------------")
                    user.save()

                    # Optionally, you can integrate your OTP sending service here
                    return JsonResponse(
                        {"status": "success", "message": "OTP sent successfully"},
                        status=200,
                    )
                except UserDataSet.DoesNotExist:
                    return JsonResponse(
                        {
                            "status": "error",
                            "message": "User does not exist. Please sign up.",
                        },
                        status=404,
                    )

            elif type == "signup":
                # Check if the user already exists for signup
                try:
                    user = UserDataSet.objects.get(phone=phone)
                    return JsonResponse(
                        {
                            "status": "error",
                            "message": "User already exists. Please log in.",
                        },
                        status=400,
                    )
                except UserDataSet.DoesNotExist:
                    global otp_signup
                    otp_signup = str(random.randint(100000, 999999))
                    # Generate a 6-digit OTP

                    # Send OTP to the user's phone
                    # --------------------------------------------------
                    client2 = Client(
                        settings.TWILIO_ACCOUNT_SID, settings.TWILIO_AUTH_TOKEN
                    )

                    message2 = client2.messages.create(
                        body=f"Welcome! To Our FOOD ORDER WEBSITE F00die...\nYour Verification Code (OTP - One Time Password) for Register is: {otp_signup}",
                        from_=settings.TWILIO_PHONE_NUMBER,  # Twilio phone number
                        to="+91" + phone,  # The phone number to send the message to
                    )
                    print(message2.sid)
                    # --------------------------------------------------

                    print("------------------------------")
                    print(otp_signup)
                    print("------------------------------")
                    # Assuming you'll create the user after OTP verification
                    return JsonResponse(
                        {
                            "status": "success",
                            "message": "OTP sent successfully. Proceed to sign up.",
                        },
                        status=200,
                    )

        except Exception as e:
            return JsonResponse(
                {"status": "error", "message": str(e)},
                status=500,
            )

    return JsonResponse({"status": "error", "message": "Invalid request method"})


# # for verification of OTP
@csrf_exempt
def verify_otp(request):
    if request.method == "POST":
        data = json.loads(request.body)
        phone = data.get("phone")
        otp = data.get("otp")
        type = data.get("type")

        print(phone, otp)
        if type == "signin":
            try:
                user = UserDataSet.objects.get(phone=phone)
                if (
                    user.otp == otp
                ) and timezone.now() - user.otp_created_at < timedelta(minutes=2):
                    user = authenticate(request, phone=phone, otp=otp)
                    login(request, user)
                    print(request.user.is_authenticated)
                    return JsonResponse(
                        {
                            "status": "success",
                            "message": "OTP verified successfully. Login successful.",
                            "redirect_url": "/",
                        },
                        status=200,
                    )

                return JsonResponse(
                    {"status": "error", "message": "Invalid OTP or OTP expired"},
                    status=400,
                )
            except UserDataSet.DoesNotExist:
                return JsonResponse({"error": "User not found"}, status=404)
        elif type == "signup":
            print(otp, otp_signup, phone)
            try:
                if otp_signup == otp:
                    return JsonResponse(
                        {
                            "status": "success",
                            "message": "OTP verified successfully. Now, fill other Details.",
                        },
                        status=200,
                    )

                return JsonResponse(
                    {"status": "error", "message": "Invalid OTP or OTP expired"},
                    status=400,
                )
            except UserDataSet.DoesNotExist:
                return JsonResponse({"error": "User not found"}, status=404)

    else:
        return JsonResponse(
            {"status": "error", "message": "Invalid request method"}, status=400
        )


# check-authentication and return data to api
@csrf_exempt
def get_user_data(request):
    print("User is authenticated:", request.user)
    if request.user.is_authenticated:
        try:
            user_profile = UserDataSet.objects.get(phone=request.user.phone)
            # print(
            #     "password is:", user_profile.my_username + "@" + user_profile.phone[:4]
            # )
            user_data = {
                "id": user_profile.id,
                "phone": user_profile.phone,
                "first_name": user_profile.first_name,
                "last_name": user_profile.last_name,
                "email": user_profile.email,
                "address": user_profile.address,
                "my_username": user_profile.my_username,
            }
            return JsonResponse({"status": "success", "user_data": user_data})
        except UserDataSet.DoesNotExist:
            return JsonResponse(
                {"status": "error", "message": "User profile not found."}, status=404
            )
    else:
        return JsonResponse(
            {"status": "error", "message": "User is not authenticated."}, status=401
        )


# logout
@csrf_exempt
def user_logout(request):
    logout(request)
    response = JsonResponse({"status": "success", "message": "Logged out successfully"})
    response.delete_cookie("sessionid")
    return response


# after signup (register) save data into database
@csrf_exempt
def submit_data(request):
    if request.method == "POST":
        data = json.loads(request.body)
        phone = data.get("phone")
        first_name = data.get("firstName")
        last_name = data.get("lastName")
        email = data.get("email")
        address = data.get("address")

        first_name = str(first_name).capitalize()
        last_name = str(last_name).capitalize()

        global my_username
        my_username = str(first_name).lower() + "_" + str(phone[:4])
        raw_password = str(my_username) + "@" + str(phone[:4])

        hashed_password = make_password(raw_password)

        print(my_username)
        print(data)
        try:
            # Save the data to the database
            user_data = UserDataSet(
                phone=phone,
                first_name=first_name,
                last_name=last_name,
                email=email,
                address=address,
                my_username=my_username,
                password=hashed_password,
            )
            user_data.save()

            return JsonResponse(
                {"status": "success", "message": "Data saved successfully"}
            )
        except Exception as e:
            return JsonResponse(
                {"status": "error", "message": f"Failed to save data: {str(e)}"},
                status=500,
            )

    return JsonResponse(
        {"status": "error", "message": "Invalid request method"}, status=400
    )


# user can send email to website owner for contact us page
@csrf_exempt
def contact_view(request):
    if request.method == "POST":
        data = json.loads(request.body)
        name = data.get("name")
        email = data.get("email")
        message = data.get("message")

        # Construct email content
        subject = f"Contact Us (Foodie): Message from {name}"
        email_message = f"""
        <html>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
                <h2 style="color: #4CAF50;">New Contact Us Message</h2>
                <p><strong>Name:</strong> {name}</p>
                <p><strong>Email:</strong> <a href="mailto:{email}" style="color: #4CAF50;">{email}</a></p>
                <p><strong>Message:</strong></p>
                <p style="border-left: 4px solid #4CAF50; padding-left: 15px; color: #555;">{message}</p>
                <br>
                <p>Best Regards,<br>Foodie Website</p>
                <footer style="margin-top: 20px; text-align: center; color: #aaa;">
                    <p>Foodie | 123 Foodie Lane. | Ahmedabad City, 382415</p>
                    <p><a href="#" style="color: #4CAF50;">Visit our website</a></p>
                </footer>
            </body>
        </html>
        """
        email_from = email
        recipient_list = ["12a15darshangohil@gmail.com"]

        try:
            send_mail(
                subject,
                email_message,
                email_from,
                recipient_list,
                fail_silently=False,
                html_message=email_message,
            )
            return JsonResponse(
                {"status": "success", "message": "Email sent successfully!"}, status=200
            )
        except Exception as e:
            return JsonResponse({"status": "error", "message": str(e)}, status=500)

    return JsonResponse(
        {"status": "error", "message": "Invalid request method"}, status=400
    )

    # it is remove because account/login not create
    # @login_required


# add to Crt model
@csrf_exempt
def add_to_cart(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            user_id = data.get("user")
            cart_details = data.get("cart_details")
            last_updated = data.get("last_updated")
            quantity = data.get("quantity")

            User = get_user_model()
            user = User.objects.get(id=user_id)

            # Check if the item already exists in the user's cart
            existing_cart_item = Cart.objects.filter(
                user=user, cart_details=cart_details, ordered=False
            ).first()

            if existing_cart_item:
                # If the item exists, increase the quantity
                existing_cart_item.quantity += quantity
                existing_cart_item.last_updated = last_updated
                existing_cart_item.save()
                message = "Cart quantity updated successfully."
            else:
                # If the item does not exist, create a new cart entry
                new_cart_item = Cart(
                    user=user,
                    cart_details=cart_details,
                    last_updated=last_updated,
                    email=user.email,
                    quantity=quantity,
                )
                new_cart_item.save()
                message = "Item added to cart successfully."

            return JsonResponse({"status": "success", "message": message}, status=201)

        except Exception as e:
            return JsonResponse({"status": "error", "message": str(e)}, status=400)

    return JsonResponse(
        {"status": "error", "message": "Invalid request method"}, status=400
    )


# for confirm "order : true" in Cart named model
@csrf_exempt
def show_conformed(request):
    if request.method == "POST":
        data = json.loads(request.body)
        user = data.get("user")

        # Filter cart items for the user where ordered is True
        cart_items = FinalOrder.objects.filter(user=user, ordered=True)

        # Serialize the cart items
        serializer = CartItemSerializer(cart_items, many=True)
        print(serializer.data)

        return JsonResponse(
            {"status": "success", "message": serializer.data}, status=200
        )

    return JsonResponse(
        {"status": "error", "message": "Invalid request method."}, status=400
    )


# generate bill and send it to respected mail
@csrf_exempt
def generate_bill(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            print(data)
            item_id = data.get("item_id")
            discount = data.get("code")
            user_id = data.get("user_id")
            phone = data.get("phone")
            email = data.get("email")
            name = data.get("name")
            cart_details = data.get("order_details")
            quantity = data.get("quantity")

            # fetch from cart
            changeTrue = Cart.objects.get(id=item_id)
            print(changeTrue)
            User = get_user_model()
            user = User.objects.get(id=user_id)
            print(user)

            address = user.address
            # Example string
            amount = cart_details["price"]
            # Regular expression to extract price
            match = re.search(r"₹(\d+)", amount)

            if match:
                amount = int(match.group(1))
                print("Price:", amount)
            else:
                print("Price not found")
            order_id = str(random.randint(10000000, 99999999))

            total_amount = amount * quantity
            discount_coupon = 0
            discount_amount = 0
            percentage = 0

            if discount:
                try:
                    discount_coupon = DiscountCoupon.objects.get(code=discount)
                    percentage = discount_coupon.discount_percentage
                    discount_amount = total_amount * (
                        discount_coupon.discount_percentage / 100
                    )
                except Exception as e:
                    discount = ""
                    print("Not Exists...", e)

            myOrder = FinalOrder(
                user=user,
                order_details=cart_details,
                order_id=order_id,
                amount=amount,
                name=name,
                email=email,
                phone=phone,
                discount=percentage,
                address=address,
                quantity=quantity,
            )
            myOrder.save()

            changeTrue.ordered = True
            changeTrue.save()
            # changeTrue.delete()

            # save to database
            # ---------------------------------------------------------------------------
            context = {
                "user": user,
                "phone": phone,
                "email": email,
                "address": address,
                "order_details": cart_details,
                "order_id": order_id,
                "total_amount": total_amount,
                "name": name,
                "discount": discount,
                "discount_coupon": percentage,
                "payable_amount": total_amount - discount_amount,
                "discount_amount": discount_amount,
                "quantity": quantity,
            }
            html_message = render_to_string("email.html", context)
            plain_message = strip_tags(html_message)

            try:
                # Send email
                send_mail(
                    subject=f"Order Confirmation - Order #{order_id}",
                    message=plain_message,
                    from_email=settings.DEFAULT_FROM_EMAIL,
                    recipient_list=[email],
                    html_message=html_message,
                )
            except Exception as e:
                return JsonResponse({"status": "error", "message": str(e)}, status=400)

            return JsonResponse(
                {
                    "status": "success",
                    "message": "Order is now on way...Please! check Your Email...",
                },
                status=200,
            )

        except Exception as e:
            return JsonResponse({"status": "error", "message": str(e)}, status=400)
    return JsonResponse(
        {"status": "error", "message": "Invalid request method"}, status=400
    )


# for increase quntity
@csrf_exempt
def increase_quantity(request, cart_item_id):
    if request.method == "POST":
        try:
            cart_item = Cart.objects.get(id=cart_item_id, ordered=False)
            cart_item.quantity += 1
            cart_item.save()

            return JsonResponse(
                {
                    "status": "success",
                    "message": "Quantity increased",
                    "new_quantity": cart_item.quantity,
                },
                status=200,
            )
        except Exception as e:
            return JsonResponse({"status": "error", "message": str(e)}, status=400)

    return JsonResponse(
        {"status": "error", "message": "Invalid request method"}, status=400
    )


# for decrease quntity
@csrf_exempt
def decrease_quantity(request, cart_item_id):
    if request.method == "POST":
        try:
            cart_item = Cart.objects.get(id=cart_item_id, ordered=False)

            if cart_item.quantity > 1:
                cart_item.quantity -= 1
                cart_item.save()
                return JsonResponse(
                    {
                        "status": "success",
                        "message": "Quantity decreased",
                        "new_quantity": cart_item.quantity,
                    },
                    status=200,
                )
            else:
                return JsonResponse(
                    {"status": "error", "message": "Quantity cannot be less than 1"},
                    status=400,
                )

        except Exception as e:
            return JsonResponse({"status": "error", "message": str(e)}, status=400)

    return JsonResponse(
        {"status": "error", "message": "Invalid request method"}, status=400
    )


# for admin site show all admin data
def admin_orders(request):
    if request.user.is_authenticated and request.user.is_admin:
        orders = FinalOrder.objects.filter(complete=False).order_by("-last_updated")
        data = [
            {
                "id": order.id,
                "user": order.user.my_username,
                "order_id": order.order_id,
                "name": order.name,
                "email": order.email,
                "phone": order.phone,
                "amount": float(order.amount),
                "quantity": order.quantity,
                "order_details": order.order_details,
                "discount": order.discount,
                "address": order.address,
            }
            for order in orders
        ]
        return JsonResponse({"orders": data, "is_admin": True}, status=200)
    return JsonResponse({"error": "Unauthorized access"}, status=403)


# set complete as true in Finalorder
@csrf_exempt
def delete_order(request):
    if request.method == "POST":
        try:
            data = json.loads(request.body)
            id = data.get("order_id")
            print(id)
            order = FinalOrder.objects.get(id=id, complete=False)
            order.ordered = True
            order.save()
            return JsonResponse(
                {"status": "success", "message": "Order deleted successfully"},
                status=200,
            )
        except FinalOrder.DoesNotExist:
            return JsonResponse(
                {"status": "error", "message": "Order not found"}, status=404
            )
    return JsonResponse(
        {"status": "error", "message": "Invalid request method"}, status=400
    )
