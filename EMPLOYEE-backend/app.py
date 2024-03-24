from flask import Flask, jsonify, request, session
from flask_cors import CORS
from werkzeug.security import check_password_hash
from flask_sqlalchemy import SQLAlchemy
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView

app = Flask(__name__)
app.secret_key = 'your_secret_key'
CORS(app)  # Enable CORS for all routes
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


with app.app_context():
    db.create_all()

admin = Admin(app, name='Admin Panel', template_mode='bootstrap3')
admin.add_view(ModelView(User, db.session))


@app.route('/auth/login', methods=['GET', 'POST'])
def admin_login():
    data = request.json
    empid = data.get('empid')
    password = data.get('password')

    # id = User.query.filter_by(empid=empid).first()
    # pwd = User.query.filter_by(password=password).first()
    if empid and password:
        session['logged_in'] = True
        return jsonify({'loginStatus': True}), 200
    else:
        return jsonify({'loginStatus': False, 'Error': 'Invalid credentials'}), 401


if __name__ == '__main__':
    app.run(debug=True)
