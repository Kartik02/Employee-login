"""
Import Libraries
"""
from flask import Flask, jsonify, request, session, redirect, url_for
from flask_cors import CORS
from flask_mail import Mail, Message
from flask_admin import Admin
from flask_admin.contrib.pymongo import ModelView
from datetime import datetime
import ssl
import base64
from pymongo import MongoClient
from bson.objectid import ObjectId
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, FileField, DecimalField, SelectField, DateField, TimeField, EmailField, \
    DateTimeField, BooleanField
from wtforms.validators import DataRequired
from flask_admin.form import rules
from bson import ObjectId
import random
from flask_pymongo import PyMongo
from flask_wtf import FlaskForm

"""
Database Setup
"""
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
db = client['employeee']

# Update this with your MongoDB URI
# client = MongoClient('mongodb+srv://admin:priya@cluster0.l6dotpe.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0')
# db = client['employeee']
#client = MongoClient('mongodb://risabh:risabh@localhost:27017/')
#db = client['ems']

# Mail configuration
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USE_SSL'] = False
app.config['MAIL_USERNAME'] = 'rushideshmukh824@gmail.com'
app.config['MAIL_PASSWORD'] = 'zdjwtxgxrwtgtnhm'
mail = Mail(app)

class AdminDataForm(FlaskForm):
    email = EmailField('Email', validators=[DataRequired()])
    password = PasswordField('Password', validators=[DataRequired()])

class EmployeeDataForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])
    email = EmailField('Email', validators=[DataRequired()])
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
    fromDate = DateField('From Date', validators=[DataRequired()], format='%Y-%m-%d')
    toDate = DateField('To Date', validators=[DataRequired()], format='%Y-%m-%d')

class ProjectListForm(FlaskForm):
    name = StringField('Name', validators=[DataRequired()])

class EventForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    start = DateTimeField('Start', validators=[DataRequired()], format='%Y-%m-%d %H:%M:%S')
    end = DateTimeField('End', validators=[DataRequired()], format='%Y-%m-%d %H:%M:%S')
    allDay = BooleanField('All Day')

class TagListForm(FlaskForm):
    tag = StringField('Tag', validators=[DataRequired()])

class ProjectForm(FlaskForm):
    projectid = StringField('Project ID', validators=[DataRequired()])
    projectName = StringField('Project Name', validators=[DataRequired()])
    task = StringField('Task', validators=[DataRequired()])
    tags = StringField('Tags', validators=[DataRequired()])
    timeElapsed = DecimalField('Time Elapsed', validators=[DataRequired()])
    date = DateField('Date', format='%Y-%m-%d', validators=[DataRequired()])
    empid = StringField('Employee ID', validators=[DataRequired()])

class MeetingForm(FlaskForm):
    title = StringField('Title', validators=[DataRequired()])
    meeting_code = StringField('Meeting Code', validators=[DataRequired()])
    date = DateField('Date', format='%Y-%m-%d', validators=[DataRequired()])
    time = TimeField('Time', format='%H:%M:%S', validators=[DataRequired()])
    attendees = StringField('Attendees', validators=[DataRequired()])
    description = StringField('Description', validators=[DataRequired()])

class MeetingView(ModelView):
    column_list = ('title', 'meeting_code', 'date', 'time', 'attendees', 'description')

    def scaffold_form(self):
        return MeetingForm

    def on_model_change(self, form, model, is_created):
        model['date'] = form.date.data.strftime('%Y-%m-%d')
        model['time'] = form.time.data.strftime('%H:%M:%S')

    def on_form_prefill(self, form, id):
        meeting = self.get_meeting_data(id)
        if meeting:
            form.date.data = datetime.strptime(meeting['date'], '%Y-%m-%d').date()
            form.time.data = datetime.strptime(meeting['time'], '%H:%M:%S').time()

class AdminDataView(ModelView):
    column_list = ('email', 'password')
    form = AdminDataForm

class EmployeeDataView(ModelView):
    column_list = ('name', 'email', 'empid', 'password', 'salary', 'category', 'profile')
    form = EmployeeDataForm

class LeavesView(ModelView):
    column_list = ('name', 'employeeId', 'reason', 'numberOfDays', 'fromDate', 'toDate')
    form = LeavesForm

class ProjectListView(ModelView):
    column_list = ('name',)
    form = ProjectListForm

class TagListView(ModelView):
    column_list = ('tag',)
    form = TagListForm

class ProjectView(ModelView):
    column_list = ('projectName', 'task', 'tags', 'timeElapsed', 'date', 'empid')
    form = ProjectForm

class EventView(ModelView):
    column_list = ('title', 'start', 'end', 'allDay')
    form = EventForm

