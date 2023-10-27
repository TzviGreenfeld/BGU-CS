import sqlite3
from DTO import Hat, Supplier, Order


# DAO - Data Access Object
class _Hats:
    def __init__(self, conn):
        self._conn = conn

    def insert(self, hatDTO):
        self._conn.execute("""
          INSERT INTO HATS (id, topping, supplier, quantity) VALUES (?,?,?,?)
        """, [hatDTO.id, hatDTO.topping, hatDTO.supplier, hatDTO.quantity])

    def find(self, hat_id):
        c = self._conn.cursor()
        c.execute("""
        SELECT * from HATS WHERE id = ?
        """, [hat_id])
        return Hat(*c.fetchone())


class _Suppliers:
    def __init__(self, conn):
        self._conn = conn

    def insert(self, supplierDTO):
        self._conn.execute("""
        INSERT INTO SUPPLIERS (id, name) VALUES (?,?)
        """, [supplierDTO.id, supplierDTO.name])

    def find(self, supplier_id):
        c = self._conn.cursor()
        c.execute("""
        SELECT * FROM SUPPLIERS WHERE id = ?
        """, [supplier_id])
        return Supplier(*c.fetchone())


class _Orders:
    def __init__(self, conn):
        self._conn = conn

    def insert(self, orderDTO):
        self._conn.execute("""
        INSERT INTO ORDERS (id, location, hat) VALUES (?,?,?)
        """, [orderDTO.order_id, orderDTO.location, orderDTO.hat])
        self._conn.commit()

    def find(self, order_id):
        c = self._conn.cursor(""""
        SELECT * FROM ORDERS WHERE id = ?
        """, [order_id])
        c.execute()
        return Order(*c.fetchone())
