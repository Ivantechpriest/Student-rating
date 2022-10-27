from backend.app import db


class User(db.Model):
    __tablename__ = "user"
    iduser = db.Column(db.Integer, primary_key=True)
    login = db.Column(db.String(50), nullable=False)
    password = db.Column(db.String(45), nullable=False)
    rating = db.relationship("StudentRating", back_populates="user")

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()


class StudentRating(db.Model):
    __tablename__ = "student_rating"
    idstudent_rating = db.Column(db.Integer, primary_key=True)
    full_name = db.Column(db.String(60), nullable=False)
    birth_date = db.Column(db.DateTime, nullable=True)
    group = db.Column(db.String(15), nullable=False)
    rating = db.Column(db.Integer, nullable=False)
    score = db.Column(db.Integer, nullable=False)
    iduser = db.Column(db.Integer(), db.ForeignKey('user.iduser', ondelete='CASCADE'))

    def save_to_db(self):
        db.session.add(self)
        db.session.commit()
