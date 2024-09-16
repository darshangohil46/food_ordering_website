from django.contrib.auth.backends import BaseBackend
from .models import UserDataSet


class PhoneBackend(BaseBackend):
    def authenticate(self, request, phone=None):
        print(f"Attempting to authenticate with phone: {phone}")
        try:
            user = UserDataSet.objects.get(phone=phone)
            print(f"User found: {user}")
            return user
        except UserDataSet.DoesNotExist:
            print(f"No user found with phone: {phone}")
            return None

    def get_user(self, user_id):
        try:
            user = UserDataSet.objects.get(pk=user_id)
            print(f"Retrieved user with ID {user_id}: {user}")
            return user
        except UserDataSet.DoesNotExist:
            print(f"No user found with ID: {user_id}")
            return None
