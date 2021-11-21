from django.shortcuts import render

# Create your views here.
# accounts/views.py
from django.contrib.auth import login, authenticate
from .forms import SignUpForm
from django.shortcuts import render, redirect


def home_view(request):
    return render(request, 'home.html')


def signup_view(request):
    form = SignUpForm(request.POST)
    if form.is_valid():
        user = form.save()
        user.refresh_from_db()
        user.person.first_name = form.cleaned_data.get('first_name')
        user.person.last_name = form.cleaned_data.get('last_name')
        user.person.phone_number = form.cleaned_data.get('phone_number')
        user.person.email = form.cleaned_data.get('email')
        user.save()
        username = form.cleaned_data.get('username')
        password = form.cleaned_data.get('password1')
        user = authenticate(username=username, password=password)
        login(request, user)
        return redirect('home')
    else:
        form = SignUpForm()
    return render(request, 'registration/signup.html', {'form': form})
