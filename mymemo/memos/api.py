from memos.models import Memo
from rest_framework import viewsets, permissions
from .serializer import MemoSerializer


class MemoViewset(viewsets.ModelViewSet):
    queryset = Memo.objects.all()
    permission_classes = [
        permissions.IsAuthenticated
    ]
    serializer_class = MemoSerializer

    def get_queryset(self):
        return self.request.user.memos.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)
