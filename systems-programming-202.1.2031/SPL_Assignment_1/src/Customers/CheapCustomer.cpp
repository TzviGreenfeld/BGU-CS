#include "iostream"
#include "../include/Trainer.h"
#include "../include/Customer.h"

using namespace std;

CheapCustomer::CheapCustomer(std::string name, int id)
        : Customer(name, id) {
};

std::vector<int> CheapCustomer::order(const std::vector<Workout> &workout_options) {

    std::vector<int> orders;
    //index = the cheapest options we found till now
    //counter = current index
    int price = -1;
    int index = 0;
    int counter = 0;

    //iterate workout options to find the cheapest
    for (auto &w: workout_options) {
        //if there is cheaper o
        if (w.getPrice() < price || price == -1) {
            index = counter;
            price = w.getPrice();
        }
        counter++;
    }
    //order the cheapest workout
    orders.push_back(workout_options[index].getId());
    customerOrders.append(getName() + " Is Doing " + workout_options[index].getName() + "\n");
    ordersCost += workout_options[index].getPrice();
    workouts += workout_options[index].getName() + " ";
    workouts.append(std::to_string(workout_options[index].getPrice()) + "NIS " + std::to_string(getId()) + "\n");
    return orders;
};

std::string CheapCustomer::toString() const {
    return getName() + ",chp";

};

std::string CheapCustomer::workoutsString() const {
    return workouts;
};

std::string CheapCustomer::NameIdString() const {
    std::string output = this->getName() + ", ";
    output += std::to_string(this->getId());
    return output;
};

std::string CheapCustomer::getType() {
    return "chp";
};