admin = Admin(app, name='Admin Panel', template_mode='bootstrap3')
admin.add_view(AdminDataView(db.admin_data, 'Admin Data'))
admin.add_view(EmployeeDataView(db.emp_data, 'Employee Data'))
admin.add_view(LeavesView(db.leaves, 'Leaves'))
admin.add_view(ProjectListView(db.project_list, 'Project List'))
admin.add_view(TagListView(db.tag_list, 'Tag List'))
admin.add_view(ProjectView(db.projects, 'Projects Details'))
admin.add_view(EventView(db.events, 'Events'))
admin.add_view(MeetingView(db.meeting, 'Meetings'))

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
    if 'tag_list' not in collections:
        db.create_collection('tag_list')
    if 'projects' not in collections:
        db.create_collection('projects')
    if 'events' not in collections:
        db.create_collection('events')
    if 'meeting' not in collections:
        db.create_collection('meeting')

    # Create indexes
    db.admin_data.create_index('email', unique=True)
    db.emp_data.create_index('email', unique=True)
    db.emp_data.create_index('empid', unique=True)
    db.leaves.create_index('employeeId', unique=True)
    db.project_list.create_index('name', unique=True)
    db.events.create_index('title', unique=True)

initialize_db()

"""
Start
"""
@app.route('/')
def home():
    return redirect(url_for('admin.index'))

"""
Admin Login and Operations
"""

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


@app.route('/auth/category', methods=['GET'])
def get_categories():
    categories = [
        {'id': '1', 'name': 'HR'},
        {'id': '2', 'name': 'Tech'}
    ]
    return jsonify({'Status': True, 'Result': categories}), 200


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


@app.route('/auth/add_tag', methods=['POST'])
def add_tag():
    data = request.json
    tag_name = data.get('tag')

    existing_tag = db.tag_list.find_one({'tag': tag_name})
    if existing_tag:
        return jsonify({'error': 'Tag already exists'}), 400

    new_tag = {'tag': tag_name}
    db.tag_list.insert_one(new_tag)
    return jsonify({'message': 'Tag added successfully'}), 201


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


@app.route('/auth/add_meeting', methods=['POST'])
def add_meeting():
    data = request.json
    title = data.get('title')
    meeting_code = data.get('meeting_code')
    date = data.get('date')
    time = data.get('time')
    attendees = data.get('attendees')
    description = data.get('description')

    new_meeting = {
        'title': title,
        'meeting_code': meeting_code,
        'date': date,
        'time': time,
        'attendees': attendees,
        'description': description
    }

    db.meeting.insert_one(new_meeting)
    return jsonify({'message': 'Meeting added successfully!'}), 201


"""
Employee Login and operations
"""

@app.route('/auth/login', methods=['POST'])
def login():
    data = request.json
    print('Data Reveived: ', data)
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

"""
Dashboard Page - Meeting Details
"""
@app.route('/auth/meetings', methods=['GET'])
def get_meetings():
    # Query the MongoDB collection to fetch all meetings
    meetings_cursor = db.meeting.find()

    # Initialize list to store serialized meeting data
    meetings_data = []

    # Iterate over the cursor and serialize meeting data
    for meeting in meetings_cursor:
        meeting_data = {
            'title': meeting['title'],
            'meeting_code': meeting['meeting_code'],
            'date': meeting['date'],
            'time': meeting['time'],
            'attendees': meeting['attendees']
        }
        meetings_data.append(meeting_data)

    # Return the serialized meeting data as JSON response
    return jsonify(meetings_data), 200

"""
Dashboard Page - Admin and Employee Count
"""
# Select the database and collections
# db = client['employeee']
# admins_collection = db['admin_data']
# employees_collection = db['emp_data']
@app.route('/auth/admin_count', methods=['GET'])
def admin_count():
    admin_count = db.admin_data.count_documents({})
    return jsonify({"admin_count": admin_count})

@app.route('/auth/employee_count', methods=['GET'])
def employee_count():
    employee_count = db.emp_data.count_documents({})
    return jsonify({"employee_count": employee_count})

