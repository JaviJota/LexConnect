from flask import Flask, request, jsonify, Blueprint
from api.models import db, Users, Clients, Expedientes, Clients_Expedientes_Rel, Deudas, Pagos
from flask_cors import CORS
from flask_jwt_extended import create_access_token, jwt_required, get_jwt_identity, create_refresh_token, decode_token

api = Blueprint('api', __name__)

CORS(api)

# -------- Users Routes ---------

@api.route('/users/<int:id>', methods=['GET'])
def get_user(id):
    user = Users.query.get(id)

    if user is None:
        return jsonify({"msg": "Usuario no encontrado"}), 404
    
    return jsonify({"user": user.serialize()}), 200

@api.route('/users', methods=['GET'])
def get_all_users():
    users = Users.query.all()
    users = [user.serialize() for user in users]

    return jsonify({"users": users}), 200

@api.route('/users/register', methods=['POST'])
def create_user():
    data = request.json

    required_fields = ['email', 'password', 'first_name', 'last_name']
    missing_fields = [field for field in required_fields if field not in data or not data[field]]
    if missing_fields:
        return jsonify({'msg': f'Campos que faltan: {", ".join(missing_fields)}'}), 400
    
    user = Users.query.filter_by(email=data['email']).first()
    if user:
        return jsonify({"msg": "Este email ya está en uso."}), 400

    new_user = Users(
        email = data['email'].strip(),
        first_name = data['first_name'].strip(),
        last_name = data['last_name'].strip(),
        password = data['password'].strip(),
    )

    db.session.add(new_user)
    db.session.commit()

    access_token = create_access_token(identity=new_user.id)

    return jsonify({"access_token": access_token, "user": new_user.serialize()}), 201

@api.route('/users/login', methods=['POST'])
def login():
    data = request.json
    
    user = Users.query.filter_by(email=data['email']).first()

    if not user or user.password != data['password']:
        return jsonify({"msg": "Email o contraseña incorrectos."}), 401
    
    return jsonify({"user": user.serialize()}), 200

@api.route('/users', methods=['DELETE']) #Delete user and all info
def delete_user(id):
    user = Users.query.get(id)
    if not user:
        return jsonify({"msg": "El usuario no existe."}), 401
    
    if user.pagos:
        for pago in user.pagos:
            db.session.delete(pago)

    if user.deudas:
        for deuda in user.deudas:
            db.session.delete(deuda)

    if user.expedientes:
        for expediente in user.expedientes:
            db.session.delete(expediente)

    if user.clients:
        for client in user.clients:
            db.session.delete(client)

    db.session.delete(user)
    db.session.commit()

    return jsonify({"msg": "Se ha eliminado el usuario y toda su información"}), 200

# -------- Clients Routes ---------

@api.route('/clients', methods=['GET'])
def get_all_clients():
    clients = Clients.query.all()
    clients = [client.serialize() for client in clients]

    return jsonify({"users": clients}), 200

@api.route('/client/<int:id>', methods=['GET'])
def get_client(id):
    client = Clients.query.get(id)
    if not client:
        return jsonify({ "msg": "Cliente no encontrado" }), 400

    return ({ "client": client.serialize() }), 200

@api.route('/users/<int:id>/clients', methods=['GET'])
def get_user_clients(id):

    user = Users.query.get(id)
    if not user:
        return{ "msg": "Usuario no encontrado"}, 400
    
    if not user.clients:
        return{"msg": "No se ha encontrado ningún cliente"}, 204
    
    user_clients = [client.serialize() for client in user.clients]
    return {"clients": user_clients}, 200

@api.route('/clients', methods=['POST'])
def create_client():
    data = request.json

    new_client = Clients(
        email = data['clientEmail'].strip(),
        first_name = data['clientFirstName'].strip(),
        last_name = data['clientLastName'].strip(),
        phone_number = data['clientPhoneNumber'].strip(),
        description = data['clientDescription'].strip(),
        user_id = data['userId']
    )

    db.session.add(new_client)
    db.session.commit()

    user = Users.query.get(data['userId'])
    
    user_clients = [client.serialize() for client in user.clients]
    return jsonify({"clients": user_clients}), 201

# -------- Expedientes Routes ---------

@api.route('/expedientes', methods=['GET'])
def get_all_expedientes():
    expedientes = Expedientes.query.all()
    expedientes = [expediente.serialize() for expediente in expedientes]

    return jsonify({"users": expedientes}), 200

@api.route('/users/<int:id>/expedientes', methods=['GET'])
def get_user_expedientes(id):
    user = Users.query.get(id)

    if not user:
        return{ "msg": "Usuario no encontrado"}, 400
    
    if not user.expedientes:
        return{"msg": "No se ha encontrado ningún expediente"}, 204
    
    user_expedientes = [expediente.serialize() for expediente in user.expedientes]
    return {"expedientes": user_expedientes}, 200

