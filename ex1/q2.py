from nearest_neighbour import learnknn, predictknn, gensmallm
import numpy as np
import random
import matplotlib.pyplot as plt


data = np.load('mnist_all.npz')

labels = [2, 3, 5, 6]
train_sampels = [data[f"train{i}"] for i in labels]
test_sampels = [data[f"test{i}"] for i in labels]
number_of_test_sampels = sum([len(s) for s in test_sampels])

def corrupt(data):
    m = data.shape[0]
    prcnt = 0.15
    indices = set()
    while len(indices) < int(m * prcnt):
        indices.add(random.randint(0, m - 1))

    for i in indices:
        curr_label = data[i]
        data[i] = np.random.choice([l for l in labels if l != curr_label])

    return data

def get_avg_err(m, k, corrupt_data=False):
    # m := sample size
    # k := number of nearest neighbors

    def get_one_error():
        (x_train, y_train) = gensmallm(train_sampels, labels, m)
        (x_test, y_test) = gensmallm(test_sampels, labels, number_of_test_sampels)

        if corrupt_data:
            y_train = corrupt(y_train)
            y_test = corrupt(y_test)
            
        classifier = learnknn(k, x_train, y_train)
        predicted = np.hstack(predictknn(classifier, x_test))
        error = np.mean(y_test != predicted)

        return error

    errors = [get_one_error() for i in range(10)]
    return (min(errors), max(errors), np.average(errors))
    

def plot_fixed_k_1():
    title = "MNIST 1-NN error as a function of sample size"

    sample_size = np.arange(10, 110, 10)
    err = [get_avg_err(m, 1) for m in sample_size]
    min_errors, max_errors, avg_errors = zip(*err)

    plt.figure(figsize=(10, 4))
    ax = plt.axes()
    ax.set(xlabel="sample size", ylabel="error",
           title=title,
           xticks=sample_size)

    min_errors = np.array(min_errors)
    max_errors = np.array(max_errors)
    avg_errors = np.array(avg_errors)

    plt.errorbar(x=sample_size, y=avg_errors,
                 yerr=[min_errors, max_errors],
                 elinewidth=2,
                 capsize=5,
                 fmt=" ")

    plt.plot(sample_size, avg_errors, linewidth=3)
    plt.legend(["Averege Error over 10 iterations", "Min/Max Error"])
    plt.savefig(f"{title}.png")


def plot_fixed_m_200(corrupt=False):
    title = "fixed m=200 MNIST error as function of k"

    ks = np.arange(1, 12, 1)
    err = [get_avg_err(200, k, corrupt_data=corrupt) for k in ks]
    min_errors, max_errors, avg_errors = zip(*err)

    plt.figure(figsize=(10, 4))
    ax = plt.axes()
    if corrupt:
        title += " (corrupted labels)"

    ax.set(xlabel="k", ylabel="error",
           title=title,
           xticks=ks)

    plt.errorbar(x=ks, y=avg_errors,
                 yerr=[min_errors, max_errors],
                 elinewidth=2,
                 capsize=5,
                 fmt=" ")

    plt.plot(ks, avg_errors, linewidth=3)
    plt.legend(["Averege Error over 10 interations",
               "Min/Max Error"], loc='best')
    plt.savefig(f"{title}.png")

plot_fixed_k_1() # 2.a
plot_fixed_m_200() # 2.e
plot_fixed_m_200(corrupt=True) # 2.f