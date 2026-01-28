# test_register.py
import requests

url = "http://127.0.0.1:8001/api/register"
data = {
    "email": "script@example.com",
    "password": "123456",
    "name": "Script Test",
    "phone": "+79995556677",
    "role": "user"
}

response = requests.post(url, json=data)
print("Status:", response.status_code)
print("Response:", response.json())

url = "http://127.0.0.1:8001/api/login"
data = {
    "email": "script@example.com",
    "password": "123456"
}

response = requests.post(url, json=data)
print("Status:", response.status_code)
print("Response:", response.json())