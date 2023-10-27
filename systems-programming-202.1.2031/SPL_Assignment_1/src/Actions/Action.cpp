#include <string>
#include <iostream>
#include "../include/Action.h"
#include "../include/Customer.h"
#include "../include/Studio.h"
#include "../include/Trainer.h"
#include "../include/Workout.h"

BaseAction::BaseAction() {};
ActionStatus BaseAction::getStatus() const{
    return status;
};

void BaseAction::complete() {
    this->status = COMPLETED;

};

void BaseAction::error(std::string errorMsg) {
    status = ERROR;
    this->errorMsg = errorMsg;
    std::cout <<"Error: " <<errorMsg << std::endl;
};

std::string BaseAction::getErrorMsg() const {
    return this->errorMsg;
};
