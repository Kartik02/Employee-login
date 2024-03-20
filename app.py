from flask import Flask, render_template, redirect, url_for, session, flash
from flask_wtf import FlaskForm
from wtforms import StringField, PasswordField, SubmitField
from wtforms.validators import DataRequired
from flask_mysqldb import MySQL
import yaml

app = Flask(__name__)

db = yaml.safe_load(open('db.yaml'))
app.config['MYSQL_HOST'] = db['host']
app.config['MYSQL_USER'] = db['user']
app.config['MYSQL_PASSWORD'] = db['password']
app.config['MYSQL_DB'] = db['db']
app.secret_key = 'mysecretkey'
mysql = MySQL(app)

class LoginForm(FlaskForm):
    username = StringField("Username", validators=[DataRequired()])
    password = PasswordField("Password", validators=[DataRequired()])
    submit = SubmitField("Login")

@app.route('/', methods = ['GET', 'POST'])
def login():
    form = LoginForm()
    if form.validate_on_submit():
        username = form.username.data
        password = form.password.data

        #hashed_password = bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt())

        cursor = mysql.connection.cursor()
        cursor.execute("SELECT * FROM users where username=%s", (username,))
        user = cursor.fetchone()       
        mysql.connection.commit()
        cursor.close()

        if user and password == user[2]:
            if user[3] == 'admin':
                session['id'] = user[0]
                return redirect(url_for('admindashboard'))
            else:
                session['id'] = user[0]
                return redirect(url_for('dashboard'))
        else:
            flash("Login failed. Invalid credentials.")
            return redirect(url_for('login'))

    return render_template('login.html', form=form)

@app.route('/dashboard', methods = ['GET', 'POST'])
def dashboard():
    if 'id' in session:
        id = session['id']
        cursor = mysql.connection.cursor()
        cursor.execute("SELECT * FROM users where id=%s", (id,))
        user = cursor.fetchone()
        cursor.close()

        if user:
            return render_template('dashboard.html', user = user)
    return redirect(url_for('login'))

@app.route('/admindashboard', methods = ['GET', 'POST'])
def admindashboard():
    if 'id' in session:
        id = session['id']
        cursor = mysql.connection.cursor()
        cursor.execute("SELECT * FROM users where id=%s", (id,))
        user = cursor.fetchone()
        cursor.close()

        if user:
            return render_template('admindashboard.html', user = user)
    return redirect(url_for('login'))

@app.route('/logout')
def logout():
    session.pop('id', None)
    flash("Logged out successfully!")
    return redirect(url_for('login'))

if __name__=="__main__":
    app.run(debug=True)