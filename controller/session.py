from flask import redirect
from flask_login import LoginManager
from model.user import User

session_manager = LoginManager()

@session_manager.user_loader
def user_loader(email):
    try:
        user = User.get(User.email == email)
    except:
        return
    user.id = email # for flask-login
    return user

@session_manager.unauthorized_handler
def unauthorized_handler():
    return redirect('/login')

