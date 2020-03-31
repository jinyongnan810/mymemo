import re
import json
import os
from rest_framework import serializers
from memos.models import Memo
from django.conf import settings


class MemoSerializer(serializers.ModelSerializer):
    class Meta:
        model = Memo
        fields = '__all__'

    def update(self, instance, validated_data):
        content = validated_data.get('content', instance.content)
        file_list = validated_data.get('file_list', instance.file_list)
        match = re.findall("\((download\?path=.+?&name=.+?)\)", content)
        validated_data['file_list'] = json.dumps(match)

        return super().update(instance, validated_data)
