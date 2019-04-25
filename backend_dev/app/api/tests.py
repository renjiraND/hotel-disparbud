from django.test import TestCase

from django.contrib.auth import get_user_model
from app.api.models import Hotel

from rest_framework import status
from rest_framework.test import APIClient

User = get_user_model()

class ClientTest(TestCase):
	def __init__(self, *args, **kwargs):
		super(ClientTest, self).__init__(*args, **kwargs)
		self.client = APIClient()

class UserAuthTest(ClientTest):
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


class HotelTest(ClientTest):
	def populate_hotels(self):
		hotels = [
			{
	            "id": 1,
	            "name": "Hotel Harris",
	            "district": "Coblog",
	            "address": "Pokoknya di Coblong",
	            "star": 5,
	            "owner": "Ijuan",
	            "cert_start": "12:12:00",
	            "cert_end": "23:12:00"
	        },
	        {
	            "id": 2,
	            "name": "Hotel Fairmont",
	            "district": "Coblong",
	            "address": "Pokoknya di Coblong",
	            "star": 2,
	            "owner": "Ijuan",
	            "cert_start": "12:12:00",
	            "cert_end": "23:12:00"
	        },
	        {
	            "id": 3,
	            "name": "Hotel Huyu",
	            "district": "Cimbel",
	            "address": "depan Unpar",
	            "star": 1,
	            "owner": "Felipe",
	            "cert_start": "12:12:00",
	            "cert_end": "23:12:00"
	        }
		]
		for hotel in hotels:
			Hotel.objects.create(**hotel)

	def test_get_all_hotels(self):
		# Before populate
		response = self.client.get('/hotels/')
		num_of_hotels = len(response.data['results'])
		self.assertEqual(num_of_hotels, 0, 'it should be 0 hotels')

		# After populate
		self.populate_hotels()
		response = self.client.get('/hotels/')
		num_of_hotels = len(response.data['results'])
		self.assertEqual(num_of_hotels, 3, 'it should be 3 hotels')

	def test_get_one_hotel(self):
		self.populate_hotels()
		response = self.client.get('/hotels/1/')
		self.assertEqual(response.status_code, status.HTTP_200_OK, 'is should return 200 status code')

	def test_add_hotel(self):
		# Before add
		response = self.client.get('/hotels/')
		num_of_hotels = len(response.data['results'])
		self.assertEqual(num_of_hotels, 0, 'it should be 0 hotels')

		# Add hotel
		hotel_payload = {
			"id": 1,
            "name": "Hotel Harris",
            "district": "Coblog",
            "address": "Pokoknya di Coblong",
            "star": 5,
            "owner": "Ijuan",
            "cert_start": "12:12:00",
            "cert_end": "23:12:00"
		}
		response = self.client.post('/hotels/', hotel_payload, format='json')
		self.assertEqual(response.status_code, status.HTTP_201_CREATED, 'is should return 201 status code')

		# After add
		response = self.client.get('/hotels/')
		num_of_hotels = len(response.data['results'])
		self.assertEqual(num_of_hotels, 1, 'it should be 1 hotels')

	def test_search_hotel(self):
		self.populate_hotels()

		search_payload = {
			'name': 'hotel',
			'star': 5
		}
		response = self.client.post('/search/', search_payload, format='json')
		self.assertEqual(response.status_code, status.HTTP_200_OK, 'is should return 200 status code')
		num_of_matched_hotels = len(response.data['hotels'])
		self.assertEqual(num_of_matched_hotels, 1, 'is should return 1 matched hotel')
