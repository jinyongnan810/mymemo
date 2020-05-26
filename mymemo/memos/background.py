import os
import json
import re
# from background_task import background
from .models import Memo
from django.conf import settings
import shutil
import datetime
# @background(schedule=10)


def cleanFiles():
    print('cleaning', datetime.datetime.now())
    folders = os.listdir(settings.MEDIA_ROOT)
    for id in folders:
        if id == '.DS_Store':
            continue
        folder = os.path.join(settings.MEDIA_ROOT, id)
        try:
            memo = Memo.objects.get(pk=id)
        except:
            shutil.rmtree(folder, ignore_errors=True)

        db_files = json.loads(memo.file_list)
        db_filename_list = []
        for db_file in db_files:
            db_filename_list.append(re.findall(
                ".+/?path=.+?/(.+?)&name=.+", db_file)[0])

        files = os.listdir(folder)
        files_diff = list(set(files)-set(db_filename_list))
        for diff in files_diff:
            print('delete:', diff)
            os.remove(os.path.join(folder, diff))
        files_after = os.listdir(folder)
        if len(files_after) == 0:
            shutil.rmtree(os.path.join(folder), ignore_errors=True)
