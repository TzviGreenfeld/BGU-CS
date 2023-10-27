#include "Action.h"
#include "Customer.h"
#include "Studio.h"
#include "Trainer.h"
#include "Workout.h"
#include <vector>
#include "iostream"
#include <string>
using namespace std;
extern Studio* backup;

void SplitString(string s, vector <string> &v) {

    string temp = "";
    for (size_t i = 0; i < s.length(); ++i) {

        if (s[i] == ' ' || s[i] == ',') {
            v.push_back(temp);
            temp = "";
        } else {
            temp.push_back(s[i]);
        }

    }
    v.push_back(temp);

};

Studio *backup = nullptr;

int main(int argc, char **argv) {
    ///trainer rule of
//    Workout wo(3, "hi im workout", 18, MIXED);
//    CheapCustomer chp("hi im chip", 2);
//    vector<int> v = {3};
//    vector<Workout> opt = {wo};
//    Trainer a(1);
//    a.order(2,v,opt);
//    Trainer b(a);
//    Trainer c = a;
//    Trainer d(5);
//    d = a;
//    cout << "a: " << a.getCapacity() << a.getSalary()  << endl;
//    cout << "b: " << b.getCapacity() << endl;
//    cout << "c: " << c.getCapacity() << endl;
//    cout << "d: " << d.getCapacity() << endl;



    if (argc != 2) {
        std::cout << "usage: studio <config_path>" << std::endl;

        return 0;
    }
    string configurationFile = argv[1];
    Studio studio(configurationFile);
    studio.start();
    if (backup != nullptr) {
        delete backup;
        backup = nullptr;
    }

    // user inputs to perform action
    bool run = true;
    string userInput = "";
    while (run) {
        getline(cin, userInput);
        std::vector <std::string> separatedInput;
        SplitString(userInput,separatedInput);
        std::string firstWord = separatedInput[0];
        //* studio actions by syntax: *//
        if (userInput == "closeall"){
            run = false;
            CloseAll cls_all;
            cls_all.act(studio);
        } else if (firstWord == "open") {
            // openTrainer
            int trainerId = stoi(separatedInput[1]);
            vector <Customer*> customers;
            int i = studio.getNumOfCustomers();
            vector<string>::iterator it = separatedInput.begin() + 2;
            while (it != separatedInput.end()) {
                string customerName = *it;
                string customerType = *(it+1);

                if (customerType == "swt") {
                    SweatyCustomer *customerPtr = new SweatyCustomer(customerName,i);
                    customers.push_back(customerPtr);
                } else if (customerType == "chp") {
                    CheapCustomer *customerPtr = new CheapCustomer(customerName,i);
                    customers.push_back(customerPtr);
                } else if (customerType == "mcl") {
                    HeavyMuscleCustomer *customerPtr = new HeavyMuscleCustomer(customerName,i);
                    customers.push_back(customerPtr);
                } else if (customerType == "fbd") {
                    FullBodyCustomer *customerPtr = new FullBodyCustomer(customerName,i);
                    customers.push_back(customerPtr);
                }

                i++;
                it += 2;
                studio.increaseCustomerAmount(1);
            }
            OpenTrainer *ot;
            ot = new OpenTrainer(trainerId, customers);
            ot->act(studio);
            studio.recordAction(ot);
        }
        else if (firstWord == "order"){
            int trainerId = stoi(separatedInput[1]);
            Order *ord;
            ord = new Order(trainerId);
            ord->act(studio);
            studio.recordAction(ord);
        }
        else if (firstWord == "move"){
            // moveCustomer
            int originTrainerId = stoi(separatedInput[1]);
            int destTrainerId = stoi(separatedInput[2]);
            int customerId = stoi(separatedInput[3]);

            MoveCustomer *m_cstmr;
            m_cstmr = new MoveCustomer(originTrainerId, destTrainerId, customerId);
            m_cstmr->act(studio);
            studio.recordAction(m_cstmr);
        }
        else if (firstWord == "close"){
            int trainerId = stoi(separatedInput[1]);
            Close *cls;
            cls = new Close(trainerId);
            cls->act(studio);
            studio.recordAction(cls);
        }

        //info by syntax:
        else if (firstWord == "workout_options"){
            PrintWorkoutOptions *prnt_WO;
            prnt_WO = new PrintWorkoutOptions;
            prnt_WO->act(studio);
            studio.recordAction(prnt_WO);
        }
        else if (firstWord == "status"){
            int trainerId = stoi(separatedInput[1]);
            PrintTrainerStatus *prnt_TS;
            prnt_TS = new PrintTrainerStatus(trainerId);
            prnt_TS->act(studio);
            studio.recordAction(prnt_TS);
        }
        else if (firstWord == "log"){
            PrintActionsLog *prnt_AL;
            prnt_AL = new PrintActionsLog;
            prnt_AL->act(studio);
            studio.recordAction(prnt_AL);
        }
        else if (firstWord == "backup"){
            BackupStudio *bckp;
            bckp = new BackupStudio;
            bckp->act(studio);
            studio.recordAction(bckp);
        }
        else if (firstWord == "restore"){
            RestoreStudio *rstr_std;
            rstr_std = new RestoreStudio;
            rstr_std->act(studio);
            studio.recordAction(rstr_std);
        }

    }
    return 0;
}