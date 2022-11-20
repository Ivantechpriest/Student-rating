"""empty message

Revision ID: 1111dce7a776
Revises: dd6ce1ca3345
Create Date: 2022-11-18 00:10:32.753651

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = '1111dce7a776'
down_revision = 'dd6ce1ca3345'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.alter_column('password',
               existing_type=mysql.VARCHAR(length=45),
               type_=sa.String(length=145),
               existing_nullable=False)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.alter_column('password',
               existing_type=sa.String(length=145),
               type_=mysql.VARCHAR(length=45),
               existing_nullable=False)

    # ### end Alembic commands ###
