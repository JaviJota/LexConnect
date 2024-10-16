from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.sql import func
import os

db = SQLAlchemy()

class Users(db.Model):
    __tablename__="users"

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(256), unique=True, nullable=False)
    first_name = db.Column(db.String(50), unique=False, nullable=False)
    last_name = db.Column(db.String(100), unique=False, nullable=False)
    password = db.Column(db.String, unique=False, nullable=False)
    creation_date = db.Column(db.Date, default=func.current_date(), unique=False, nullable=False)

    clients = db.relationship("Clients", back_populates="user")
    expedientes = db.relationship("Expedientes", back_populates="user")
    deudas = db.relationship("Deudas", back_populates="user")
    pagos = db.relationship("Pagos", back_populates="user")

    def __repr__(self):
        return f"<User {self.email}>"
    
    def serialize(self):
        return {
            "id": self.id,
            "email": self.email,
            "first_name": self.first_name,
            "last_name": self.last_name,
            # "clients": [client.serialize() for client in self.clients],
            "creation_date": self.creation_date,
        }

# --------------------------------------------

class Clients_Expedientes_Rel(db.Model):
     __tablename__= "clients_expedientes_rel"

     client_id = db.Column(db.Integer, db.ForeignKey("clients.id"), nullable=False, primary_key=True)
     expediente_id = db.Column(db.Integer, db.ForeignKey("expedientes.id"), nullable=False, primary_key=True)

     def serialize(self):
          return {
               "client_id": self.client_id,
               "expediente_id": self.expediente_id
          }

# --------------------------------------------

class Clients(db.Model):
    __tablename__="clients"

    id = db.Column(db.Integer, primary_key=True)
    email = db.Column(db.String(256), unique=False, nullable=True)
    first_name = db.Column(db.String(50), unique=False, nullable=False)
    last_name = db.Column(db.String(100), unique=False, nullable=False)
    phone_number = db.Column(db.String(20), unique=False, nullable=True)
    description = db.Column(db.String(450), unique=False, nullable=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    user = db.relationship("Users", back_populates="clients")
    expedientes = db.relationship("Expedientes", secondary="clients_expedientes_rel", back_populates="clients")
    deudas = db.relationship("Deudas", back_populates="clients")
    pagos = db.relationship("Pagos", back_populates="clients")

    def __repr__(self):
        return f"<Client {self.id}>"
    
    def serialize(self):
        total_deudas = sum(deuda.amount for deuda in self.deudas)
        total_pagos = sum(pago.amount for pago in self.pagos)


        return {
            "id": self.id,
            "email": self.email,
            "first_name": self.first_name,
            "last_name": self.last_name,
            "phone_number": self.phone_number,
            "description": self.description,
            "expedientes": [expediente.serialize() for expediente in self.expedientes],
            "deudas": total_deudas,
            "pagos": total_pagos,
            # "pagos": [pago.serialize() for pago in self.pagos]
        }

# --------------------------------------------

class Expedientes(db.Model):
    __tablename__= "expedientes"

    id = db.Column(db.Integer, primary_key=True)
    num_exp = db.Column(db.String, unique=False, nullable=False)
    nig = db.Column(db.String(60), unique=False, nullable=True)
    description = db.Column(db.String(250), unique=False, nullable=True)
    juzgado = db.Column(db.String(180), unique=False, nullable=True)
    estado = db.Column(db.String(250), unique=False, nullable=False)
    creation_date = db.Column(db.Date, default=func.current_date(), unique=False, nullable=False)
    # client_id = db.Column(db.Integer, db.ForeignKey("clients.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    user = db.relationship("Users", back_populates="expedientes")
    clients = db.relationship("Clients", secondary="clients_expedientes_rel", back_populates="expedientes")
    deudas = db.relationship("Deudas", back_populates="expedientes")
    pagos = db.relationship("Pagos", back_populates="expedientes")

    def __repr__(self):
        return f"<Expedientes {self.id}>"

    def serialize(self):
        return {
            "id": self.id,
            "num_exp": self.num_exp,
            "nig": self.nig,
            "description": self.description,
            "juzgado": self.juzgado,
            "estado": self.estado,
            "creation_date": self.creation_date,
            "user_id": self.user_id,
            # "clients": [client.serialize() for client in self.clients]
        }

# --------------------------------------------

class Deudas(db.Model):
    __tablename__= "deudas"

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(165), unique=False, nullable=True)
    amount = db.Column(db.Integer, unique=False, nullable=False)
    creation_date = db.Column(db.Date, default=func.current_date(), unique=False, nullable=False)
    expediente_id = db.Column(db.Integer, db.ForeignKey("expedientes.id"), nullable=False)
    client_id = db.Column(db.Integer, db.ForeignKey("clients.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    expedientes = db.relationship("Expedientes", back_populates="deudas")
    clients = db.relationship("Clients", back_populates="deudas")
    user = db.relationship("Users", back_populates="deudas")

    def __repr__(self):
         return f"<Deudas {self.id}>"
    
    def serialize(self):
        return {
              "id": self.id,
              "title": self.title,
              "amount": self.amount,
              "creation_date": self.creation_date,
              "expediente_id": self.expediente_id,
              "expediente": self.expedientes.num_exp,
              "client_id": self.client_id,
              "user_id": self.user_id,
         }

# --------------------------------------------

class Pagos(db.Model):
    __tablename__= "pagos"
    
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(165), unique=False, nullable=True)
    amount = db.Column(db.Integer, unique=False, nullable=False)
    creation_date = db.Column(db.Date, default=func.current_date(), unique=False, nullable=False)
    expediente_id = db.Column(db.Integer, db.ForeignKey("expedientes.id"), nullable=False)
    client_id = db.Column(db.Integer, db.ForeignKey("clients.id"), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    expedientes = db.relationship("Expedientes", back_populates="pagos")
    clients = db.relationship("Clients", back_populates="pagos")
    user = db.relationship("Users", back_populates="pagos")

    def __repr__(self):
         return f"<Pagos {self.id}>"
    
    def serialize(self):
         return {
              "id": self.id,
              "title": self.title,
              "amount": self.amount,
              "creation_date": self.creation_date,
              "expediente_id": self.expediente_id,
              "expediente": self.expedientes.num_exp,              
              "client_id": self.client_id,
              "user_id": self.user_id,
         }