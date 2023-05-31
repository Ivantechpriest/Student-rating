from backend.app import db
from marshmallow import Schema, fields, validate, post_load
from flask import jsonify
from flask_jwt_extended import create_access_token


class User(db.Model):

    __tablename__ = "user"
    iduser = db.Column(db.Integer, primary_key=True)
    login = db.Column(db.String(50), nullable=False, unique=True)
    password = db.Column(db.String(145), nullable=False)
    role = db.Column(db.String(20), default="User")
    rating = db.relationship("Student", backref="user")

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    def get_jwt(self):
        access_token = create_access_token(identity=self.iduser)
        return access_token

    @classmethod
    def find_by_login(cls, login):
        return cls.query.filter_by(login=login).first()

    @classmethod
    def delete_user_by_id(cls, iduser):
        if cls.query.get(iduser):
            cls.query.filter_by(iduser=iduser).delete()
            db.session.commit()

            return jsonify({'message': f'User with id={iduser} was successfully deleted'})
        else:
            return jsonify({'error': f'User with id={iduser} does not exist!'}), 400


class Student(db.Model):
    __tablename__ = "student"
    idstudent_rating = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(60), nullable=False)
    birth_date = db.Column(db.Date, nullable=True)
    group = db.Column(db.String(15), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    score = db.Column(db.Integer, nullable=False)
    iduser = db.Column(db.Integer(), db.ForeignKey('user.iduser', ondelete='CASCADE'))

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()

    @classmethod
    def delete_student_by_name(cls, name):
        if cls.query.filter_by(full_name=name):
            cls.query.filter_by(full_name=name).delete()
            db.session.commit()

            return jsonify({'message': f'Student with name={name} was successfully deleted'})
        else:
            return jsonify({'error': f'Student with name={name} does not exist!'}), 400


class UserSchema(Schema):
    iduser = fields.Integer(required=False)
    login = fields.Str(validate=validate.Length(min=5, max=50), required=True)
    password = fields.Str(validate=validate.Length(min=8, max=145), required=True)
    role = fields.Str(validate=validate.Length(min=2, max=10), required=False, default="User")

    @post_load
    def make_user(self, data, **kwargs):
        return User(**data)


class StudentRatingSchema(Schema):

    idstudent_rating = fields.Integer(required=False)

    full_name = fields.Str(validate=validate.Length(min=2, max=60), required=True)
    birth_date = fields.Date(required=True)
    group = fields.Str(validate=validate.Length(min=1, max=15), required=True)
    rating = fields.Integer(required=True)
    score = fields.Integer(required=True)
    iduser = fields.Integer(required=False)

    @post_load
    def make_student(self, data, **kwargs):
        return Student(**data)


class UpdateStudentSchema(Schema):
    idstudent_rating = fields.Integer(required=False)

    full_name = fields.Str(validate=validate.Length(min=2, max=60), required=True)
    birth_date = fields.Date(required=True)
    group = fields.Str(validate=validate.Length(min=1, max=15), required=True)
    rating = fields.Integer(required=True)
    score = fields.Integer(required=True)
    iduser = fields.Integer(required=False)

    @post_load
    def make_student(self, data, **kwargs):
        return True

