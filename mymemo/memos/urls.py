from rest_framework import routers
from .api import MemoViewset
router = routers.DefaultRouter()
router.register('api/memos', MemoViewset, 'memos')
urlpatterns = router.urls
