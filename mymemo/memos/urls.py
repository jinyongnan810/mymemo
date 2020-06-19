from rest_framework import routers
from .api import MemoViewset
from .views import uploadFiles, download, clean, publicApi
from django.urls import path
from .background import cleanFiles
# from background_task.models import Task
router = routers.DefaultRouter()
router.register('api/memos', MemoViewset, 'memos')
urlpatterns = router.urls
urlpatterns.append(path('upload', uploadFiles))
urlpatterns.append(path('download', download))
urlpatterns.append(path('clean', clean))
urlpatterns.append(path('publicApi', publicApi))

# Task.objects.all().delete()
# cleanFiles(repeat=86400, repeat_until=None)
