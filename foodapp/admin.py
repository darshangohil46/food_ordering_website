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
admin.site.register(FinalOrder)
admin.site.register(Review)

admin.site.register(PizzaBurger)
admin.site.register(Dessert)
admin.site.register(Gujarati)
admin.site.register(Panjabi)
admin.site.register(SouthIndian)


admin.site.site_header = "Food Order Website (Foodie)"
admin.site.index_title = "Foodie Admin"
admin.site.site_title = "Food Website"
