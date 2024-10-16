"""empty message

Revision ID: 8f020f136691
Revises: e27c413ff8cd
Create Date: 2024-10-04 11:14:22.959526

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '8f020f136691'
down_revision = 'e27c413ff8cd'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('expedientes', schema=None) as batch_op:
        batch_op.add_column(sa.Column('juzgado', sa.String(length=180), nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('expedientes', schema=None) as batch_op:
        batch_op.drop_column('juzgado')

    # ### end Alembic commands ###
