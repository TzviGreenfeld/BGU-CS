#include "../include/Action.h"
#include "../include/Trainer.h"

#include "../include/Workout.h"
OpenTrainer::OpenTrainer(int id, std::vector<Customer *> &customersList)
    : trainerId(id), customers(customersList) {};

// case number of customers > trainer capacity is handled at Trainer.addCustomer
void OpenTrainer::act(Studio &studio) {
//TODO:case capacity smaller than num of customers


actionInfo="open "+std::to_string(trainerId);
actionInfo.append(" ");

    if (studio.getNumOfTrainers() > trainerId && !studio.getTrainer(trainerId)->isOpen()) {

        studio.getTrainer(trainerId)->openTrainer();
        for (auto &c: customers) {
            studio.getTrainer(trainerId)->addCustomer(c);
            actionInfo.append(c->toString()+" ");
        };

//        std::cout<<actionInfo<<std::endl; // was this necessary?
        actionInfo.append("Completed");
        complete();
    } else {
        error("Workout session does not exist or is already open");
        actionInfo.append("Error: "+getErrorMsg());

    };
};

std::string OpenTrainer::toString() const {

    return actionInfo;
};
