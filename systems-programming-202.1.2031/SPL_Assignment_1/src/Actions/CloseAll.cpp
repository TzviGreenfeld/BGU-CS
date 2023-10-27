#include "../include/Action.h"
#include "../include/Customer.h"
#include "../include/Studio.h"
#include "../include/Trainer.h"
#include "../include/Workout.h"

#include <string>
#include <iostream>
using namespace std;

CloseAll::CloseAll() {

};
void CloseAll::act(Studio &studio) {

    for (int i = 0; i < studio.getNumOfTrainers(); i++) {
        if (studio.getTrainer(i)->isOpen()) {
            Close *close = new Close(i);
            close->act(studio);
            delete close;


            //strings of salary
            cout << close->toString() << endl;
        }
    }
    std::cout << "Studio is now closed!" << std::endl;
    complete();
};

std::string CloseAll::toString() const {
    return " Completed";
};