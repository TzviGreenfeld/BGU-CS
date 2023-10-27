#include <iostream>
#include <vector>
#include <fstream>
#include <unordered_map>
#include "../include/Action.h"
#include "../include/Customer.h"
#include "../include/Studio.h"
#include "../include/Trainer.h"
#include "../include/Workout.h"


using namespace std;

// forward declaration
int toInt(std::string);
WorkoutType toEnum(std::string);
std::vector <string> separateByChar(string, char);


// empty constructor to init empty fields vectors
Studio::Studio() {
    // the header init empty vectors
};

//* rule of 5 *//
//destructor:
Studio::~Studio() {
    for (int i = 0; i < trainers.size(); ++i) {
        delete (trainers[i]);
    }
    for ( int i = 0; i < actionsLog.size(); ++i) {
        delete (actionsLog[i]);
    }
};

//copy constructor
Studio::Studio(const Studio &otherStudio) {
    open = otherStudio.open;
    std::vector <Workout> workout_options;
    workout_options = otherStudio.workout_options;
    numOfCustomers = otherStudio.numOfCustomers;
    for( int i = 0; i < otherStudio.trainers.size(); ++i) {
        trainers.insert(trainers.begin() + (int)i, otherStudio.trainers[(int)i]);
    }
    for( int i = 0; i < otherStudio.actionsLog.size(); ++i) {
        actionsLog.insert(actionsLog.begin() + i, otherStudio.actionsLog[i]);
    }

};

//copy assignment operator:
void Studio::operator=(const Studio &otherStudio){
    open = otherStudio.open;
    workout_options = otherStudio.workout_options;
    numOfCustomers = otherStudio.numOfCustomers;

    for( int i = 0; i < otherStudio.trainers.size(); ++i) {
        delete trainers[i];
        trainers.insert(trainers.begin() + i, otherStudio.trainers[i]);
//        delete otherStudio.trainers[i];
    }
    for( int i = 0; i < otherStudio.actionsLog.size(); ++i) {
        delete actionsLog[i];
        actionsLog.insert(actionsLog.begin() + i, otherStudio.actionsLog[i]);
//        delete otherStudio.actionsLog[i];
    }
}

//move constructor:
Studio::Studio (Studio&& otherStudio){
    open = otherStudio.open;
    numOfCustomers = otherStudio.numOfCustomers;
    workout_options = otherStudio.workout_options;
    for( int i = 0; i < otherStudio.trainers.size(); ++i) {
        delete trainers[i];
        trainers.insert(trainers.begin() + i, otherStudio.trainers[i]);
    }
    for( int i = 0; i < otherStudio.actionsLog.size(); ++i) {
        delete actionsLog[i];
        actionsLog.insert(actionsLog.begin() + i, otherStudio.actionsLog[i]);
        otherStudio.actionsLog[i] = nullptr;
    }
};

//move assignment operator:

//constructor:
Studio::Studio(const std::string &configFilePath) {
    numOfCustomers = 0;
    this->open = false;

// read configfile
    fstream configFile;
    configFile.open(configFilePath, ios::in);
    vector <string> lines;
    if (configFile.is_open()) {
        string line;

        while (getline(configFile, line)) {
            // ignoring empty lines and comments
            if (!(line[0] == '#' || line == "")) {
                lines.push_back(line);
            }
        }
    }

    configFile.close();

    // interpret vector of strings to actual configFile values:
    string capacities = lines[1];

    // the rest of the vector is Workout options
    lines.erase(lines.begin());
    lines.erase(lines.begin());

    /* capacities */
    // separate capacities and convert to int:
    vector<int> capacityValues;
    vector <string> separatedCapacities = separateByChar(capacities, ',');
    for (auto &capacity: separatedCapacities) {
        capacityValues.push_back(toInt(capacity));
    }

    /* work options */
    // each option is in a form of: name,type,price
    vector <string> &workoutOptions = lines;
    vector <string> names;
    vector <WorkoutType> types;
    vector<int> prices;

    for (auto &option: workoutOptions) {
        names.push_back(separateByChar(option, ',')[0]);
        types.push_back(toEnum(separateByChar(option, ',')[1]));
        prices.push_back(toInt(separateByChar(option, ',')[2]));
    }

    /* initializing objects */
    // trainers init:
    for (auto &capacity: capacityValues) {
        trainers.push_back(new Trainer(capacity));
    }
    // workouts init
    for (int i = 0; i < workoutOptions.size(); ++i) {
        workout_options.push_back(
                Workout(i, names[i], prices[i], types[i])
        );
    }
};

void Studio::start() {
    open = true;
    std::cout << "Studio is now open!" << std::endl;
};

int Studio::getNumOfTrainers() const {
    return trainers.size();
};

Trainer *Studio::getTrainer(int tid) {
// assuming each trainer id is its index in vector trainers
    int trainerId = tid;
    if (trainerId > getNumOfTrainers()) {
        return nullptr;
    }
    return trainers[tid];
};

const std::vector<BaseAction *> &Studio::getActionsLog() const {
    return actionsLog;
};

std::vector <Workout> &Studio::getWorkoutOptions() {
    return workout_options;
};

void Studio::recordAction(BaseAction* action) {
    actionsLog.push_back(action);
};

int Studio::getNumOfCustomers() const{
    return numOfCustomers;
}

void Studio::increaseCustomerAmount(int i){
    numOfCustomers += i;
}


//* general functions  used in this file *//
vector <string> separateByChar(string str, char sep) {
    if (str.back() != sep) {
        str += sep;
    }
    vector <string> output;
    while (str != "") {

        std::size_t pos = str.find(sep);
        if (pos != std::string::npos) {
            string currValue = str.substr(0, pos);
            output.push_back(currValue);
            str.erase(0, pos + 1);
        }
    }
    return output;
};

WorkoutType toEnum(std::string str) {

    static std::unordered_map <std::string, WorkoutType> const table =
            {{" Anaerobic", WorkoutType::ANAEROBIC},
             {" Mixed",     WorkoutType::MIXED},
             {" Cardio",    WorkoutType::CARDIO}};
    auto it = table.find(str);
    return it->second;
};

int toInt(std::string str) {
    // this function created for readability purposes
    return stoi(str);
};

