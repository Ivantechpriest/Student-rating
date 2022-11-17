from backend.models.models import StudentRating, StudentRatingSchema, User, UserSchema, UpdateStudentSchema
from flask import jsonify, request
from backend.app import app, bcrypt
from marshmallow import ValidationError



@app.route("/")
def index():
    return "<h1>Main page</h1>"


@app.route('/user/register', methods=['POST'])
def add_user():
    data = request.get_json()
    schema_user = UserSchema()

    try:
        user = schema_user.load(data)
    except ValidationError as err:
        return jsonify({"Validation errors": err.messages}), 405

    user.password = bcrypt.generate_password_hash(password=data['password'])
    user.save_to_db()

    return jsonify({'Message': 'User rating have been created successfully.'}), 200


@app.route('/user/<iduser>', methods=['GET'])
def get_user_by_id(iduser: int):
    user = User.query.get(iduser)
    if not user:
        return jsonify({"Error": f"User with user id={iduser} not found"}), 404

    user_data = {"login": user.login, "password": user.password}

    return jsonify(user_data), 200


@app.route('/user_delete/<iduser>', methods=['DELETE'])
def delete_user_by_id(iduser: int):
    return User.delete_user_by_id(iduser), 200


@app.route('/add/student', methods=['POST'])
def add_in_student_rating():
    data = request.get_json()
    schema_student = StudentRatingSchema()

    try:
        student = schema_student.load(data)
    except ValidationError as err:
        return jsonify({"Validation errors": err.messages}), 405

    student.save_to_db()

    return jsonify({'Message': 'Student rating have been created successfully.'}), 200


@app.route('/student_delete/<idstudent_rating>', methods=['DELETE'])
def delete_student_by_id(idstudent_rating: int):
    return StudentRating.delete_student_by_id(idstudent_rating), 200


@app.route('/student/<idstudent_rating>', methods=['GET'])
def get_student_by_idstudent_rating(idstudent_rating: int):
    student = StudentRating.query.get(idstudent_rating)

    if not student:
        return jsonify({"Error": f"Student with student id={idstudent_rating} not found"}), 404

    student_data = {
        'full_name': student.full_name,
        'birth_date': student.birth_date,
        'group': student.group,
        'rating': student.rating,
        'score': student.score,
        # 'iduser': student.iduser
    }

    return jsonify(student_data), 200


@app.route('/students/findByRating/<rating>', methods=['GET'])
def get_student_by_rating(rating: int):
    student = StudentRating.query.get(rating)

    if not student:
        return jsonify({"Error": f"Student with rating ={rating} not found"}), 404

    student_data = {
        'full_name': student.full_name,
        'birth_date': student.birth_date,
        'group': student.group,
        'rating': student.rating,
        'score': student.score,
        # 'iduser': student.iduser
    }

    return jsonify(student_data), 200


@app.route('/students/findByScore/<score>', methods=['GET'])
def get_student_by_score(score: int):
    student = StudentRating.query.get(score)

    if not student:
        return jsonify({"Error": f"Student with score ={score} not found"}), 404

    student_data = {
        'full_name': student.full_name,
        'birth_date': student.birth_date,
        'group': student.group,
        'rating': student.rating,
        'score': student.score,
        # 'iduser': student.iduser
    }

    return jsonify(student_data), 200


@app.route('/student/update', methods=['PUT'])
def update_student():
    data = request.get_json()
    student = StudentRating.query.get(data["idstudent_rating"])
    if student:
        schema_user = UpdateStudentSchema()

        schema_user.load(data)

        student.full_name = data['full_name']
        student.birth_date = data['birth_date']
        student.group = data['group']
        student.rating = data['rating']
        student.score = data['score']

        student.save_to_db()
        return jsonify({'Message': 'User has been updated successfully.'})

    return jsonify({"Error": f"Student with user id={data['user_id']} not found"}), 404