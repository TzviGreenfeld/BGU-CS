#include "../include/Action.h"
#include "../include/Trainer.h"
#include <iostream>
#include <vector>

using namespace std;

Order::Order(int id)
        : trainerId(id) {};

void Order::act(Studio &studio) {
    Trainer* trainer = studio.getTrainer(trainerId);
    //input validation:
    if(trainer == nullptr || ! trainer->isOpen()){
        error("Trainer does not exist or is not open");
    }else{
        vector<Workout> workoutOptions = studio.getWorkoutOptions();
        // each customer of given trainer
        for (auto & currCustomer : trainer->getCustomers()){
            vector<int> currCustomerWorkoutIds = currCustomer->order(workoutOptions);
            trainer->order(currCustomer->getId(), currCustomerWorkoutIds, workoutOptions);
            std::cout << currCustomer->toStringOrders() << std::endl;

        }
        complete();
    }
    actionInfo = "order " + std::to_string(trainerId);
};

std::string Order::toString() const {
    if (this->getStatus() == COMPLETED) {
        return actionInfo + " completed";
    }
    return actionInfo + " Error: " + getErrorMsg();
};