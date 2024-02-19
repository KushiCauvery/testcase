# project/urls.py or test_generator/urls.py

from django.urls import path
from testcaseapp.views import generate_test_cases

urlpatterns = [
    path('test-cases', generate_test_cases, name='generate_test_cases'),
]
