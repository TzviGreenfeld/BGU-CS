import atexit
import sqlite3
from DTO import Hat, Supplier, Order
from DAO import _Suppliers, _Hats, _Orders


class _Repository:
    def __init__(self):
        self._conn = None
        self.Hats_DAO = None
        self.Suppliers_DAO = None
        self.Orders_DAO = None
        self.output_file_content = ""

    def set_database_path(self, database_path):
        self._conn = sqlite3.connect(database_path)
        self.Hats_DAO = _Hats(self._conn)
        self.Suppliers_DAO = _Suppliers(self._conn)
        self.Orders_DAO = _Orders(self._conn)

    def _close(self):
        self._conn.commit()
        self._conn.close()

    def _create_table_hats(self):
        self._conn.executescript("""
            CREATE TABLE HATS(
        id INTEGER PRIMARY KEY,
        topping TEXT NOT NULL,
        supplier INTEGER REFERENCES Supplier(id),
        quantity INTEGER NOT NULL);
        """)
        return

    def _create_table_suppliers(self):
        self._conn.executescript("""
            CREATE TABLE SUPPLIERS(
        id INTEGER PRIMARY KEY,
        name TEXT NOT NULL);    
        """)
        return

    def _create_table_orders(self):
        self._conn.executescript("""
            CREATE TABLE ORDERS(
        id INTEGER PRIMARY KEY,
        location TEXT NOT NULL,
        hat INTEGER REFERENCES hats(id))
        """)
        return

    def delete_hat_entries(self):
        cur = self._conn.cursor()
        cur.execute("DELETE FROM HATS WHERE quantity = 0")
        self._conn.commit()

    def create_tables(self):
        self._create_table_hats()
        self._create_table_suppliers()
        self._create_table_orders()

    def execute_orders(self, orders):
        order_id = 1
        for order in orders:
            self.execute_order(order, order_id)
            order_id += 1
        self.delete_hat_entries()

    def execute_order(self, order, order_id):
        location, topping = order[0], order[1]
        cur = self._conn.cursor()
        cur.execute("""
            SELECT HATS.id, HATS.supplier FROM HATS
        WHERE HATS.quantity > 0 AND HATS.topping = (?)
        ORDER BY HATS.supplier ASC LIMIT 1
        """, [topping])
        try:
            order_hat_id, supplier_id = cur.fetchone()
        except:  # topping out of stock
            return
        curr_order = Order(order_id, location, order_hat_id)
        self.Orders_DAO.insert(curr_order)

        # update quantity
        cur.execute("UPDATE HATS SET quantity = quantity -1 WHERE id = (?)", [order_hat_id])
        self._conn.commit()

        # update output file
        cur.execute("SELECT name FROM SUPPLIERS WHERE id = (?)", [supplier_id])
        supplier_name = cur.fetchone()[0]
        curr_output_entry = ",".join((topping, supplier_name, location))
        self.output_file_content += curr_output_entry + "\n"


    def insert_initial_data(self, hats, suppliers):
        for supplier in suppliers:
            curr_supplier = Supplier(*supplier)
            self.Suppliers_DAO.insert(curr_supplier)

        for hat in hats:
            curr_hat = Hat(*hat)
            self.Hats_DAO.insert(curr_hat)


repo = _Repository()
atexit.register(repo._close)
