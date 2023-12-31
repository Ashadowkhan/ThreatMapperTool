"""empty message

Revision ID: 260450c683df
Revises: 872400bf5320
Create Date: 2022-08-24 08:53:33.458476

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '260450c683df'
down_revision = '872400bf5320'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('compliance_report_notification',
    sa.Column('filters', postgresql.JSONB(astext_type=sa.Text()), nullable=True),
    sa.Column('alert_level', sa.String(length=100), nullable=False),
    sa.Column('duration_in_mins', sa.Integer(), nullable=False),
    sa.Column('last_sent_time', sa.DateTime(timezone=True), nullable=True),
    sa.Column('created_at', sa.DateTime(timezone=True), nullable=True),
    sa.Column('updated_at', sa.DateTime(timezone=True), nullable=True),
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('integration_id', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=False),
    sa.Column('error_msg', sa.Text(), nullable=True),
    sa.ForeignKeyConstraint(['integration_id'], ['integration.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('alert_level', 'integration_id', name='compliance_report_notification_constraint')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('compliance_report_notification')
    # ### end Alembic commands ###
