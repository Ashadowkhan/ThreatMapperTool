"""empty message

Revision ID: b750af6ca607
Revises: 9b57e8e330bd
Create Date: 2023-04-21 14:06:25.198592

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'b750af6ca607'
down_revision = '9b57e8e330bd'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('cloud_compliance_node', sa.Column('version', sa.String(length=20), nullable=True))
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('cloud_compliance_node', 'version')
    # ### end Alembic commands ###