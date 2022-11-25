import numpy as np
import matplotlib.pyplot as plt
from nearest_neighbour import learnknn, predictknn, gensmallm

data = np.load('mnist_all.npz', allow_pickle=True)


labels = [2,3,5,6]
train_sampels = [data[f"train{i}"] for i in labels]
test_sampels = np.concatenate([data[f"test{i}"] for i in labels])
test_lables = np.concatenate([np.full(data[f"test{val}"].shape[0], val) for val in labels]).reshape(-1, 1)

def corrupt_data(Y):
    global labels
    labels = np.float64(labels)
    m = Y.shape[0]
    prcnt = 0.15
    indices = np.random.randint(0, high=m, size=int(m * prcnt), dtype=int)
    
    for i in indices:
        curr_label = Y[i]
        Y[i] = np.random.choice([l for l in labels if l != curr_label])
    
    return Y

def get_avg_err(m, k, corrupt=False):
    global labels, train_sampels, test_sampels, test_lables
    print(f"m={m}")
    err = []
    for i in range(10):
        (X, Y) = gensmallm(train_sampels, labels, m)
        if corrupt:
            Y = corrupt_data(Y)
            
        classifier = learnknn(k, X, Y)
        predicted = np.array([classifier(sample) for sample in test_sampels]).reshape(-1, 1)
        curr_err = np.count_nonzero(np.array(test_lables != predicted)) / len(predicted)
        err.append(curr_err)

    return (min(err), max(err), sum(err)/10)

def plot_fixed_k_1(t):
    global labels, train_sampels, test_sampels, test_lables

    sample_size = np.arange(10, 110, 10)
    err = [get_avg_err(m,1) for m in sample_size]
    min_errors, max_errors, avg_errors = zip(*err)

    plt.figure(figsize = (10,4))
    ax = plt.axes()
    title = "MNIST 1-NN error as a function of sample size"
    ax.set(xlabel="sample size", ylabel= "error",
        title=title,
        xticks=sample_size);

    bar_width = 1
    for i, min_err, max_err in zip(sample_size, min_errors, max_errors):
        plt.bar(i - bar_width/2, min_err, color='red', alpha=0.5, width=bar_width)
        plt.bar(i + bar_width/2, max_err, color='black',  alpha=0.5, width=bar_width)

    plt.plot(sample_size, avg_errors, linewidth=3)
    plt.legend(["Averege Error over 10 iterations", "Min Error", "Max Error"])
    plt.savefig(f"{t}_{title}.png")


def plot_fixed_m_200(t,corrupt=False):
    global labels, train_sampels, test_sampels, test_lables

    ks = [i for i in range(1,12)]
    err = [get_avg_err(200, k, corrupt=corrupt) for k in ks]
    min_errors, max_errors, avg_errors = zip(*err)

    plt.figure(figsize = (10,4))
    ax = plt.axes()
    title = "fixed m=200 MNIST error as function of k"
    if corrupt:
        title += " (corrupted labels)"


    ax.set(xlabel="k", ylabel= "error",
        title=title,
        xticks=ks);

    # min/max error bars
    bar_width = 0.15
    for i, min_err, max_err in zip(ks, min_errors, max_errors):
        plt.bar(i - bar_width/2, min_err, color='red', alpha=0.5, width=bar_width)
        plt.bar(i + bar_width/2, max_err, color='black',  alpha=0.5, width=bar_width)

    plt.plot(ks, avg_errors, linewidth=3)
    plt.legend(["Averege Error over 10 interations", "Min Error", "Max Error"], loc='best')
    plt.savefig(f"{t}_{title}.png")





if __name__ == '__main__':
    for i in range(5):
        plot_fixed_k_1(i) # Q 2.a
        plot_fixed_m_200(i) # Q 2.e
        plot_fixed_m_200(i,corrupt=True) # Q 2.f
