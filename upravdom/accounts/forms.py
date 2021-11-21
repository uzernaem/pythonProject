from django import forms
from django.contrib.auth.models import User
from django.contrib.auth.forms import UserCreationForm


class SignUpForm(UserCreationForm):
    first_name = forms.CharField(max_length=100, help_text='Имя пользователя')
    last_name = forms.CharField(max_length=100, help_text='Фамилия пользователя')
    phone_number = forms.CharField(max_length=100, help_text='Номер телефона')
    email = forms.EmailField(max_length=150, help_text='Адрес электронной почты')

    class Meta:
        model = User
        fields = ('username', 'first_name', 'last_name', 'phone_number',
                  'email', 'password1', 'password2',)
