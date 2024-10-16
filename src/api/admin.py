import os
from flask_admin import Admin
from flask_admin.contrib.sqla import ModelView
from .models import db, Users, Clients, Expedientes, Deudas, Pagos, Clients_Expedientes_Rel

def setup_admin(app):
    app.secret_key = os.environ.get('FLASK_APP_KEY', 'sample key')
    app.config['FLASK_ADMIN_SWATCH'] = 'minty'
    admin = Admin(app, name='LexiGest Admin', template_mode='bootstrap4')

    #Add models

    admin.add_view(ModelView(Users, db.session))
    admin.add_view(ModelView(Clients, db.session))
    admin.add_view(ModelView(Expedientes, db.session))
    admin.add_view(ModelView(Deudas, db.session))
    admin.add_view(ModelView(Pagos, db.session))
    admin.add_view(ModelView(Clients_Expedientes_Rel, db.session))

#Plantilla: admin.add_view(ModelView(YourModelName, db.session))