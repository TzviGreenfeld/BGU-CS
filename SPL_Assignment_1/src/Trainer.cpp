#include <vector>
#include <vector>
#include <algorithm>
#include "../include/Trainer.h"
#include "../include/Workout.h"
#include "iostream"
using namespace std;

//* rule of 5*//
//destructor:
Trainer::~Trainer(){
    for(int i = 0; i < customersList.size(); ++i){
        delete customersList[(int)i];
    }
};

//copy constructor:
Trainer::Trainer (const Trainer &otherTrainer){
    currentSalary = otherTrainer.currentSalary;
    capacity = otherTrainer.capacity;
    open = otherTrainer.open;
    for(auto &pair : otherTrainer.orderList){
        Workout currWorkout(pair.second.getId(),
                            pair.second.getName(),
                            pair.second.getPrice(),
                            pair.second.getType());
        orderList.push_back(OrderPair (pair.first, currWorkout));
    }
    customersList = vector<Customer*>();
    for( int i = 0; i < otherTrainer.customersList.size(); ++i){
        customersList.insert(customersList.begin() + i, otherTrainer.customersList[i]);
    }
}

// copy assignment operator:
void Trainer::operator=(const Trainer &otherTrainer){
    if(&otherTrainer != this){
        currentSalary = otherTrainer.currentSalary;
        capacity = otherTrainer.capacity;
        open = otherTrainer.open;
        orderList.clear();
        for(auto &pair : otherTrainer.orderList){
            Workout currWorkout(pair.second.getId(),
                                pair.second.getName(),
                                pair.second.getPrice(),
                                pair.second.getType());
            orderList.push_back(OrderPair (pair.first, currWorkout));
        }
        for(int i = 0; i < customersList.size(); ++i){
            delete customersList[(int)i];
            customersList.insert(customersList.begin() + (int)i, otherTrainer.customersList[(int)i]);
        }
    }
}

//move constructor:
Trainer::Trainer (Trainer&& otherTrainer){
    if(&otherTrainer != this){
        currentSalary = otherTrainer.currentSalary;
        capacity = otherTrainer.capacity;
        open = otherTrainer.open;
        orderList.clear();
        for(auto &pair : otherTrainer.orderList){
            Workout currWorkout(pair.second.getId(),
                                pair.second.getName(),
                                pair.second.getPrice(),
                                pair.second.getType());
            orderList.push_back(OrderPair (pair.first, currWorkout));
        }
        for(int i = 0; i < customersList.size(); ++i){
            customersList.insert(customersList.begin() + (int)i, otherTrainer.customersList[(int)i]);
            otherTrainer.customersList[(int)i] = nullptr;
        }
    }
};

//move assignment operator:
const Trainer& Trainer::operator=(Trainer && otherTrainer){
    for(int i = 0; i < customersList.size(); ++i){
        customersList.insert(customersList.begin() + (int)i, otherTrainer.customersList[(int)i]);
        otherTrainer.customersList[(int)i] = nullptr;
    }
};

// constructor
Trainer::Trainer(int t_capacity){
    capacity = t_capacity;
    open = false;
    currentSalary = 0;
};

void Trainer::addOrderPair(int customer_id, Workout workoutType) {
    orderList.push_back(std::make_pair(customer_id, workoutType));
};

int Trainer::getCapacity() const {
    return capacity;
};

int Trainer::getSalary()  {
    return currentSalary;
};

void Trainer::addCustomer(Customer *customer) {
    if (customersList.size() < (unsigned) capacity) {
        customersList.push_back(customer);
    }
};

void Trainer::removeCustomer(int id) {
    int i = 0;
    std::vector <OrderPair> tempOrderList;
    while (i < customersList.size()) {
        if (customersList[i]->getId() == id) {
            customersList.erase(customersList.begin() + i);
        } else {
            i++;
        }
    }
        for (auto & pair : orderList) {
            if (!(pair.first == id)) {
                tempOrderList.push_back(pair);
            }
        }
        orderList.swap(tempOrderList);
        tempOrderList.clear();
};

Customer *Trainer::getCustomer(int id) {
//    Customer output;
    for (auto &customer: customersList) {
        if (customer->getId() == id) {
            return (customer);
        }
    }
    return nullptr;
    //TODO: implement something to check the input and return error?

};

std::vector<Customer *> &Trainer::getCustomers() {
  return customersList;
};

std::vector <OrderPair> &Trainer::getOrders() {
    return orderList;
};

void Trainer::order(const int customer_id, const std::vector<int> workout_ids, const std::vector <Workout> &workout_options){
    for(unsigned int i = 0; i < workout_ids.size(); ++i){
        addOrderPair(customer_id, workout_options[workout_ids[i]]);
        currentSalary += workout_options[workout_ids[i]].getPrice();
    }
};


void Trainer::openTrainer(){
    open = true;
};

void Trainer::closeTrainer(){
    orderList.clear();
    customersList.clear();
    open = false;
};

bool Trainer::isOpen(){
    return open;
};

void Trainer::addSalary(int bonus){
    currentSalary += bonus;
};

void Trainer::subtractSalary(int fine) {
  currentSalary -= fine;
};




