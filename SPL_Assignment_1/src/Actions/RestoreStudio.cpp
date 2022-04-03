#include "../include/Action.h"
#include "iostream"
using namespace std;
extern Studio* backup;

RestoreStudio::RestoreStudio(){};
void RestoreStudio::act(Studio &studio){
    if (backup == nullptr){
    error("No backup available");
    }else{
        studio = *backup;
        backup = nullptr;
        for(auto &action : studio.getActionsLog()){
            action->act(studio);
        }
        complete();
    }
};
std::string RestoreStudio::toString() const{
    return "Studio restored";
};