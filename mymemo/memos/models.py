from django.db import models
from django.contrib.auth.models import User
import uuid

# Create your models here.


class Memo(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=50)
    content = models.TextField(null=True, blank=True)
    file_list = models.TextField(null=True, blank=True)
    owner = models.ForeignKey(
        User, related_name='memos', on_delete=models.CASCADE, null=True)
    create_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)
