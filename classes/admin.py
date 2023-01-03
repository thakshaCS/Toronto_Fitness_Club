from django.contrib import admin

from classes.models import Class

from classes.models import Keyword


# Register your models here.

class KeywordInline(admin.TabularInline):
    model = Keyword
    fields = ['keyword']


class ClassesAdmin(admin.ModelAdmin):
    fields = ['name', 'description', 'coach', 'capacity', 'space_available',
              'day', 'start_time', 'end_time', 'start_date', 'end_date', 'studio', 'length', 'is_cancelled']
    inlines = [KeywordInline]


admin.site.register(Class, ClassesAdmin)
admin.site.register(Keyword)