"""
Dashboard Page - Wavelength Graph
"""
@app.route('/auth/wavelength_graph', methods=['GET'])
def wavelength_graph():
    # Get the aggregation level from query parameters
    level = request.args.get('level', 'month')  # Default to 'month' if not provided

    if level == 'day':
        pipeline = [
            {
                "$group": {
                    "_id": {
                        "year": {"$year": "$date"},
                        "month": {"$month": "$date"},
                        "day": {"$dayOfMonth": "$date"}
                    },
                    "total_work_done": {"$sum": "$timeElapsed"}
                }
            },
            {
                "$sort": {
                    "_id.year": 1,
                    "_id.month": 1,
                    "_id.day": 1
                }
            }
        ]
    elif level == 'year':
        pipeline = [
            {
                "$group": {
                    "_id": {
                        "year": {"$year": "$date"}
                    },
                    "total_work_done": {"$sum": "$timeElapsed"}
                }
            },
            {
                "$sort": {
                    "_id.year": 1
                }
            }
        ]
    else:  # Default to 'month' aggregation
        pipeline = [
            {
                "$group": {
                    "_id": {
                        "year": {"$year": "$date"},
                        "month": {"$month": "$date"}
                    },
                    "total_work_done": {"$sum": "$timeElapsed"}
                }
            },
            {
                "$sort": {
                    "_id.year": 1,
                    "_id.month": 1
                }
            }
        ]

    work_done_data = list(db.projects.aggregate(pipeline))

    result = []
    for data in work_done_data:
        entry = {
            "year": data['_id']['year'],
            "total_work_done": data['total_work_done']
        }
        if 'month' in data['_id']:
            entry["month"] = data['_id']['month']
        if 'day' in data['_id']:
            entry["day"] = data['_id']['day']

        result.append(entry)

    return jsonify(result), 200


"""
Profile Page - Show Employee Details
"""
@app.route('/auth/get_employee_data', methods=['GET'])
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
        'profileImage': base64.b64encode(user['profile_image']).decode('utf-8') if user.get('profile_image') else None
    }), 200

"""
 Profile Page - Update Employee Details
"""
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

"""
Leave Page
"""
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
        'employeeId': empid,
        'reason': reason,
        'numberOfDays': numberOfDays,
        'fromDate': fromDate,
        'toDate': toDate
    }
    db.leaves.insert_one(new_leave)
    return jsonify({'message': 'Leave added successfully'}), 200

"""
Calendar Page - Events
"""
@app.route('/auth/get_events', methods=['GET'])
def get_events():
    try:
        events = db.events.find()
        event_list = [{'id': str(event['_id']), 'title': event['title'], 'start': event['start'], 'end': event['end'], 'allDay': event['all_day']} for event in events]
        return jsonify(event_list), 200
    except Exception as e:
        print(f"Error fetching events: {e}")
        return jsonify({'error': 'Internal Server Error'}), 500

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

