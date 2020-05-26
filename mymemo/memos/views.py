from django.shortcuts import render
from django.http import JsonResponse, HttpResponse, Http404
from django.views.decorators.http import require_http_methods
from django.conf import settings
from .models import Memo
import os
import uuid
import json
import urllib
# from .background import cleanFiles
# Create your views here.
@require_http_methods(["POST"])
def uploadFiles(request):
    data = request.POST
    id = data.get('id')
    files = []
    folder = '%s/%s/' % (settings.MEDIA_ROOT, id)
    if not os.path.exists(folder):
        os.mkdir(folder)
    for file in request.FILES.getlist('file_field'):
        name, ext = os.path.splitext(file.name)
        filename = uuid.uuid4().__str__() + ext
        path = '%s/%s/%s' % (settings.MEDIA_ROOT, id, filename)
        with open(path, 'wb') as f:
            for chunk in file.chunks():
                f.write(chunk)
        url = 'download?path=%s/%s&name=%s' % (id, filename, file.name)
        files.append({'name': file.name, 'url': url})
    return JsonResponse(files, safe=False)


def download(request):
    path = request.GET.get('path')
    name = request.GET.get('name')
    file_path = os.path.join(settings.MEDIA_ROOT, path)

    if os.path.exists(file_path):
        with open(file_path, 'rb') as fh:
            response = HttpResponse(
                fh.read(), content_type="multipart/form-data;charset=UTF-8")
            response['Content-Disposition'] = 'attachment; filename="{}"'.format(
                urllib.parse.quote(name))
            return response
    raise Http404


def clean(request):
    # cleanFiles(schedule=1)
    return HttpResponse('cleaned')
