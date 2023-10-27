import os
import sqlite3
import sys
from persistence import repo

output_file_path = None

def print_DB(db_path):
    conn = sqlite3.connect(db_path)
    cur = conn.cursor()
    cur.execute("SELECT * FROM HATS")
    print(cur.fetchall())
    cur.execute("SELECT * FROM SUPPLIERS")
    print(cur.fetchall())
    cur.execute("SELECT * FROM ORDERS")
    print(cur.fetchall())


def parse_config(path):
    with open(path) as input_f:
        lines = input_f.readlines()

    num_hats, num_suppliers = lines[0].split(",")  # strings
    num_hats, num_suppliers = int(num_hats), int(num_suppliers)
    lines = lines[1::]
    hats = []
    suppliers = []

    i = 0
    for line in lines:
        line = line.replace('\n', '')
        curr_line = line.split(",")
        if i < num_hats:
            hats.append(curr_line)
        else:
            suppliers.append(curr_line)
        i = i + 1

    return hats, suppliers


def parse_orders(path):
    orders = []
    with open(path) as input_f:
        lines = input_f.readlines()

    for line in lines:
        line = line.replace('\n', '')
        curr_line = line.split(",")
        orders.append(curr_line)

    return orders


def main(args):
    # python3 main.py config.txt orders.txt output.txt database.db
    #                   1           2           3           4
    if (len(args) < 5):
        print("please insert all the arguments:\n"
              "<config_file_path> <orders_file_path> <output_file_path> <dataBase_path>")
        return
    config_file_path = args[1]
    orders_file_path = args[2]
    global output_file_path
    output_file_path = args[3]
    dataBase_path = args[4]

    # init
    repo.set_database_path(dataBase_path)
    repo.create_tables()
    hats, suppliers = parse_config(config_file_path)
    orders = parse_orders(orders_file_path)
    repo.insert_initial_data(hats, suppliers)

    # execute
    repo.execute_orders(orders)
    write_output(repo.output_file_content)

def write_output(line):
    if(output_file_path is not None):
        f = open(output_file_path, "a+")
        f.write(str(line))


if __name__ == '__main__':
    main(sys.argv)
