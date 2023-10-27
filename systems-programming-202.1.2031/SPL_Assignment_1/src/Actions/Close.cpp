#include "../include/Action.h"
#include "../include/Customer.h"
#include "../include/Studio.h"
#include "../include/Trainer.h"
#include "../include/Workout.h"

Close::Close(int id) : trainerId(id) {
};
void Close::act(Studio &studio) {
    actionInfo = "close " + std::to_string(trainerId);
    bool isLegal = true;
    if (studio.getNumOfTrainers() <= trainerId) {
        isLegal = false;
    };
    if (isLegal) {
        Trainer *trainer = studio.getTrainer(trainerId);
        if (trainer->isOpen()) {
            trainer->closeTrainer();
            trainerSalary = trainer->getSalary();
            actionInfo.append(" Completed");
        } else {
            isLegal = false;
        }
    }

    if (!isLegal) {
        error("Trainer does not exist or is not open");
        actionInfo.append("Error: "+getErrorMsg());
    }else {
        std::string output="Trainer " + std::to_string(trainerId) + " closed. Salary ";
        output.append(std::to_string(trainerSalary));
        output += "NIS";
        std::cout << output << std::endl;
        complete();
    }


};

std::string Close::toString() const {
    return actionInfo;
};
