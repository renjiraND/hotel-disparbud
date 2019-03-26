from flask import Flask, request, redirect, render_template
from flask_login import login_user, logout_user, current_user, login_required
from controller.session import session_manager
from model.user import User

app = Flask(__name__)
app.secret_key = 'yeeeeeet' # necessary for session handling?
session_manager.init_app(app)

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'GET':
        return render_template('login.html')
    email = request.form['email']
    try:
        user = User.get(User.email == email)
    except:
        return redirect('/login')
    if user.password != request.form['password']: 
        return redirect('/login')
    user.id = email
    login_user(user)
    return redirect('/')

@app.route('/logout')
def logout():
    logout_user()
    return redirect('/login')

@app.route("/")
@login_required # Use this keyword to enforce authentication
def hello():
    return render_template('index.html', var=current_user.id)

app.run()