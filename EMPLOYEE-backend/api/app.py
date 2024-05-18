from flask import Flask, jsonify, request, session, redirect, url_for
from flask_cors import CORS
from flask_mail import Mail,Message
from flask_admin import Admin
from flask_admin.contrib.pymongo import ModelView
from datetime import datetime
import ssl
import random
import base64
from pymongo import MongoClient
from bson.objectid import ObjectId
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, FileField, DecimalField, SelectField
from wtforms.validators import DataRequired

app = Flask(__name__)
app.secret_key = 'your_secret_key'

CORS(app, resources={r"/auth/*": {
    "origins": ["http://localhost:5173", "https://employeelogin.vercel.app"],
    "methods": ["POST", "OPTIONS", "GET"],
    "allow_headers": ["Content-Type", "Authorization"],
    "supports_credentials": True
}})

# MongoDB configuration
client = MongoClient(
    'mongodb+srv://admin:priya@cluster0.l6dotpe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0',
    tls=True,
    tlsCAFile='certs/ca-certificates.crt',
    socketTimeoutMS=30000,
    connectTimeoutMS=30000
)

# Update this with your MongoDB URI
db = client['employeee']

# Mail configuration
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
app.config['MAIL_USERNAME'] = 'rushideshmukh824@gmail.com'
app.config['MAIL_PASSWORD'] = 'app_password'
mail = Mail(app)

#models
class AdminDataForm(FlaskForm):
    email = StringField('Email', validators=[DataRequired()])
    password = PasswordField('Password', validators=[DataRequired()])

class EmployeeDataForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    email = StringField('Email', validators=[DataRequired()])
    empid = StringField('Employee ID', validators=[DataRequired()])
    password = PasswordField('Password', validators=[DataRequired()])
    salary = DecimalField('Salary', validators=[DataRequired()])
    category = SelectField('Category', choices=[('1', 'HR'), ('2', 'TECH')], validators=[DataRequired()])
    profile = FileField('Profile Image')

class LeavesForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    employeeId = StringField('Employee ID', validators=[DataRequired()])
    reason = StringField('Reason', validators=[DataRequired()])
    numberOfDays = DecimalField('Number of Days', validators=[DataRequired()])
    fromDate = StringField('From Date', validators=[DataRequired()])
    toDate = StringField('To Date', validators=[DataRequired()])
    
class ProjectForm(FlaskForm):
    projectName = StringField('Project Name', validators=[DataRequired()])
    description = StringField('Description', validators=[DataRequired()])
    tags = StringField('Tags', validators=[DataRequired()])
    timeElapsed = DecimalField('Time Elapsed', validators=[DataRequired()])


class ProjectForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])

class EventForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    start = StringField('Start', validators=[DataRequired()])
    end = StringField('End', validators=[DataRequired()])
    allDay = StringField('All Day')



# views
class AdminDataView(ModelView):
    column_list = ('email', 'password')
    form = AdminDataForm

class EmployeeDataView(ModelView):
    column_list = ('name', 'email', 'empid', 'salary', 'category', 'profile') 
    form = EmployeeDataForm

class LeavesView(ModelView):
    column_list = ('name', 'employeeId', 'reason', 'numberOfDays', 'fromDate', 'toDate')
    form = LeavesForm

class ProjectView(ModelView):
    column_list = ('name',)
    form = ProjectForm

class EventView(ModelView):
    column_list = ('title', 'start', 'end', 'allDay')
    form = EventForm
    
 


admin = Admin(app, name='Admin Panel', template_mode='bootstrap3')
admin.add_view(AdminDataView(db.admin_data, 'Admin Data'))
admin.add_view(EmployeeDataView(db.emp_data, 'Employee Data'))
admin.add_view(LeavesView(db.leaves, 'Leaves'))
admin.add_view(ProjectView(db.project_list, 'Projects'))
admin.add_view(EventView(db.events, 'Events'))


