from flask import jsonify, request, Blueprint
from app.controllers.garment_controller import create_garment, update_garment, delete_garment, get_garment, get_garments

garment_bp = Blueprint("garment_bp", __name__, url_prefix="/garments")

@garment_bp.route("/create", methods=["POST"])
def create():
    data = request.json
    garment = create_garment(data["type"], data["description"], data["observations"])
    return jsonify({"msg":"Prenda creada con exito", "garment_id":garment.id}),200

@garment_bp.route("/update/<int:garment_id>", methods=["PUT"])
def update(garment_id):
    data = request.json
    garment = update_garment(garment_id, data)
    return jsonify({"msg":"Prenda actualizada con exito", "garment_id":garment.id}),200

@garment_bp.route("/delete/<int:garment_id>", methods=["DELETE"])
def delete(garment_id):
    delete_garment(garment_id)
    return jsonify({"msg":"Prenda eliminada con exito"}),200

@garment_bp.route("/getAll", methods=["GET"])
def get_all():
    garments = get_garments()
    return jsonify({"msg":"El listado de prendas se ejecuto con exito", "garments":garments}),200
