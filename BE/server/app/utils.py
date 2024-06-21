# jobs/utils.py

from channels.layers import get_channel_layer
from asgiref.sync import async_to_sync
import json

def notify_job_status_change(job):
    channel_layer = get_channel_layer()
    async_to_sync(channel_layer.group_send)(
      "jobs",  # group name
      {
        "type": "job.update",  # custom type for handling in consumer
        "job_data": {
          "id": job.id,
          "name": job.name,
          "duration": str(job.duration),
          "status": job.status,
        }
      }
    )
