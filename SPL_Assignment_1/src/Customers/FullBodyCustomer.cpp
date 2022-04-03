#include "../include/Action.h"
#include "../include/Customer.h"
#include "../include/Studio.h"
#include "../include/Trainer.h"
#include "../include/Workout.h"

FullBodyCustomer::FullBodyCustomer(std::string name, int id)
        : Customer(name, id) {};

std::vector<int> FullBodyCustomer::order(const std::vector<Workout> &workout_options) {

    std::vector<int> orders;
    //v[0] for Anaerobic, v[1] for mixed, v[2] for cardio
    std::vector<int> prices(3, -1);
    //extremePriceWorkoutIndex[0] for Anaerobic, extremePriceWorkoutIndex[1] for mixed, extremePriceWorkoutIndex[2] for cardio
    std::vector<int> extremePriceWorkoutIndex(3, -1);
    int counter = 0;

    //iterate workout options to find the cheapest cardio and anaerobic and the most expensive mixed
    for (auto &w: workout_options) {
        int type = w.getType();
        int price = w.getPrice();

        //anaerobic or cardio
        if (type == 0 || type == 2) {
            if (price < prices[type] || prices[type] == -1) {
                extremePriceWorkoutIndex[type] = counter;
                prices[type] = price;
            }
        } else {
            // mix
            if (price > prices[type]) {
                extremePriceWorkoutIndex[type] = counter;
                prices[type] = price;
            }
        }
        counter++;
    }
    for (int i = 2; i >= 0; i--) {
        if (extremePriceWorkoutIndex[i] != -1) {
            orders.push_back(workout_options[extremePriceWorkoutIndex[i]].getId());
            customerOrders.append(
                    this->getName() + " Is Doing " + workout_options[extremePriceWorkoutIndex[i]].getName() + "\n");
            workouts = workout_options[extremePriceWorkoutIndex[i]].getName() + " ";
            workouts.append(std::to_string(workout_options[extremePriceWorkoutIndex[i]].getPrice()) + "NIS " +
                            std::to_string(getId()) + "\n");
            ordersCost += workout_options[extremePriceWorkoutIndex[i]].getPrice();
        }
    }


    return orders;
};

std::string FullBodyCustomer::toString() const {
    return getName() + ",fbd";

};

std::string FullBodyCustomer::workoutsString() const {
    return workouts;
};

std::string FullBodyCustomer::NameIdString() const {
    std::string output = this->getName() + ", ";
    output += std::to_string(this->getId());
    return output;
};

std::string FullBodyCustomer::getType() {
    return "fbd";
};