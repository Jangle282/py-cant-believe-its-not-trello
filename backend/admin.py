from django.contrib import admin
from .models import Column, Card

# Register your models here.


class ColumnAdmin(admin.ModelAdmin):
    readonly_fields = ('id',)
    list_display = ('id', 'name', 'order')


admin.site.register(Column, ColumnAdmin)


class CardAdmin(admin.ModelAdmin):
    readonly_fields = ('id', 'column_id',)
    list_display = ('id', 'name', 'order', 'column_id')


admin.site.register(Card, CardAdmin)
