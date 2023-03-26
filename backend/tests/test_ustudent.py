from backend.app import db
from backend.models.models import User, Student


def test_add(app_with_db, flask_login_admin):
    res = app_with_db.post("/add/student", json={
        "full_name": "Dima Sliusarchuk",
        "birth_date": "2004-10-06",
        "group": "kn",
        "rating": 100,
        "score": 200
    }, headers=flask_login_admin)

    assert res.status_code == 200
    assert db.session.query(Student).first().full_name == "Dima Sliusarchuk"


def test_add_error(app_with_db, flask_login_admin):
    res = app_with_db.post("/add/student", json={
        "full_name": "Dima Sliusarchuk",
        "birth_date": "2004-10-06",
        "group": "",
        "rating": 100,
        "score": 200
    }, headers=flask_login_admin)

    assert res.status_code == 405


def test_get(app_with_data, flask_login):
    res = app_with_data.get("/student/5", headers=flask_login)

    assert res.status_code == 200

    data = res.json

    assert data["full_name"] == "Dima Sliusarchuk"


def test_get_error(app_with_data, flask_login):
    res = app_with_data.get("/student/1", headers=flask_login)

    assert res.status_code == 404


def test_get_rating(app_with_data, flask_login):
    res = app_with_data.get("/students/findByRating/100", headers=flask_login)

    assert res.status_code == 200

    data = res.json

    assert data["students"][0]["full_name"] == "Dima Sliusarchuk"


def test_get_rating_error(app_with_data, flask_login):
    res = app_with_data.get("/students/findByRating/20", headers=flask_login)

    assert res.status_code == 404


def test_get_score(app_with_data, flask_login):
    res = app_with_data.get("/students/findByScore/200", headers=flask_login)

    assert res.status_code == 200

    data = res.json

    assert data["students"][0]["full_name"] == "Dima Sliusarchuk"


def test_get_score_error(app_with_data, flask_login):
    res = app_with_data.get("/students/findByRating/1", headers=flask_login)

    assert res.status_code == 404


def test_delete(app_with_data, flask_login_admin):
    res = app_with_data.delete("/student_delete/12", headers=flask_login_admin)

    assert res.status_code == 200
    assert len(db.session.query(Student).all()) == 0


def test_delete_error(app_with_data, flask_login_admin):
    res = app_with_data.delete("/student_delete/1", headers=flask_login_admin)

    assert res.status_code == 400


def test_update(app_with_data, flask_login_admin):
    res = app_with_data.put("/student/update", json={
        "idstudent_rating":14,
        "full_name": "Dima Sliusarchukupd",
        "birth_date": "2004-10-06",
        "group": "kn",
        "rating": 150,
        "score": 200
    }, headers=flask_login_admin)

    assert res.status_code == 200
    assert db.session.query(Student).first().full_name == "Dima Sliusarchukupd"
    assert db.session.query(Student).first().rating == 150


def test_update_error(app_with_data, flask_login_admin):
    res = app_with_data.put("/student/update", json={
        "idstudent_rating":1,
        "full_name": "Dima Sliusarchukupd",
        "birth_date": "2004-10-06",
        "group": "kn",
        "rating": 150,
        "score": 200
    }, headers=flask_login_admin)

    assert res.status_code == 404




