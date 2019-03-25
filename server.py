from flask import Flask, request, redirect, render_template
from flask_login import login_user, logout_user, current_user, login_required
from controller.session import Session
from model.user import User
from model.users import users # mock database

app = Flask(__name__)
app.secret_key = 'yeeeeeet' # necessary for session handling?
session_manager = Session(app) # prevent the session manager from being garbage collected

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        return render_template('login.html')
    elif request.method == 'POST':
        email = request.form['email']
        if email in users and request.form['password'] == users[email]['password']:
            user = User()
            user.id = email
            login_user(user)
            return redirect('/')
    return 'Bad login'

@app.route('/logout')
def logout():
    logout_user()
    return 'Logged out'

@app.route("/")
@login_required # Use this keyword to enforce authentication
def hello():
    return render_template('index.html', var=current_user.id)

app.run()