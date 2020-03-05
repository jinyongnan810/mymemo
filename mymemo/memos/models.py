from django.db import models

# Create your models here.
class Memo(models.Model):
    id = models.UUIDField(primary_key=True)
    title = models.CharField(max_length=50)
    content = models.TextField()
    file_list = models.TextField()
    image_list = models.TextField()
    create_at = models.DateTimeField(auto_now_add=True)
    update_at = models.DateTimeField(auto_now=True)
    