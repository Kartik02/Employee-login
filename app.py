from flask import Flask, request, render_template, redirect, session, send_file
from flask_sqlalchemy import SQLAlchemy
import bcrypt
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///databse.db'
db = SQLAlchemy(app)
app.secret_key = 'secrete_key'

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    empid = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100))
    def __init__(self, name, empid, password):
        self.name = name
        self.empid = empid
        self.password = password#pt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')
    # def check_password(self, password):
    #     return bcrypt.checkpw(password.encode('utf-8'), self.password.encode('utf-8'))

with app.app_context():
    db.create_all()

admin = Admin(app, name='Admin Panel', template_mode='bootstrap3')
admin.add_view(ModelView(User, db.session))

@app.route('/')
def index():
    return render_template('login.html')

@app.route('/login', methods=['GET', 'POST'])
def login():
    if request.method == 'POST':
        empid = request.form['empid']
        password = request.form['password']
        userid = User.query.filter_by(empid=empid).first()
        pwd = User.query.filter_by(password=password).first()
        if userid and pwd:
            session['empid'] = userid.empid
            return redirect('/dashboard')
        else:
            return render_template('login.html', error = 'Invalid User')
    return render_template('login.html')

@app.route('/dashboard', methods=['GET', 'POST'])
def dashboard():
    if session['empid']:
        user = User.query.filter_by(empid=session['empid']).first()
        return render_template('a.html', user=user)
    return redirect('/login')

@app.route('/logout')
def logout():
    session.pop('username', None)
    return redirect('/login')

if __name__ == '__main__':
    app.run(debug=True)