@api.route('/expedientes', methods=['POST'])
def create_expediente():
    data = request.json

    new_expediente = Expedientes(
        num_exp = data['numExp'].strip(),
        nig = data['nig'].strip(),
        description = data['description'].strip(),
        juzgado = data['juzgado'].strip(),
        estado = data['estado'].strip(),
        # client_id = data['clientId'],
        user_id = data['userId']
    )

    db.session.add(new_expediente)
    db.session.commit()

    expediente_id = new_expediente.id

    if isinstance(data['clientId'], list) and len(data['clientId']) > 0: 
        for client_id in data['clientId']:
            new_client_expediente_rel = Clients_Expedientes_Rel(
                client_id = client_id,
                expediente_id = expediente_id
            )
            db.session.add(new_client_expediente_rel)
        
        db.session.commit()


    user = Users.query.get(data['userId'])
    user_expedientes = [expediente.serialize() for expediente in user.expedientes]

    return jsonify({"expedientes" : user_expedientes}), 201

# -------- Deudas Routes ---------

@api.route('/client/<int:id>/deudas', methods=['GET'])
def get_client_deudas(id):

    client = Clients.query.get(id)
    if not client:
        return jsonify({ "msg": "Cliente no encontrado" }), 400
    
    if not client.deudas:
        return jsonify({ "msg": "No se ha encontrado ninguna deuda" }), 204
    
    client_deudas = [deuda.serialize() for deuda in client.deudas]
    return jsonify({ "deudas": client_deudas }), 200

@api.route('/deudas', methods=['POST'])
def create_deuda():
    data = request.json
    user = Users.query.get(data['userId'])
    if not user:
        return jsonify({"msg": "Usuario no encontrado"}), 400
    
    client = Clients.query.get(data['clientId'])
    if not client:
        return jsonify({"msg": "Cliente no encontrado"}), 400
    
    expediente = Expedientes.query.get(data['expedienteId'])
    if not expediente:
        return jsonify({"msg": "Expediente no encontrado"}), 400
    
    new_deuda = Deudas(
        title = data['concept'].strip(),
        amount = data['amount'],
        expediente_id = data['expedienteId'],
        client_id = data ['clientId'],
        user_id = data['userId']
    )

    db.session.add(new_deuda)
    db.session.commit()

    client = Clients.query.get(data['clientId'])
    client_deudas = [deuda.serialize() for deuda in client.deudas]

    return jsonify({ "deudas": client_deudas }), 201

@api.route('/deudas/<int:id>', methods=['DELETE'])
def delete_deuda(id):
    deuda = Deudas.query.get(id)

    if not deuda:
        return jsonify({ "msg": "Deuda no encontrada" }), 400
    
    db.session.delete(deuda)
    db.session.commit()

    client = Clients.query.get(deuda.client_id)
    deudas = [deuda.serialize() for deuda in client.deudas]


    return jsonify({ "deudas": deudas }), 200

# -------- Pagos Routes ---------

@api.route('/client/<int:id>/pagos', methods=['GET'])
def get_client_pagos(id):

    client = Clients.query.get(id)
    if not client:
        return jsonify({ "msg": "Cliente no encontrado" }), 400
    
    if not client.pagos:
        return jsonify({ "msg": "No se ha encontrado ninguna deuda" }), 204
    
    client_pagos = [pago.serialize() for pago in client.pagos]
    return jsonify({ "pagos": client_pagos }), 200

@api.route('/pagos/<int:id>', methods=['POST'])
def delete_deuda_add_pago(id):

    deuda = Deudas.query.get(id)
    if not deuda:
        return jsonify({"msg": "Deuda no encontrada"}), 400
    
    new_pago = Pagos(
        title = deuda.title,
        amount = deuda.amount,
        expediente_id = deuda.expediente_id,
        client_id = deuda.client_id,
        user_id = deuda.user_id
    )

    db.session.delete(deuda)
    db.session.add(new_pago)
    db.session.commit()

    client = Clients.query.get(deuda.client_id)
    client_deudas = [deuda.serialize() for deuda in client.deudas]
    client_pagos = [pago.serialize() for pago in client.pagos]

    return jsonify({
        "deudas": client_deudas,
        "pagos": client_pagos,
    }), 200

@api.route('/pagos', methods=['DELETE'])
def delete_pago(id):
    pago = Pagos.query.get(id)

    if not pago:
        return jsonify({ "msg": "Pago no encontrado" }), 400
    
    client = Clients.query.get(pago.client_id)
    pagos = [pago.serialize() for pago in client.pagos]

    db.session.delete(pago)

    return jsonify({ "pagos": pagos })
