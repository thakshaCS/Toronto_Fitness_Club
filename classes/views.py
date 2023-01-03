import json
from datetime import timedelta, datetime

from django.core import serializers
from django.utils import timezone
from django_filters.rest_framework import DjangoFilterBackend
from django.http import HttpResponse, response, HttpResponseRedirect, Http404, JsonResponse
from django.shortcuts import render
from django.views.decorators.csrf import csrf_exempt
from rest_framework import status, filters
from rest_framework.decorators import api_view
from rest_framework.generics import RetrieveAPIView, ListAPIView, CreateAPIView, UpdateAPIView, ListCreateAPIView, \
    RetrieveUpdateAPIView
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.views import APIView

from classes.models import Keyword, Class
from django.views.generic import TemplateView, ListView
from django.shortcuts import get_object_or_404
from rest_framework.response import Response
from classes.serializers import CreateClassesSerializer, EnrolClassesSerializer


# Create your views here.
# class ClassesView()
# class CreateClassesView(RetrieveAPIView, UpdateAPIView):
#     serializer_class = CreateClassesSerializer
#
#     def get_object(self):
#         return get_object_or_404(Classes, id=self.kwargs['classes_id'])
#
# class CreateClassesView(CreateAPIView):
#     permission_classes = [IsAuthenticated]
#     serializer_class =  CreateClassesSerializer
#
# class ClassesListCreateAPIView(ListCreateAPIView):
# @csrf_exempt
# def ClassesCreate(request):
#     if request.method == "POST":
#         class_info = json.load(request.body)
#         name = class_info.get('name')
#         description = class_info.get('description')
#         coach = class_info.get('coach')
#         capacity = int(class_info.get('capacity'))
#         keywords = class_info.get('keywords')
#         day = class_info.get('day')
#         start_time = class_info.get('start_time')
#         end_time = class_info.get('end_time')
#
#         new_classes = Classes(name=name, description=description, coach=coach, capacity=capacity, day=day)
#         new_classes.save()

# @api_view(['GET'])
# def ClassesList(request):
#     classes = Classes.objects.all()
#     serializer = CreateClassesSerializer(classes, many=True)
#     return Response(serializer.data)
#
#
# @api_view(['POST'])
# def ClassesCreate(request):
#     serializer = CreateClassesSerializer(data=request.data)
#
#     if serializer.is_valid():
#         serializer.save()
#
#     return Response(serializer.data)
#
#
# @api_view(['POST'])
# def ClassCreate(request, pk):
#     classes = Classes.objects.get(id=pk)
#     serializer = CreateClassSerializer(instance=classes, data=request.data)
#
#     if serializer.is_valid():
#         serializer.save()
#
#     return Response(serializer.data)

class ClassesView(ListAPIView):
    queryset = Class.objects.all().order_by('start_date', 'start_time')
    serializer_class = CreateClassesSerializer
    filter_backends = [filters.SearchFilter, DjangoFilterBackend]
    filterset_fields = ['name', 'coach', 'start_time', 'end_time', 'start_date', 'end_date']
    search_fields = ['name', 'coach', 'start_time', 'end_time', 'start_date', 'end_date']

    def get(self, request, *args, **kwargs):
        # auth_token = request.COOKIES.get('auth_token')
        # if not auth_token:
        #     # response = JsonResponse()
        #     # queryset = Class.objects.all().order_by('start_date', 'start_time')
        #     # response.status_code = status.HTTP_200_OK
        #     # response.data = serializers.serialize('json', queryset)
        #     # return response

        return self.list(request, *args, **kwargs)

    # else:
    #     return Response(
    #         {'message': "unauthorized access"},
    #         status=status.HTTP_401_UNAUTHORIZED)

    def post(self, request, *args, **kwargs):
        auth_token = request.COOKIES.get('auth_token')
        if not auth_token:
            return HttpResponseRedirect(
                redirect_to='http://127.0.0.1:8000/classes/classes-view/')
        else:
            return Response(
                {'message': "unauthorized access"},
                status=status.HTTP_401_UNAUTHORIZED)


class UserEnrolClass(ListAPIView):
    queryset = Class.objects.all().order_by('start_date', 'start_time')
    serializer_class = EnrolClassesSerializer

    def get_object(self, pk):
        try:
            return Class.objects.get(pk=pk)
        except Class.DoesNotExist:
            raise Http404

    def get(self, request, *args, **kwargs):
        auth_token = request.COOKIES.get('auth_token')
        if auth_token:
            return self.list(request, *args, **kwargs)
        else:
            return Response(
                {'message': "unauthorized access"},
                status=status.HTTP_401_UNAUTHORIZED)

    def post(self, request, pk, format=None):
        user = self.get_object(pk)
        serializer = EnrolClassesSerializer(user, data=request.data)
        auth_token = request.COOKIES.get('auth_token')
        if auth_token:
            if serializer.is_valid():
                if user.is_enrolled:
                    user.space_available -= 1
                    user.is_enrolled = True
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # def post(self, request, *args, **kwargs):
    #     auth_token = request.COOKIES.get('auth_token')
    #     if auth_token:
    #         return HttpResponseRedirect(
    #             redirect_to='http://127.0.0.1:8000/classes/enrol-class/')
    #     else:
    #         return Response(
    #             {'message': "unauthorized access"},
    #             status=status.HTTP_401_UNAUTHORIZED)


class DeEnrolClass(APIView):
    queryset = Class.objects.all().order_by('start_date', 'start_time')
    serializer_class = EnrolClassesSerializer

    def get_object(self, pk):
        try:
            return Class.objects.get(pk=pk)
        except Class.DoesNotExist:
            raise Http404

    def get(self, request, pk, format=None):
        auth_token = request.COOKIES.get('auth_token')
        if auth_token:
            response = Response()
            response.data = {}
            response.status_code = status.HTTP_200_OK
            user = self.get_object(pk)
            serializer = EnrolClassesSerializer(user)
            return Response(serializer.data)
        else:
            return Response(
                {'message': "unauthorized access"},
                status=status.HTTP_401_UNAUTHORIZED)

    def post(self, request, pk, format=None):
        user = self.get_object(pk)
        serializer = EnrolClassesSerializer(user, data=request.data)
        auth_token = request.COOKIES.get('auth_token')
        if auth_token:
            if serializer.is_valid():
                if user.space_available < user.capacity:
                    user.space_available += 1
                    user.is_enrolled = False
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    # def post(self, request, *args, **kwargs):
    #     auth_token = request.COOKIES.get('auth_token')
    #     if not auth_token:
    #         return HttpResponseRedirect(
    #             redirect_to='http://127.0.0.1:8000/classes/drop-classes/<int:pk>')
    #     else:
    #         return Response(
    #             {'message': "unauthorized access"},
    #             status=status.HTTP_401_UNAUTHORIZED)
