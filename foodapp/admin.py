from django.contrib import admin
from .models import *

# Register your models here.
# Register your models here.
admin.site.register(FoodItem)
admin.site.register(Carousel)
admin.site.register(UserDataSet)
admin.site.register(Menu)
admin.site.register(DiscountCoupon)
admin.site.register(Cart)
admin.site.register(PendingOrder)
admin.site.register(Review)


admin.site.site_header = "Food Order Website"
admin.site.index_title = "Food Admin"
admin.site.site_title = "Food Website"
