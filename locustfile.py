from locust import HttpUser, task, between
import requests

class MyUser(HttpUser):
    wait_time = between(5, 20)

    def on_start(self):
        self.login()

    def login(self):
        response = requests.post('https://upravdom-23b8c.ondigitalocean.app/auth/login',
         {"username": "admin", "password": "Zxcvbn321"})
        self.client.headers.update({'Authorization': 'Bearer ' + response.json()['access']})


    @task(20)
    def todos(self):
        self.client.get('todos/277')

    @task(2)
    def comments(self):
        self.client.post('comments/277', json={"comment_text": "Тест",
         "inquiry": 277})

    @task(1)
    def new_todo(self):
        self.client.post('todos', json={"inquiry_title": "Тестовая заявка",
         "inquiry_text": "Текст", "todo_category": 1})