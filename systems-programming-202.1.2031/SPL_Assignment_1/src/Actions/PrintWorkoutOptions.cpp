#include "../include/Action.h"
#include "../include/Trainer.h"



PrintWorkoutOptions::PrintWorkoutOptions(){

};
void PrintWorkoutOptions::act(Studio &studio){

    for(auto & w: studio.getWorkoutOptions()){
        std::vector<std::string> enumNames = {"Anaerobic", "Mixed", "Cardio"};
        std::cout << w.getName() + ", " + enumNames[w.getType()] + ", " << std::to_string(w.getPrice()) + "NIS" << std::endl;
    }

    complete();
};
std::string PrintWorkoutOptions::toString() const{
    return "PrintWorkoutOptions completed";
};
