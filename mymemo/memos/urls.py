from rest_framework import routers
from .api import MemoViewset
from .views import uploadFiles, download
from django.urls import path
router = routers.DefaultRouter()
router.register('api/memos', MemoViewset, 'memos')
urlpatterns = router.urls
urlpatterns.append(path('upload', uploadFiles))
urlpatterns.append(path('download', download))
