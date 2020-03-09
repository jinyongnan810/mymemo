from django.db import models
import uuid

# Create your models here.


class Memo(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    title = models.CharField(max_length=50)
    content = models.TextField(null=True, blank=True)
    file_list = models.TextField(null=True, blank=True)
    image_list = models.TextField(null=True, blank=True)
    create_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)
