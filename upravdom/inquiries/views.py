from datetime import date
from django.core.paginator import Paginator, EmptyPage, PageNotAnInteger
from django.db.models import Q
from django.shortcuts import render
from django.http.response import JsonResponse
from rest_framework import viewsets, permissions, status
from rest_framework.decorators import api_view
from rest_framework.response import Response
from rest_framework.views import APIView

from rest_framework.parsers import JSONParser 

from inquiries.serializers import AnnouncementSerializer, ToDoSerializer, PollSerializer, NotificationSerializer, \
    CommentSerializer, VoteOptionSerializer, VoteSerializer, ProfileSerializer, ToDoCategorySerializer
from inquiries.models import Announcement, ToDo, Poll, Notification, Property, Comment, VoteOption, Vote, Profile, ToDoCategory
# Create your views here.
@api_view(['GET', 'POST', 'DELETE'])
def todo_list(request):
    if request.method == 'GET':
        todos = ToDo.objects.all()
        
        title = request.GET.get('inquiry_title', None)
        if title is not None:
            todos = todos.filter(title__icontains=title)
        
        todos_serializer = ToDoSerializer(todos, many=True)
        return JsonResponse(todos_serializer.data, safe=False)

    elif request.method == 'POST':
        todo_data = JSONParser().parse(request)
        todo_serializer = ToDoSerializer(data=todo_data)
        if todo_serializer.is_valid():
            todo_serializer.save()
            return JsonResponse(todo_serializer.data, status=status.HTTP_201_CREATED) 
        return JsonResponse(todo_serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET', 'POST', 'DELETE'])
def todocategory_list(request):
    if request.method == 'GET':
        categories = ToDoCategory.objects.all()
        categories_serializer = ToDoCategorySerializer(categories, many=True)
        return JsonResponse(categories_serializer.data, safe=False)
    categories_serializer = ToDoCategorySerializer()
    return JsonResponse(categories_serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['GET', 'PUT', 'DELETE'])
def todocategory_detail(request, pk):
    try: 
        category = ToDoCategory.objects.get(pk=pk) 
    except ToDoCategory.DoesNotExist: 
        return JsonResponse({'message': 'Категория не существует'}, status=status.HTTP_404_NOT_FOUND) 

    if request.method == 'GET': 
        todocategory_serializer = ToDoCategorySerializer(category) 
        return JsonResponse(todocategory_serializer.data) 

    elif request.method == 'PUT': 
        todocategory_data = JSONParser().parse(request) 
        todocategory_serializer = ToDoCategorySerializer(category, data=todocategory_data) 
        if todocategory_serializer.is_valid(): 
            todocategory_serializer.save() 
            return JsonResponse(todocategory_serializer.data) 
        return JsonResponse(todocategory_serializer.errors, status=status.HTTP_400_BAD_REQUEST) 
 
 
@api_view(['GET', 'PUT', 'DELETE'])
def todo_detail(request, pk):
    try: 
        todo = ToDo.objects.get(pk=pk) 
    except ToDo.DoesNotExist: 
        return JsonResponse({'message': 'Заявка не существует'}, status=status.HTTP_404_NOT_FOUND) 

    if request.method == 'GET': 
        todo_serializer = ToDoSerializer(todo) 
        return JsonResponse(todo_serializer.data) 

    elif request.method == 'PUT': 
        todo_data = JSONParser().parse(request) 
        todo_serializer = ToDoSerializer(todo, data=todo_data) 
        if todo_serializer.is_valid(): 
            todo_serializer.save() 
            return JsonResponse(todo_serializer.data) 
        return JsonResponse(todo_serializer.errors, status=status.HTTP_400_BAD_REQUEST) 


class ToDoViewSet(viewsets.ModelViewSet):
    serializer_class = ToDoSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return ToDo.objects.filter(Q(inquiry_creator=user) | Q(todo_assigned_to=user))


class AnnouncementViewSet(viewsets.ModelViewSet):
    serializer_class = AnnouncementSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Announcement.objects.filter(Q(announcement_auto_invisible_date__gt=date.today(), announcement_is_visible=True) | Q(inquiry_creator=user) | Q(announcement_auto_invisible_date__isnull=True))


class PollViewSet(viewsets.ModelViewSet):
    queryset = Poll.objects.all()
    serializer_class = PollSerializer
    permission_classes = [permissions.IsAuthenticated]


class NotificationViewSet(viewsets.ModelViewSet):
    serializer_class = NotificationSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_queryset(self):
        user = self.request.user
        return Notification.objects.filter(Q(inquiry_creator=user) | Q(notification_recipient=user))


class PropertyViewSet(viewsets.ModelViewSet):
    queryset = Property.objects.all()
    serializer_class = AnnouncementSerializer
    permission_classes = [permissions.IsAuthenticated]


class CommentViewSet(viewsets.ModelViewSet):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticated]


class VoteOptionViewSet(viewsets.ModelViewSet):
    queryset = VoteOption.objects.all()
    serializer_class = VoteOptionSerializer
    permission_classes = [permissions.IsAuthenticated]


class VoteViewSet(viewsets.ModelViewSet):
    queryset = Vote.objects.all()
    serializer_class = VoteSerializer
    permission_classes = [permissions.IsAuthenticated]


class ProfileViewSet(viewsets.ModelViewSet):
    queryset = Profile.objects.all()
    serializer_class = ProfileSerializer
    permission_classes = [permissions.IsAuthenticated]


