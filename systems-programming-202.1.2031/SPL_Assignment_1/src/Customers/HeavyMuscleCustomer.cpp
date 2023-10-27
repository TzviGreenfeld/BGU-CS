#include "algorithm"
#include "../include/Action.h"
#include "../include/Customer.h"
#include "../include/Studio.h"
#include "../include/Trainer.h"
#include "../include/Workout.h"

using namespace std;

HeavyMuscleCustomer::HeavyMuscleCustomer(std::string name, int id)
        : Customer(name, id) {};

std::vector<int> HeavyMuscleCustomer::order(const std::vector<Workout> &workout_options) {
    std::vector<int> order;
    // vector of: pairs of pair: (workout price, (workout id, workout name) )
    std::vector<std::pair<int, std::pair<int, std::string>>> anaerobicWorkouts;
    for (auto &w: workout_options) {
        //if the workout type is anaerobic add it
        if (w.getType() == 0) {
            std::pair<int, std::string> idName = std::make_pair(w.getId(), w.getName());
            std::pair<int, std::pair<int, std::string>> priceIdName = std::make_pair(w.getPrice(), idName);
            anaerobicWorkouts.push_back(priceIdName);
        }
    }
    if (!anaerobicWorkouts.empty()) {
        //sort by prices
        std::sort(anaerobicWorkouts.begin(), anaerobicWorkouts.end());
        int size = anaerobicWorkouts.size();
        for (int i = size-1; i >= 0; i--) {
            order.push_back(anaerobicWorkouts[i].second.first);
            ordersCost += anaerobicWorkouts[i].first;
            customerOrders.append(
                    this->getName() + " Is Doing " + anaerobicWorkouts[i].second.second + "\n");
            workouts += anaerobicWorkouts[i].second.second + " ";
            workouts.append(
                    std::to_string(anaerobicWorkouts[i].first) + "NIS " + std::to_string(getId()) + "\n");
        }
    }

    return order;
};

std::string HeavyMuscleCustomer::toString() const {
    return getName() + ",mcl";

};

std::string HeavyMuscleCustomer::workoutsString() const {
    return workouts;
};

std::string HeavyMuscleCustomer::NameIdString() const {
    std::string output = this->getName() + ", ";
    output += std::to_string(this->getId());
    return output;
};

std::string HeavyMuscleCustomer::getType() {
    return "mcl";
};