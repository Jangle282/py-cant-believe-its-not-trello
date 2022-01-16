from django.urls import path, include
from rest_framework import routers
from  . import views

router = routers.DefaultRouter()
router.register(r'cards', views.CardView, 'card')
router.register(r'columns', views.ColumnView, 'column')

# Wire up our API using automatic URL routing.
# Additionally, we include login URLs for the browsable API.
urlpatterns = [
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]