def initialize_db():
    # Check if collections already exist
    collections = db.list_collection_names()

    # If collections don't exist, create them
    if 'admin_data' not in collections:
        db.create_collection('admin_data')
    if 'emp_data' not in collections:
        db.create_collection('emp_data')
    if 'leaves' not in collections:
        db.create_collection('leaves')
    if 'project_list' not in collections:
        db.create_collection('project_list')
    if 'events' not in collections:
        db.create_collection('events')

        
    # Create indexes
    db.admin_data.create_index('email', unique=True)
    db.emp_data.create_index('email', unique=True)
    db.emp_data.create_index('empid', unique=True)
    db.leaves.create_index('employeeId', unique=True)
    db.project_list.create_index('name', unique=True)
    db.events.create_index('title', unique=True)
    


initialize_db()

@app.route('/')
def home():
    return redirect(url_for('admin.index'))

@app.route('/auth/adminlogin', methods=['POST'])
def adminlogin():
    data = request.json
    email = data.get('email')
    password = data.get('password')
    adminData = db.admin_data.find_one({'email': email})
    if adminData and adminData['password'] == password:
        print('Login successful')
        session['logged_in'] = True
        return jsonify({'loginStatus': True}), 200
    else:
        return jsonify({'loginStatus': False, 'Error': 'Invalid credentials'}), 401

@app.route('/auth/add_employee', methods=['POST'])
def addEmp():
    data = request.form
    name = data.get('name')
    email = data.get('email')
    empid = data.get('employee_id')
    password = data.get('password')
    salary = data.get('salary')
    category = data.get('category_id')
    profile_image = request.files['image'].read()

    new_emp = {
        'name': name,
        'email': email,
        'empid': empid,
        'password': password,
        'salary': salary,
        'category': category,
        'profile_image': profile_image
    }
    db.emp_data.insert_one(new_emp)
    return jsonify({'message': 'Employee added successfully'}), 200

@app.route('/auth/login', methods=['POST'])
def login():
    data = request.json
    empid = data.get('empid')
    password = data.get('password')
    user = db.emp_data.find_one({'empid': empid})
    if user and user['password'] == password:
        print('Login successful')
        session['logged_in'] = True
        session['empid'] = empid
        return jsonify({'loginStatus': True}), 200
    else:
        return jsonify({'loginStatus': False, 'Error': 'Invalid credentials'}), 401

@app.route('/auth/employee', methods=['GET'])
def get_employee_data():
    if 'logged_in' not in session or not session['logged_in']:
        return jsonify({'error': 'Not logged in'}), 401

    empid = session['empid']
    user = db.emp_data.find_one({'empid': empid})
    if not user:
        return jsonify({'error': 'Employee not found'}), 404

    return jsonify({
        'name': user['name'],
        'email': user['email'],
        'password': user['password'],
        'profileImage': base64.b64encode(user['profile_image']).decode('utf-8') if user['profile_image'] else None
    }), 200

@app.route('/auth/employees', methods=['GET'])
def get_employees():
    employees = db.emp_data.find()
    employee_list = []
    for employee in employees:
        employee_dict = {
            'name': employee['name'],
            'email': employee['email'],
            'employee_id': employee['empid'],
            'salary': employee['salary'],
            'category': employee['category']
        }
        employee_list.append(employee_dict)
    return jsonify({'Status': True, 'Result': employee_list}), 200

@app.route('/auth/update_employee', methods=['POST'])
def update_employee():
    data = request.json
    empid = session.get('empid')
    if not empid:
        return jsonify({'error': 'Employee not logged in'}), 401

    user = db.emp_data.find_one({'empid': empid})
    if not user:
        return jsonify({'error': 'Employee not found'}), 404

    new_email = data.get('email')
    if new_email:
        user['email'] = new_email
        print('Email Updated Successfully')

    new_password = data.get('password')
    if new_password:
        user['password'] = new_password
        print('Password Updated Successfully')

    db.emp_data.update_one({'empid': empid}, {'$set': user})
    return jsonify({'message': 'Employee updated successfully'}), 200

UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route('/auth/upload_profile', methods=['POST'])
def upload_profile_image():
    if 'file' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No selected file'}), 400

    if file and allowed_file(file.filename):
        file_data = file.read()
        user = db.emp_data.find_one({'empid': session['empid']})
        user['profile_image'] = file_data
        db.emp_data.update_one({'empid': session['empid']}, {'$set': user})
        return jsonify({'message': 'Profile image uploaded successfully'}), 200

    return jsonify({'error': 'File format not allowed'}), 400

