from flask import redirect
from flask_login import LoginManager
from model.user import User
from model.users import users

def Session(app):
    session_manager = LoginManager()
    session_manager.init_app(app)

    @session_manager.user_loader
    def user_loader(email):
        if email not in users:
            return

        user = User()
        user.id = email
        return user


    @session_manager.request_loader
    def request_loader(request):
        email = request.form.get('email')
        if email not in users:
            return

        user = User()
        user.id = email

        # DO NOT ever store passwords in plaintext and always compare password
        # hashes using constant-time comparison!
        user.is_authenticated = request.form['password'] == users[email]['password']

        return user

    @session_manager.unauthorized_handler
    def unauthorized_handler():
        return redirect('/login')

    return session_manager



    
