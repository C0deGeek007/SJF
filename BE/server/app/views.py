from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework import status

from .models import Job
from .serializers import JobSerializer
from .tasks import process_job


@api_view(['GET', 'POST'])
def job_list(request):
  if request.method == 'GET':
    jobs = Job.objects.all().order_by("id")
    serializer = JobSerializer(jobs, many=True)
    return Response(serializer.data)

  elif request.method == 'POST':
    serializer = JobSerializer(data=request.data)
    if serializer.is_valid():
      if(Job.objects.filter(status='pending').count()<1):
        serializer.save()
        # Trigger job processing asynchronously
        process_job.apply_async(countdown=0)
      else:
        serializer.save()
      return Response(serializer.data, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)