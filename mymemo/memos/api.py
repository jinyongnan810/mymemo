from memos.models import Memo
from rest_framework import viewsets, permissions
from .serializer import MemoSerializer


class MemoViewset(viewsets.ModelViewSet):
    queryset = Memo.objects.all()
    permission_classes = [
        permissions.AllowAny
    ]
    serializer_class = MemoSerializer
