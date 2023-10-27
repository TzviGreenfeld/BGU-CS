#ifndef CUSTOMER_H_
#define CUSTOMER_H_

#include <vector>
#include <string>
#include "Workout.h"

class Customer {
public:
    Customer(std::string c_name, int c_id);

    virtual std::vector<int> order(const std::vector <Workout> &workout_options) = 0;

    virtual std::string toString() const = 0;

    virtual std::string toStringOrders();

    virtual std::string NameIdString() const = 0;

    virtual std::string workoutsString() const=0;

    std::string getName() const;

    virtual std::string getType()  = 0;

    int getId() const;

    int getOrdersCost();

protected:
    std::string customerOrders;
    std::string workouts;
    int ordersCost;

private:
    const std::string name;
    const int id;

};


class SweatyCustomer : public Customer {
public:
//    using Customer::Customer;
    SweatyCustomer(std::string , int );

    std::vector<int> order(const std::vector <Workout> &workout_options);

    std::string toString() const;

    std::string toStringOrders() const;

    std::string NameIdString() const;

    std::string workoutsString() const;

    std::string getType();
private:

};


class CheapCustomer : public Customer {
public:
    CheapCustomer(std::string , int );

    std::vector<int> order(const std::vector <Workout> &workout_options);

    std::string toString() const;

    std::string toStringOrders() const;

    std::string workoutsString() const;

    std::string NameIdString() const;

    std::string getType();

private:

};


class HeavyMuscleCustomer : public Customer {
public:
    HeavyMuscleCustomer(std::string , int );

    std::vector<int> order(const std::vector <Workout> &workout_options);

    std::string toString() const;

    std::string toStringOrders() const;

    std::string workoutsString() const;

    std::string NameIdString() const;

    std::string getType();
private:

};


class FullBodyCustomer : public Customer {
public:
    FullBodyCustomer(std::string , int );;

    std::vector<int> order(const std::vector <Workout> &workout_options);

    std::string toString() const;

    std::string toStringOrders() const;

    std::string workoutsString() const;

    std::string NameIdString() const;

    std::string getType();

private:

};


#endif