#ifndef STUDIO_H_
#define STUDIO_H_

#include <vector>
#include <string>
#include "Workout.h"
#include "Trainer.h"
#include "Action.h"

class BaseAction;

class Studio {
public:
    Studio();

    Studio(const std::string &configFilePath);

    void start();

    int getNumOfTrainers() const;

    Trainer *getTrainer(int tid);

    const std::vector<BaseAction *> &getActionsLog() const; // Return a reference to the history of actions

    std::vector <Workout> &getWorkoutOptions();

    void recordAction(BaseAction *);

    int getNumOfCustomers() const;

    void increaseCustomerAmount(int);

    //rule of 5:
    ~Studio();

    Studio(const Studio &otherStudio);

    void operator=(const Studio &otherStudio);

    Studio (Studio&& otherStudio);

private:
    bool open;
    std::vector<Trainer *> trainers;
    std::vector <Workout> workout_options;
    std::vector<BaseAction *> actionsLog;
    int numOfCustomers;

};


#endif