@app.route('/auth/leave', methods=['POST'])
def add_leave():
    data = request.json
    name = data.get('name')
    empid = data.get('employeeId')
    reason = data.get('reason')
    numberOfDays = data.get('numberOfDays')
    fromDate = datetime.strptime(data.get('fromDate'), '%Y-%m-%d')
    toDate = datetime.strptime(data.get('toDate'), '%Y-%m-%d')

    new_leave = {
        'name': name,
        'empid': empid,
        'reason': reason,
        'numberOfDays': numberOfDays,
        'fromDate': fromDate,
        'toDate': toDate
    }
    db.leaves.insert_one(new_leave)
    return jsonify({'message': 'Leave added successfully'}), 200

@app.route('/auth/add_projects', methods=['POST'])
def add_project():
    data = request.json
    project_name = data.get('name')

    existing_project = db.project_list.find_one({'name': project_name})
    if existing_project:
        return jsonify({'error': 'Project already exists'}), 400

    new_project = {'name': project_name}
    db.project_list.insert_one(new_project)
    return jsonify({'message': 'Project added successfully'}), 201

@app.route('/auth/project_data', methods=['GET'])
def get_project_data():
    projects = db.project_list.find()
    project_list = []
    for project in projects:
        project_dict = {'name': project['name']}
        project_list.append(project_dict)
    return jsonify({'Status': True, 'Result': project_list}), 200

@app.route('/auth/add_event', methods=['POST'])
def add_event():
    data = request.json
    title = data.get('title')
    start = data.get('start')
    end = data.get('end')
    allDay = data.get('allDay')

    new_event = {'title': title, 'start': start, 'end': end, 'all_day': allDay}
    db.events.insert_one(new_event)
    return jsonify({'message': 'Event added successfully'}), 201

@app.route('/auth/update_event/<event_id>', methods=['PUT'])
def update_event(event_id):
    data = request.json
    title = data.get('title')
    start = data.get('start')
    end = data.get('end')

    event = db.events.find_one({'_id': ObjectId(event_id)})
    if not event:
        return jsonify({'error': 'Event not found'}), 404

    event['title'] = title
    event['start'] = start
    event['end'] = end

    db.events.update_one({'_id': ObjectId(event_id)}, {'$set': event})
    return jsonify({'message': 'Event updated successfully'}), 200

@app.route('/auth/delete_event/<event_id>', methods=['DELETE'])
def delete_event(event_id):
    result = db.events.delete_one({'_id': ObjectId(event_id)})
    if result.deleted_count == 0:
        return jsonify({'error': 'Event not found'}), 404

    return jsonify({'message': 'Event deleted successfully'}), 200

@app.route('/auth/get_events', methods=['GET'])
def get_events():
    try:
        events = db.events.find()
        event_list = [{'id': str(event['_id']), 'title': event['title'], 'start': event['start'], 'end': event['end'], 'allDay': event['all_day']} for event in events]
        return jsonify(event_list), 200
    except Exception as e:
        print(f"Error fetching events: {e}")
        return jsonify({'error': 'Internal Server Error'}), 500

@app.route('/auth/get_projects', methods=['GET'])
def get_projects():
    try:
        projects = db.project_list.find()
        project_list = [{'id': str(project['_id']), 'name': project['name']} for project in projects]
        return jsonify(project_list), 200
    except Exception as e:
        print(f"Error fetching projects: {e}")
        return jsonify({'error': 'Internal Server Error'}), 500

@app.route('/auth/forgot_password', methods=['POST'])
def forgot_password():
    data = request.json
    email = data.get('email')

    user = db.emp_data.find_one({'email': email})
    if not user:
        return jsonify({'error': 'Employee not found'}), 404

    new_password = ''.join(random.choices('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', k=8))
    db.emp_data.update_one({'email': email}, {'$set': {'password': new_password}})

    msg = Message('Password Reset', sender='rushideshmukh824@gmail.com', recipients=[email])
    msg.body = f'Your new password is: {new_password}'
    mail.send(msg)

    return jsonify({'message': 'Password reset email sent successfully'}), 200

if __name__ == '__main__':
    app.run(debug=True, host='localhost', port=5000)
