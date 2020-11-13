from django.contrib import admin
from .models.League import League
from .models.Match import Match


admin.site.register(League)
admin.site.register(Match)
