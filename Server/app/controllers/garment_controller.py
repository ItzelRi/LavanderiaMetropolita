from app.models.garment import Garment
from app import db

def create_garment(name, description, observations):
    new_garment = Garment(type = name, description=description, observations=observations)
    db.session.add(new_garment)
    db.session.commit()
    return new_garment

#propiedad en especifico = filter(), por id = get()
def get_garment(garment_id):
    return Garment.query.get(garment_id)

def get_garments():
    garments = Garment.query.filter().all()
    if not garments:
        return None
    data = [garment.to_dict() for garment in garments]
    return data 

def update_garment(garment_id, updated_data):
    garment = Garment.query.get(garment_id)
    if not garment:
        return None
    #ITEMS regresa dupla o arreglo
    for key, value in updated_data.items():
        setattr(garment, key, value)

    db.session.commit()
    return garment

def delete_garment(garment_id):
    garment = Garment.query.get(garment_id)
    if not garment:
        return None
    db.session.delete(garment)
    db.session.commit()
    return garment