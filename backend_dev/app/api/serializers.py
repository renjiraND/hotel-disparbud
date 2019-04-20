# from django.contrib.auth.models import User
from django.contrib.auth import get_user_model

from rest_framework import serializers

from app.api.models import Hotel

User = get_user_model()

def field_length(fieldname):
    field = next(field for field in User._meta.fields if field.name == fieldname)
    return field.max_length

class UserSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = User
        fields = ('url', 'username', 'password', 'email', 'gender', 'name', 'is_lsu')

class HotelSerializer(serializers.HyperlinkedModelSerializer):
    class Meta:
        model = Hotel
        fields = ('name', 'district', 'address', 'star', 'owner', 'cert_start', 'cert_end')

def create_and_save_user(validated_data):
    name = validated_data['name']
    email = validated_data['email']
    username = email
    password = validated_data['password']
    is_lsu = validated_data['is_lsu']

    user = User.objects.create_user(username=username,
                                    name=name,
                                    email=email,
                                    password=password,
                                    is_lsu=is_lsu)

    user.save()

    return user

class RegisterSerializer(serializers.Serializer):
    name = serializers.CharField(max_length=field_length('name'), required=True)
    password = serializers.CharField(max_length=field_length('password'), required=True)
    email = serializers.EmailField(max_length=field_length('email'), required=True)
    is_lsu = serializers.BooleanField()

    def validate(self, attrs):
        name = attrs['name']
        password = attrs['password']
        email = attrs['email']
        is_lsu = attrs['is_lsu']


        if not email:
            raise serializers.ValidationError('Invalid email provided')

        if User.objects.filter(username=email).exists():
            raise serializers.ValidationError('A user with that username already exists')

        if not password:
            raise serializers.ValidationError('Invalid password provided')

        if not name:
            raise serializers.ValidationError('Invalid name provided')

        if is_lsu is None or is_lsu not in [0, 1]:
            raise serializers.ValidationError('Invalid is_lsu provided')

        return attrs

    def create(self, validated_data):
        return create_and_save_user(validated_data)

