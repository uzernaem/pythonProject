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


class CommentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Comment
        fields = '__all__'


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile
        fields = '__all__'