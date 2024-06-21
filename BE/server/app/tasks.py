# jobs/tasks.py

from celery import shared_task
from .utils import notify_job_status_change
import time
from .models import Job


# mimic SJF
@shared_task
def process_job():
  try:
    print("celery process")
    job = Job.objects.filter(status = 'pending').order_by("duration").first()
    job.status = 'running'
    job.save()
    notify_job_status_change(job)
    
    # Simulate job processing time
    time.sleep(job.duration.total_seconds())
    
    job.status = 'completed'
    job.save()
    notify_job_status_change(job)
    
    # Check if there are other pending jobs and schedule the next one
    next_job = Job.objects.filter(status='pending').order_by('duration').first()
    if next_job:
      process_job.apply_async(countdown=0)
  except Exception:
    pass
