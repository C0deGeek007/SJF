# jobs/consumers.py

import json
from channels.generic.websocket import WebsocketConsumer
from asgiref.sync import async_to_sync

class JobConsumer(WebsocketConsumer):
  def connect(self):
    async_to_sync(self.channel_layer.group_add)("jobs", self.channel_name)
    self.accept()

  def disconnect(self, close_code):
    async_to_sync(self.channel_layer.group_discard)("jobs", self.channel_name)

  def job_update(self, event):
    job_data = event['job_data']
    self.send(text_data=json.dumps(job_data))
