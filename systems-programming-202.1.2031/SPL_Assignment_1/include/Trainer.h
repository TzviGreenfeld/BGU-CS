#include "Customer.h"

#ifndef TRAINER_H_
#define TRAINER_H_


typedef std::pair<int, Workout> OrderPair;

class Trainer {
public:
    Trainer(int t_capacity);

    int getCapacity() const;

    void addCustomer(Customer *customer);

    void removeCustomer(int id);

    Customer *getCustomer(int id);

    std::vector<Customer *> &getCustomers();

    std::vector <OrderPair> &getOrders();


    void order(const int customer_id, const std::vector<int> workout_ids, const std::vector <Workout> &workout_options);

    void openTrainer();

    void closeTrainer();

    int getSalary();

    bool isOpen();

    void addOrderPair(int, Workout);

    void addSalary(int);

    void subtractSalary(int);

    // rule of 5:
    ~Trainer();

    Trainer (const Trainer &otherTrainer);

    void operator=(const Trainer &otherTrainer);

    Trainer (Trainer&& otherTrainer);

    const Trainer & operator=(Trainer && otherTrainer);

//    const Trainer& operator=(Trainer &&otherTrainer);
private:
    int currentSalary;
    int capacity;
    bool open;
    std::vector<Customer *> customersList;
    std::vector <OrderPair> orderList; //A list of pairs for each order for the trainer - (customer_id, Workout)
};


#endif