@app.route('/auth/update_event/<id>', methods=['POST'])
def update_event(id):
    data = request.json
    new_title = data.get('title')

    if not new_title:
        return jsonify({"error": "New title is required"}), 400

    try:
        result = db.events.update_one({'_id': ObjectId(id)}, {'$set': {'title': new_title}})
        if result.modified_count == 1:
            return jsonify({"message": "Event title updated successfully"}), 200
        else:
            return jsonify({"error": "Event not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/auth/delete_event', methods=['POST'])
def delete_event():
    data = request.json
    event_id = data.get('id')

    if not event_id:
        return jsonify({"error": "Event ID is required"}), 400

    try:
        result = db.events.delete_one({'_id': ObjectId(event_id)})
        if result.deleted_count == 1:
            return jsonify({"message": "Event deleted successfully"}), 200
        else:
            return jsonify({"error": "Event not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

"""
TimeTracker - To show available projects list in dropdown 
"""
@app.route('/auth/project_list', methods=['GET'])
def get_project_list():
    projects = db.project_list.find({}, {'_id': 0, 'name': 1})
    project_names = [project['name'] for project in projects]
    return jsonify(project_names)

@app.route('/auth/tag_list', methods=['GET'])
def get_tag_list():
    tags = db.tag_list.find({}, {'_id': 0, 'tag': 1})
    tags_list = [{'tag': tag['tag']} for tag in tags]
    return jsonify({'tags': tags_list})

@app.route('/auth/get_projects', methods=['GET'])
def get_projects():
    try:
        projects = db.project_list.find()
        project_list = [{'id': str(project['_id']), 'name': project['name']} for project in projects]
        return jsonify(project_list), 200
    except Exception as e:
        print(f"Error fetching projects: {e}")
        return jsonify({'error': 'Internal Server Error'}), 500

"""
TimeTracker - Add Project To Databaase
"""
@app.route('/auth/add_project_data', methods=['POST'])
def add_project_data():
    data = request.json
    task = data.get('task')
    projectName = data.get('projectName')
    tags = data.get('tags')
    timeElapsed = data.get('timeElapsed')
    # empid = data.get('empid')
    current_date = datetime.now().strftime('%Y-%m-%d')

    # To fetch empid of logged in employee
    if 'logged_in' not in session or not session['logged_in']:
        return jsonify({'error': 'Not logged in'}), 401
    empid = session['empid']
    user = db.emp_data.find_one({'empid': empid})
    if not user:
        return jsonify({'error': 'Employee not found'}), 404

    if not all([task, projectName, tags, timeElapsed, empid]):
        return jsonify({'error': 'Missing something...'}), 400

    project_data = {
        'task': task,
        'projectName': projectName,
        'tags': tags,
        'timeElapsed': timeElapsed,
        'date': current_date,
        'empid': empid
    }

    db.projects.insert_one(project_data)
    return jsonify({'message': 'Project data added successfully!'}), 201

"""
TimeTracker - Display worked project details
"""
@app.route('/auth/get_employee_projects', methods=['GET'])
def get_employee_projects():
    projects = db.projects.find()
    project_list = [{'projectid': project['projectid'], 'projectName': project['projectName'], 'task': project['task'],
                     'tags': project['tags'], 'timeElapsed': project['timeElapsed']} for project in projects]

    return jsonify({'projects': project_list}), 200

"""
TimeTracker Page - To Update Project - Start / Resume and update in database 
"""
@app.route('/auth/update_project_data/<index>', methods=['POST'])
def update_project_data(index):
    data = request.json
    projectid = data.get('projectid')
    task = data.get('task')
    projectName = data.get('projectName')
    tags = data.get('tags')
    timeElapsed = data.get('timeElapsed')

    result = db.projects.update_one(
        {'projectid': index},
        {'$set': {'projectid': projectid, 'task': task, 'projectName': projectName, 'tags': tags, 'timeElapsed': timeElapsed}}
    )

    if result.modified_count > 0:
        return jsonify({'message': 'Project data updated successfully!'}), 200
    else:
        return jsonify({'error': 'Failed to update project data.'}), 500

"""
Report Page - Pie Chart and Bar Graph
"""
@app.route('/auth/project_time', methods=['GET'])
def get_project_time():
    try:
        projects = db.projects.aggregate([
            {
                "$group": {
                    "_id": "$projectName",
                    "totalTime": {"$sum": "$timeElapsed"}
                }
            }
        ])
        project_list = [{"projectName": project["_id"], "totalTime": project["totalTime"]} for project in projects]
        return jsonify(project_list), 200
    except Exception as e:
        print(f"Error fetching project times: {e}")
        return jsonify({'error': 'Internal Server Error'}), 500

@app.route('/auth/tag_count', methods=['GET'])
def get_tag_count():
    try:
        tags = db.projects.aggregate([
            {"$unwind": "$tags"},
            {
                "$group": {
                    "_id": "$tags",
                    "count": {"$sum": 1}
                }
            }
        ])
        tag_list = [{"tag": tag["_id"], "count": tag["count"]} for tag in tags]
        return jsonify(tag_list), 200
    except Exception as e:
        print(f"Error fetching tag counts: {e}")
        return jsonify({'error': 'Internal Server Error'}), 500

"""
Forget and Reset Password
"""
import string

# Route for sending OTP
@app.route('/auth/forgot_password', methods=['POST'])
def forgot_password():
    data = request.json
    email = data.get('email')
    print(email)
    user = db.emp_data.find_one({'email': email})
    if not user:
        return jsonify({'error': 'Employee not found'}), 404

    otp = ''.join(random.choices(string.digits, k=6))
    db.emp_data.update_one({'email': email}, {'$set': {'otp': otp}})

    msg = Message('OTP for Password Reset', sender='rushideshmukh824@gmail.com', recipients=[email])
    msg.body = f'Your OTP for password reset is: {otp}'
    mail.send(msg)

    return jsonify({'message': 'OTP sent successfully'}), 200

# Route for resetting password
@app.route('/auth/reset_password', methods=['POST'])
def reset_password():
    data = request.json
    email = data.get('email')
    otp = data.get('otp')
    new_password = data.get('password')

    user = db.emp_data.find_one({'email': email, 'otp': otp})
    if not user:
        return jsonify({'error': 'Invalid OTP'}), 400

    db.emp_data.update_one({'email': email}, {'$set': {'password': new_password}})

    return jsonify({'message': 'Password reset successfully'}), 200

# @app.route('/auth/forgot_password', methods=['POST'])
# def forgot_password():
#     data = request.json
#     email = data.get('email')
#
#     user = db.emp_data.find_one({'email': email})
#     if not user:
#         return jsonify({'error': 'Employee not found'}), 404
#
#     new_password = ''.join(random.choices('abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789', k=8))
#     db.emp_data.update_one({'email': email}, {'$set': {'password': new_password}})
#
#     msg = Message('Password Reset', sender='rushideshmukh824@gmail.com', recipients=[email])
#     msg.body = f'Your new password is: {new_password}'
#     mail.send(msg)
#
#     return jsonify({'message': 'Password reset email sent successfully'}), 200

if __name__ == '__main__':
    app.run(debug=True, host='localhost', port=5000)
