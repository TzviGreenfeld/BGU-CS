#include "../include/Action.h"
#include "../include/Trainer.h"


using namespace std;

MoveCustomer::MoveCustomer(int src, int dst, int customerId)
        : srcTrainer(src), dstTrainer(dst), id(customerId) {
    actionInfo="move "+srcTrainer;
    actionInfo.append(" "+dstTrainer);
    actionInfo.append(" "+id);
};

void MoveCustomer::act(Studio &studio) {

    bool legalAction = true;

    if (srcTrainer >= studio.getNumOfTrainers() || dstTrainer >= studio.getNumOfTrainers()) {
        legalAction = false;

    };

    if (legalAction) {
        Trainer *srcT = studio.getTrainer(srcTrainer);
        Trainer *dstT = studio.getTrainer(dstTrainer);
        legalAction = false;

        for (auto &c: studio.getTrainer(srcTrainer)->getCustomers()) {
            if (c->getId() == id) {
                legalAction = true;
            }
            if (legalAction)
                break;
        }
        if (legalAction) {
            int customerPayment = srcT->getCustomer(id)->getOrdersCost();
            dstT->addCustomer(srcT->getCustomer(id));
            dstT->addSalary(customerPayment);
            srcT->removeCustomer(id);
            srcT->subtractSalary(customerPayment);
            actionInfo.append(" completed");
            complete();
        } else {
            error("Cannot move customer");
            actionInfo.append(" Error: "+getErrorMsg());
        }

    }
};

std::string MoveCustomer::toString() const {

    return actionInfo;

};






