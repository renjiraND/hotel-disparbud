from django.test import TestCase

from django.contrib.auth import get_user_model
from app.api.models import Hotel

from rest_framework import status
from rest_framework.test import APIClient

User = get_user_model()

class UserAuthTest(TestCase):
	def __init__(self, *args, **kwargs):
		super(UserAuthTest, self).__init__(*args, **kwargs)
		self.client = APIClient()

	def populate_user(self):
		User.objects.create_user(username='izzan@itb.com',
								name='Ahmad Izzan',
								email='izzan@itb.com',
								password='hahaha',
								is_lsu=0)

	def test_register_success(self):
		register_payload = {
			'name': 'Ahmad Izzan',
			'password': 'hello',
			'email': 'izzan@itb.com',
			'is_lsu': 0
		}
		response = self.client.post('/register/', register_payload, format='json')
		self.assertEqual(response.status_code, status.HTTP_200_OK, 'is should return 200 status code')

	def test_register_fail(self):
		# no email, suppose to fail and return status code 400
		register_payload = {
			'name': 'Ahmad Izzan',
			'password': 'hello',
			'is_lsu': 0
		}
		response = self.client.post('/register/', register_payload, format='json')
		self.assertEqual(response.status_code, status.HTTP_400_BAD_REQUEST, 'is should return 400 status code')

	def test_login_success(self):
		self.populate_user()
		login_payload = {
			'email': 'izzan@itb.com',
			'password': 'hahaha'
		}
		response = self.client.post('/login/', login_payload, format='json')
		self.assertEqual(response.status_code, status.HTTP_200_OK, 'is should return 200 status code')

	def test_login_fail(self):
		self.populate_user()
		login_payload = {
			'email': 'izzan@itb.com',
			'password': 'bukan_hahaha' # wrong password
		}
		response = self.client.post('/login/', login_payload, format='json')
		self.assertEqual(response.status_code, status.HTTP_401_UNAUTHORIZED, 'is should return 401 status code')







