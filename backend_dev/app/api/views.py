import requests
import datetime

from django.contrib.auth import get_user_model
from django.contrib.auth.models import Group

from rest_framework import viewsets
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from rest_framework.authtoken.models import Token

from app.api.serializers import UserSerializer, RegisterSerializer, HotelSerializer
from app.api.models import Hotel

User = get_user_model()

class HotelViewSet(viewsets.ModelViewSet):
    """
    API endpoint that allows users to be viewed or edited.
    """
    queryset = Hotel.objects.all()
    serializer_class = HotelSerializer

@api_view(['POST'])
def customer_register(request):
    ser = RegisterSerializer(data=request.data)
    # try:
    if ser.is_valid():
        user = ser.save()

        password = request.data['password']
        username = request.data['email']
        name = request.data['name']

        try:
            user = User.objects.get(username=username)
        except Exception as e:
            print(e)
            return Response({'reason': 'User has been created, but failed to login'}, status=status.HTTP_400_BAD_REQUEST)

        try:
            user_token = user.auth_token.key
        except:
            user_token = Token.objects.create(user=user).key

        data = {
            'token': user_token,
            'name': user.name,
            'email': user.email,
            'is_lsu': user.is_lsu
        }

        return Response(data=data, status=status.HTTP_200_OK)

    return Response(ser.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
def customer_login(request):
    """
    login for customer
    """
    data = request.data

    try:
        username = data['email']
        password = data['password']
    except:
        return Response(status=status.HTTP_400_BAD_REQUEST)

    try:
        user = User.objects.get(username=username)
        if not user.check_password(password):
            return Response(status=status.HTTP_401_UNAUTHORIZED)
    except:
        return Response(status=status.HTTP_401_UNAUTHORIZED)

    try:
        user_token = user.auth_token.key
    except:
        user_token = Token.objects.create(user=user).key

    data = {
        'token': user_token,
        'name': user.name,
        'email': user.email,
        'is_lsu': user.is_lsu
    }

    return Response(data=data, status=status.HTTP_200_OK)

@api_view(['POST'])
def search(request):
    data = request.data

    filter_obj = {}
    if data.get('name', None) is not None:
        filter_obj['name__icontains'] = data['name']
    if data.get('district', None) is not None:
        filter_obj['district'] = data['district']
    if data.get('star', None) is not None:
        filter_obj['star'] = data['star']

    hotels = Hotel.objects.filter(**filter_obj)

    hotels = [{
        'name': hotel.name,
        'address': hotel.address,
        'star': hotel.star,
        'owner': hotel.owner,
        'cert_start': hotel.cert_start,
        'cert_end': hotel.cert_end
    } for hotel in hotels]

    return Response(data={'hotels': hotels}, status=status.HTTP_200_OK)

