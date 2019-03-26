from flask_login import UserMixin
from controller.database import BaseModel
from peewee import TextField, BooleanField
    
class User(UserMixin, BaseModel):
    class Meta:
        db_table = "users"
    email = TextField(primary_key=True)
    password = TextField()
    mode = BooleanField()