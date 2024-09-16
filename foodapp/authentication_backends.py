from django.contrib.auth.backends import ModelBackend
from .models import UserDataSet

class PhoneBackend(ModelBackend):
    def authenticate(self, request, phone=None, otp=None):
        try:
            user = UserDataSet.objects.get(phone=phone, otp=otp)
            if user.otp == otp:
                return user
        except UserDataSet.DoesNotExist:
            return None

    def get_user(self, user_id):
        try:
            return UserDataSet.objects.get(pk=user_id)
        except UserDataSet.DoesNotExist:
            return None
