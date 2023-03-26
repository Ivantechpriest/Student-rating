from backend.app import db
from backend.models.models import User


def test_get(app_with_data, flask_login):
    res = app_with_data.get("/user/1", headers=flask_login)

    assert res.status_code == 200

    data = res.json

    assert data["login"] == "dimalogin"


def test_register(app_with_db):
    res = app_with_db.post("/user/register", json={
        "login": "dimalogin2",
        "password": "65432101"
    })

    assert res.status_code == 200
    assert db.session.query(User).first().login == "dimalogin2"


def test_login(app_with_data):
    res = app_with_data.post("/user/login", json={
        "login": "dimalogin",
        "password": "12345678"})

    assert res.status_code == 200

    data = res.json

    assert data["message"] == "Logged in as dimalogin"


def test_delete(app_with_data_admin, flask_login_admin):
    res = app_with_data_admin.delete("/user_delete/4", headers=flask_login_admin)

    assert res.status_code == 200
    assert len(db.session.query(User).all()) == 0


def test_delete_error(app_with_data_admin, flask_login_admin):
    res = app_with_data_admin.delete("/user_delete/10", headers=flask_login_admin)

    assert res.status_code == 400


def test_register_error(app_with_db):
    res = app_with_db.post("/user/register", json={
    "login": "dimalogin2",
    "password": "1234567"
})

    assert res.status_code == 405


def test_login_error(app_with_data):
    res = app_with_data.post("/user/login", json={
        "login": "dimalogin78",
        "password": "12345678"})

    assert res.status_code == 404


def test_login_error_password(app_with_data):
    res = app_with_data.post("/user/login", json={
        "login": "dimalogin",
        "password": "123456789"})

    assert res.status_code == 403



