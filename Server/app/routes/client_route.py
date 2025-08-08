from flask import jsonify, request, Blueprint
from app.controllers.client_controller import create_client, search_client_by_name, search_client_by_phone, update_client, delete_client, search_clients

client_bp = Blueprint("client_bp", __name__, url_prefix="/clients")

@client_bp.route("/create", methods=["POST"])
def create():
    data = request.json
    name = data.get("name")
    phone_number = data.get("phone_number")
    address = data.get("address")

    if not name or not phone_number or not address:
        return jsonify({"error":"Los datos basicos de un cliente, son obligatorios"}), 400
    
    client = create_client(name, phone_number, address)
    return jsonify({
        "msg":"Cliente creado con exito!",
        "client":client.to_dict()
    }), 200

@client_bp.route("/search/name", methods=["GET"])
def search_by_name():
    name = request.args.get("name")
    clients = search_client_by_name(name)
#Fea pero entendible
    #data = []
    #for client in clients:
        #data.append(client.to_dict())
#Fancy pero diferente de ejecutar
    data = [client.to_dict() for client in clients]
    return data

#@client_bp.route("/search/phone", methods=["GET"])
def search_by_phone(phone_received):
    print("Soy phone desde ruta", phone_received)
    phone = phone_received
    client = search_client_by_phone(phone)
    if not client:
        return jsonify({"error":"Cliente no encontrado :/"}), 400
    print('Soy client desde ruta', client)
    return client

@client_bp.route("/search", methods=["GET"])
def search():
    filter = request.args.get("filter")
    parameter = request.args.get("parameter")
    clients=[]
    if filter and parameter:
        if filter == "name":
            clients = search_client_by_name(parameter)
        elif filter == "phone":
            clients = search_by_phone(parameter)
        else:
            return jsonify({"msg":"Filtro desconocido"}),400 
    else:
        clients = search_clients() 
    print("Soy lo  que hay en clients", clients)
    return [client.to_dict() for client in clients]

@client_bp.route("/update/<int:client_id>", methods=["PUT"])
def update(client_id):
    data = request.json
    client = update_client(client_id, data)
    if not client:
        return jsonify({"error":"Cliente no encontrado :/"}), 400
    return jsonify({"msg":"Cliente actualizado con exito"}), 200

@client_bp.route("/delete/<int:client_id>", methods=["DELETE"])
def delete(client_id):
    client = delete_client(client_id)
    if not client:
        return jsonify({"error":"Cliente no encontrado :/"}), 400
    return jsonify({"msg":"Cliente eliminado con exito"}), 200 