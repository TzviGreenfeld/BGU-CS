#include <string>
#include <iostream>
#include "../include/Action.h"
#include "../include/Trainer.h"

PrintActionsLog::PrintActionsLog(){

};

void PrintActionsLog::act(Studio &studio){

    std::string st;
    for (auto & action: studio.getActionsLog()){
        st.append(action->toString()+"\n");
    }
    std::cout<<st<<std::endl;
    complete();
};
std::string PrintActionsLog::toString() const{
    return "PrintActionsLog completed";
};