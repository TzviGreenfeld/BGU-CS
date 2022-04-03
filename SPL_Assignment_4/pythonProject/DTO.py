# DTO - Data Transfer Object
#     • hats: Hold the information on the hats currently in the inventory.
# - id INTEGER PRIMARY KEY
# - topping STRING NOT NULL
# - supplier INTEGER REFERENCES Supplier(id)
# - quantity INTEGER NOT NULL
class Hat:
    def __init__(self, id, topping, supplier, quantity):
        self.id = id
        self.topping = topping
        self.supplier = supplier
        self.quantity = quantity


#   • suppliers: Holds the suppliers data.
# - id INTEGER PRIMARY KEY
# - name STRING NOT NULL
class Supplier:
    def __init__(self, id, name):
        self.id = id
        self.name = name


#    • orders: Holds the information on the different orders.
# - id INTEGER PRIMARY KEY
# - location STRING NOT NULL
# - hat INTEGER REFERENCES hats(id)
class Order:
    def __init__(self, order_id, location, hat):
        self.order_id = order_id
        self.location = location
        self.hat = hat
