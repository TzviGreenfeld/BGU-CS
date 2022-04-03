#include "../include/Action.h"
#include "../include/Trainer.h"


PrintTrainerStatus::PrintTrainerStatus(int id):trainerId(id){

};
void PrintTrainerStatus::act(Studio &studio){

    actionInfo="PrintTrainerStatus "+std::to_string(trainerId);
    actionInfo.append(" completed");
    std::string trainerStatus;

    if(studio.getTrainer(trainerId)->isOpen()){
        std::string customersNameId;
        std::string customersOrdersId;
        Trainer *trainer=studio.getTrainer(trainerId);

        for(auto & c:trainer->getCustomers()){
                customersNameId.append(""+std::to_string(c->getId()));
                customersNameId.append(" "+c->getName());
                customersNameId.append("\n");
                customersOrdersId.append(c->workoutsString());
        }
        trainerStatus="Trainer "+std::to_string(trainerId);
        trainerStatus.append(" status: open\n");
        trainerStatus.append("Customers:\n"+customersNameId);
        trainerStatus.append("Orders:\n"+customersOrdersId);
        trainerStatus.append("Current trainers salary is:"+std::to_string(trainer->getSalary())+"NIS");

    }else{
        trainerStatus="Trainer "+std::to_string(trainerId);
        trainerStatus.append(" status: closed");
    }
    std::cout<<trainerStatus<<std::endl;
    complete();
};
std::string PrintTrainerStatus::toString() const{
    return actionInfo;
};

