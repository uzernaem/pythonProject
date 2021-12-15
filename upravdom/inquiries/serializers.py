from django.contrib.auth.models import User
from rest_framework import serializers
from rest_framework.fields import ReadOnlyField
from .models import Announcement, ToDo, Poll, Notification, Property, Comment, ToDoCategory, VoteOption, Vote, Profile


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = 'id', 'username', 'first_name', 'last_name'

class ToDoSerializer(serializers.ModelSerializer):
    todo_category_name = serializers.CharField(read_only=True, source='get_todo_category_display')
    todo_status_name = serializers.CharField(read_only=True, source='get_todo_status_display')
    todo_priority_name = serializers.CharField(read_only=True, source='get_todo_priority_display')
    inquiry_creator_name = serializers.ReadOnlyField(source='inquiry_creator.first_name')
    inquiry_creator_surname = serializers.ReadOnlyField(source='inquiry_creator.last_name')

    class Meta:
        model = ToDo
        fields = '__all__'

    def create(self, validated_data):
        #user = self.context['request'].user
        todo = ToDo(
            inquiry_title=validated_data['inquiry_title'],
         #   inquiry_creator=user,
            inquiry_text=validated_data['inquiry_text'],
            todo_category=validated_data['todo_category']
        )
        todo.save()
        return todo

    def update(self, instance, validated_data):
        instance.inquiry_title = validated_data.get('inquiry_title', instance.inquiry_title)
        instance.inquiry_text = validated_data.get('inquiry_text', instance.inquiry_text)
        instance.todo_category = validated_data.get('todo_category', instance.todo_category)        
        instance.inquiry_is_done = validated_data.get('inquiry_is_done', instance.inquiry_is_done)
        instance.todo_assigned_to = validated_data.get('todo_assigned_to', instance.todo_assigned_to)
        instance.todo_status = validated_data.get('todo_status', instance.todo_status)
        instance.save()
        return instance


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'


class ToDoCategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = ToDoCategory
        fields = '__all__'


class AnnouncementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Announcement
        fields = '__all__'

    def create(self, validated_data):
        user = self.context['request'].user
        announcement = Announcement(
            inquiry_title=validated_data['inquiry_title'],
            inquiry_creator=user,
            inquiry_text=validated_data['inquiry_text'],
            announcement_is_visible=validated_data['announcement_is_visible'],
            announcement_auto_invisible_date=validated_data['announcement_auto_invisible_date'],
            announcement_category=validated_data['announcement_category']
        )
        announcement.save()
        return announcement

    def update(self, instance, validated_data):
        instance.inquiry_is_done = validated_data.get('inquiry_is_done', instance.inquiry_is_done)
        instance.announcement_is_visible = validated_data.get('announcement_is_visible', instance.announcement_is_visible)
        instance.announcement_auto_invisible_date = validated_data.get('announcement_auto_invisible_date', instance.announcement_auto_invisible_date)
        instance.save()
        return instance


class PollSerializer(serializers.ModelSerializer):
    class Meta:
        model = Poll
        fields = '__all__'

    def create(self, validated_data):
        user = self.context['request'].user
        poll = Poll(
            inquiry_title=validated_data['inquiry_title'],
            inquiry_creator=user,
            inquiry_text=validated_data['inquiry_text'],
            poll_open=validated_data['poll_open'],
            poll_preliminary_results=validated_data['poll_preliminary_results'],
            poll_deadline=validated_data['poll_deadline']
        )
        poll.save()
        return poll

    def update(self, instance, validated_data):
        instance.inquiry_is_done = validated_data.get('inquiry_is_done', instance.inquiry_is_done)
        instance.save()
        return instance


class VoteOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = VoteOption
        fields = '__all__'


class VoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vote
        fields = '__all__'


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'

    def create(self, validated_data):
        user = self.context['request'].user
        notification = Notification(
            inquiry_title=validated_data['inquiry_title'],
            inquiry_creator=user,
            inquiry_text=validated_data['inquiry_text'],
            notification_recipient=validated_data['notification_recipient'],
            notification_category=validated_data['notification_category']
        )
        notification.save()
        return notification

    def update(self, instance, validated_data):
        instance.inquiry_is_done = validated_data.get('inquiry_is_done', instance.inquiry_is_done)
        instance.notification_is_read = validated_data.get('notification_is_read', instance.notification_is_read)
        instance.save()
        return instance


class PropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = '__all__'


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'