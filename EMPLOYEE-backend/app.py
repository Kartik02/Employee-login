from flask import Flask, jsonify, request, session
from flask_cors import CORS
from werkzeug.security import check_password_hash
from flask_sqlalchemy import SQLAlchemy
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from datetime import datetime

app = Flask(__name__)
app.secret_key = 'your_secret_key'
CORS(app, resources={
    r"/auth/*": {"origins": "http://localhost:5173"},
    r"/leave/add": {"origins": "http://localhost:5173"}
}, supports_credentials=True)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///databse.db'
db = SQLAlchemy(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    empid = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100))

    def __init__(self, name, empid, password):
        self.name = name
        self.empid = empid
        self.password = password

class Leave(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    empid = db.Column(db.String(100), nullable=False)
    reason = db.Column(db.String(100), nullable=False)
    numberOfDays = db.Column(db.Integer, nullable=False)
    fromDate = db.Column(db.DateTime, nullable=False)
    toDate = db.Column(db.DateTime, nullable=False)
    def __init__(self, name, empid, reason, numberOfDays, fromDate, toDate):
        self.name = name
        self.empid = empid
        self.reason = reason
        self.numberOfDays = numberOfDays
        self.fromDate = fromDate
        self.toDate = toDate

with app.app_context():
    db.create_all()

admin = Admin(app, name='Admin Panel', template_mode='bootstrap3')
admin.add_view(ModelView(User, db.session))
admin.add_view(ModelView(Leave, db.session))

@app.route('/auth/login', methods=['GET', 'POST'])
def login():
    data = request.json
    empid = data.get('empid')
    password = data.get('password')
    user = User.query.filter_by(empid=empid).first()
    if  user and user.password == password:
        print('Login successful')
        session['logged_in'] = True
        return jsonify({'loginStatus': True}), 200
    else:
        return jsonify({'loginStatus': False, 'Error': 'Invalid credentials'}), 401

@app.route('/leave/add', methods=['GET', 'POST'])
def add_leave():
    data = request.json
    name = data.get('name')
    empid = data.get('employeeId')
    reason = data.get('reason')
    numberOfDays = data.get('numberOfDays')

    fromDate = datetime.strptime(data.get('fromDate'), '%Y-%m-%d')
    toDate = datetime.strptime(data.get('toDate'), '%Y-%m-%d')

    # Create a new Leave instance and add it to the database
    new_leave = Leave(name=name, empid=empid, reason=reason, numberOfDays=numberOfDays, fromDate=fromDate, toDate=toDate)
    db.session.add(new_leave)
    db.session.commit()

    return jsonify({'message': 'Leave added successfully'}), 200


if __name__ == '__main__':
    app.run(debug=True, host='localhost', port=5000)
