#include "../include/Action.h"
#include "../include/Customer.h"
#include "../include/Studio.h"
#include "../include/Trainer.h"
#include "../include/Workout.h"

SweatyCustomer::SweatyCustomer(std::string name, int id)
        : Customer(name, id) {};

std::vector<int> SweatyCustomer::order(const std::vector<Workout> &workout_options) {
    std::vector<int> order;
    for (auto &w: workout_options) {
        //if the workout type is cardio add it
        if (w.getType() == 2) {
            order.push_back(w.getId());
            ordersCost += w.getPrice();
            customerOrders.append(this->getName() + " Is Doing " + w.getName() + "\n");
            workouts = w.getName() + " ";
            workouts.append(std::to_string(w.getPrice()) + "NIS " + std::to_string(getId()) + "\n");

        }
    }
    return order;
};

std::string SweatyCustomer::toString() const {
    return this->getName() + ",swt";
};

std::string SweatyCustomer::workoutsString() const {
    return workouts;
};

std::string SweatyCustomer::NameIdString() const {
    std::string output = this->getName() + ", ";
    output += std::to_string(this->getId());
    return output;
}

std::string SweatyCustomer::getType() {
    return "swt";
};