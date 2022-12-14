"""Initial migration.

Revision ID: bb44b881b9ca
Revises: db5ba55ad8eb
Create Date: 2022-10-27 15:47:13.900829

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = 'bb44b881b9ca'
down_revision = 'db5ba55ad8eb'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('user', 'password')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('user', sa.Column('password', mysql.VARCHAR(length=45), nullable=False))
    # ### end Alembic commands ###
