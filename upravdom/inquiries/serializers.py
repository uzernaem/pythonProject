from django.utils.datetime_safe import datetime
from rest_framework import serializers
from .models import Announcement, ToDo, Poll, Notification, Property, Comment, VoteOption, Vote, Profile


class ToDoSerializer(serializers.ModelSerializer):
    class Meta:
        model = ToDo
        fields = '__all__'

    def create(self, validated_data):
        user = self.context['request'].user
        todo = ToDo(
            inquiry_title=validated_data['inquiry_title'],
            inquiry_creator=user,
            inquiry_text=validated_data['inquiry_text'],
            todo_category=validated_data['todo_category']
        )
        todo.save()
        return todo

    def update(self, instance, validated_data):
        instance.inquiry_is_done = validated_data.get('inquiry_is_done', instance.inquiry_is_done)
        instance.todo_assigned_to = validated_data.get('todo_assigned_to', instance.todo_assigned_to)
        instance.todo_status = validated_data.get('todo_status', instance.todo_status)
        instance.save()
        return instance


class AnnouncementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Announcement
        fields = '__all__'


class PollSerializer(serializers.ModelSerializer):
    class Meta:
        model = Poll
        fields = '__all__'


class NotificationSerializer(serializers.ModelSerializer):
    class Meta:
        model = Notification
        fields = '__all__'


class PropertySerializer(serializers.ModelSerializer):
    class Meta:
        model = Property
        fields = '__all__'


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'


class VoteOptionSerializer(serializers.ModelSerializer):
    class Meta:
        model = VoteOption
        fields = '__all__'


class VoteSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vote
        fields = '__all__'


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'