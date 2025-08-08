from app.database.db import db
from app.models.order import Order
from app.models.garment import Garment
from app.models.order_detail import OrderDetail
from app.models.service import Service
from app.models.user import User
from app.models.client import Client

def create_order(client_id, user_id, estimated_date, total_price):
    order = Order(client_id=client_id, user_id=user_id, estimated_delivery_date=estimated_date, total=total_price)
    db.session.add(order)
    db.session.commit()
    return order

def add_service(name, description, price):
    service = Service(name=name, description=description,price=price)
    db.session.add(service)
    db.session.commit()
    return service

def add_garment(type, description, notes):
    garment = Garment(type=type, description=description, observations=notes)
    db.session.add(garment)
    db.session.commit()
    return garment

def create_order_detail(order_id,garment_id, service_id, quantity):
    order_detail = OrderDetail(order_id=order_id, garment_id=garment_id, service_id=service_id, quantity=quantity)
    db.session.add(order_detail)
    db.session.commit()
    return order_detail
    
def get_order_detail(order_id):
    #La busqueda que vamos a hacer, debe traer:
    #Cliente, garments
    #Cada garment debe tener sus servicios
    print("Order id mandado: ", order_id)
    print(order_id, type(order_id)) 
    order= Order.query.get(order_id)
    print("Order mandada: ", order.to_dict())
    order_data={
        "order_id":order.id,
        "client":order.clients.name,
        "status":order.state,
        "garments":[]
    } 
    grmtOrdr = OrderDetail.query.filter_by(order_id=order.id)
    for garment in grmtOrdr:
        print("Garment mandado: " , garment.to_dict())
        garment_Filtered= Garment.query.get(garment.id)
        garment_data = {
            "type":garment_Filtered.type,
            "description":garment_Filtered.description,
            "observations":garment_Filtered.observations,
            "services":[]
        }
        for grmts in grmtOrdr:
            print("grmts: ", grmts.to_dict())
            service = Service.query.get(grmts.service_id)
            print("Services mandado: ", service.to_dict())
            service_data= {
                "name":service.name,
                "description": service.description,
                "price":service.price
            }
            garment_data["services"].append(service_data)
        order_data["garments"].append(garment_data)
    print("Hola amigo, soy order data desde el controller ", order_data)
    return order_data
    
def update_order_status(order_id, new_status):
    order = Order.query.get(order_id)
    if not order:
        return None
    order.state =new_status
    db.session.commit()
    return order

def list_orders_by_status(status):
    orders = Order.query.filter(state=status).all()
    data = [{
        "id":order.id,
        "client_id":order.client_id,
        "state":order.state,
        "estimated_delivery_date":order.estimated_delivered_date,
        "total":order.total,
        "pagado":order.pagado,
    } for order in orders]
    return data

def create_order_table(orders):
    data = []
    for order in orders:
        client = Client.query.get(order.client_id)
        user = User.query.get(order.user_id)
        order_table = {
            "id":order.id,
            "client_name":client.name,
            "user_name":user.name,
            "state":order.state,
            "created_at":order.created_at,
            "total":order.total
        } 
        data.append(order_table)
    return data

def get_orders_dashboard(pagination):
    page_size = 10
    query = Order.query.order_by(Order.created_at.desc())
    # Calcula cuántos registros saltar
    offset_value = (pagination - 1) * page_size
    query = query.offset(offset_value).limit(page_size)
    return create_order_table(query.all())


def get_pending_order_dashboard(pagination):
    offset_value = (pagination - 1) * 10
    order_received = (
        Order.query
        .filter_by(state="recibido")
        .order_by(Order.created_at.desc())
        .offset(offset_value)
        .limit(10))
    order_process = (
        Order.query
        .filter_by(state="en proceso")
        .order_by(Order.created_at.desc())
        .offset(offset_value)
        .limit(10))
    orders = order_received.all() + order_process.all()
    return create_order_table(orders)

def get_counting():
    num_garments = Garment.query.filter().count()
    num_services = Service.query.filter().count()
    num_clients = Client.query.filter().count()
    num_users = User.query.filter().count()
    data = {
        "quantity_garments":num_garments,
        "quantity_services":num_services,
        "quantity_clients":num_clients,
        "quantity_users":num_users
    }
    return data