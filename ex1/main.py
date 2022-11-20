import numpy as np
import matplotlib.pyplot as plt
from nearest_neighbour import learnknn, predictknn, gensmallm
data = np.load('mnist_all.npz', allow_pickle=True)


def get_avg_err(m, k, train_samples, test_samples):
    # print(f"m={m}")
    err = []
    for i in range(10):
        (X, Y) = gensmallm(train_sampels, labels, m)
        classifier = learnknn(k, X, Y)
        predicted = np.array([classifier(sample) for sample in test_sampels]).reshape(-1, 1)
        curr_err = np.count_nonzero(np.array(test_lables != predicted)) / len(predicted)
        err.append(curr_err)

    return (min(err), max(err), sum(err)/10)

def plot_fixed_k_1():
    sample_size = np.arange(10, 110, 10)
    err = [get_avg_err(m,1) for m in sample_size]
    min_errors, max_errors, avg_errors = zip(*err)

    plt.figure(figsize = (10,4))
    ax = plt.axes()
    ax.set(xlabel="sample size", ylabel= "error",
        title="MNIST 1-NN error as a function of sample size",
        xticks=sample_size);

    bar_width = 1
    for i, min_err, max_err in zip(sample_size, min_errors, max_errors):
        plt.bar(i - bar_width/2, min_err, color='red', alpha=0.5, width=bar_width)
        plt.bar(i + bar_width/2, max_err, color='black',  alpha=0.5, width=bar_width)

    plt.plot(sample_size, avg_errors, linewidth=3)
    plt.legend(["Averege Error over 10 iterations", "Min Error", "Max Error"])
    plt.show()


def plot_fixed_m_200():
    ks = [i for i in range(1,12)]
    errors = [get_avg_err(200, k) for k in ks]
    min_err, max_err, avg_err = zip(*errors)
    
    plt.figure(figsize = (10,4))
    ax = plt.axes()
    ax.set(xlabel="k", ylabel= "error",
        title="fixed m=200 MNIST error as function of k",
        xticks=ks);

    # min/max error bars
    bar_width = 0.15
    for i, min_err, max_err in zip(ks, min_err, max_err):
        plt.bar(i - bar_width/2, min_err, color='red', alpha=0.5, width=bar_width)
        plt.bar(i + bar_width/2, max_err, color='black',  alpha=0.5, width=bar_width)

    plt.plot(ks, avg_err, linewidth=3)
    plt.legend(["Averege Error over 10 interations", "Min Error", "Max Error"], loc='best')
    plt.show()




if __name__ == '__main__':
    k = 1
    x_train = np.array([[1,2], [3,4], [5,6]])
    y_train = np.array([1, 0, 1])
    classifier = learnknn(k, x_train, y_train)
    x_test = np.array([[10,11], [3.1,4.2], [2.9,4.2], [5,6]])
    y_testprediction = predictknn(classifier, x_test)
    print(y_testprediction)
    # print(y_testprediction == [1, 0, 0, 1])