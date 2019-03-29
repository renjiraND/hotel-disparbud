import os
import tempfile

import pytest

from server import create_app

import warnings

warnings.filterwarnings('ignore')


@pytest.fixture
def client():
    client = create_app().test_client()
    return client

def login(client, email, password):
    return client.post('/login', data=dict(
        email=email,
        password=password
    ), follow_redirects=True)

def logout(client):
    return client.get('/logout', follow_redirects=True)

def test_login(client):
	rv = login(client, 'diw@n.gs', 'yeet')
	print('gimana yak cara parse responsenya')
	print(rv.content)
	print(type(rv))
	assert 'Kemenbudpar Jaya' in rv