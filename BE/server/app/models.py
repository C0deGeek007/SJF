from django.db import models

class Job(models.Model):
  name = models.CharField(max_length=255)
  duration = models.DurationField()
  STATUS_CHOICES = [
    ('pending', 'Pending'),
    ('running', 'Running'),
    ('completed', 'Completed'),
  ]
  status = models.CharField(max_length=10, choices=STATUS_CHOICES, default='pending')


# @receiver(post_save, sender=Job)
# def trigger_job_processing(sender, instance, created, **kwargs):
#     if created:
#         process_job.apply_async((instance.id,), countdown=0)

