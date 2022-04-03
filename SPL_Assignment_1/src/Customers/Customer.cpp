
#include <Customer.h>

#include "../include/Trainer.h"


//Customer::Customer: name(""), id(0)()
//{
//};
Customer::Customer(std::string c_name, int c_id)
    : name(c_name), id(c_id), ordersCost(0) {};

std::string Customer::getName() const {
    return name;
};

int Customer::getId() const {
    return id;
};

int Customer::getOrdersCost() {
    return ordersCost;
}

std::string Customer::toStringOrders() {
    if (!customerOrders.empty()){
        customerOrders.pop_back();
    }
    return customerOrders;
};


