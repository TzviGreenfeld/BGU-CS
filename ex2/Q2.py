import numpy as np
from cvxopt import solvers, matrix, spmatrix, spdiag, sparse
import matplotlib.pyplot as plt
from softsvm import softsvm

data = np.load('ex2q2_mnist.npz', allow_pickle=True)
trainX, testX = data['Xtrain'], data['Xtest']
trainY, testY = data['Ytrain'], data['Ytest']



def predict(w: np.array, testX: np.array):
    """
    :param w: linear predictor: numpy array of shape (d, 1)
    :param testX: samples to calssify: numpy array of shape (m, d)
    :return: predictions: numpy array of shape (m, 1)
    """
    return np.array([[np.sign(example @ w) for example in testX]])


def error(real_labels, predicted_labels):
    """
    :return: average of difference between two np arrays of shape (1,m)
    """
    return np.mean(real_labels != predicted_labels)


def get_random_sample(m: int, trainX: np.array, trainY: np.array):
    """
    :param m: sample size
    :param trainX: all samples: numpy array of shape (k >= m, d)
    :param: trainY: all labels: numpy array of shape (k >=m, 1)
    :return: _trainX, _trainY: samples and ther labels. numpy arrays of shape (m, d), (m, 1)  
    """
    indices = np.random.permutation(trainX.shape[0])
    _trainX = trainX[indices[:m]]
    _trainY = trainY[indices[:m]]
    return (_trainX, _trainY)


def get_single_error(m, l):
    """
    :param m: sample size
    :param l: the parameter lambda of the soft SVM algorithm
    :return: tuple of error on train set, error on test set
    """
    _trainX, _trainY = get_random_sample(m, trainX, trainY)
    w = softsvm(l, _trainX, _trainY)

    train_error = error(_trainY, predict(w, _trainX).flatten())

    test_error = error(testY, predict(w, testX).flatten())

    return (train_error, test_error)


def get_avg_error(m: int, log_lambdas: np.array, times: int):
    """
    :param m: sample size
    :param lambdas: the parameter lambda of the soft SVM algorithm
    :param times: number of times to test for each lambda
    :return: dictionary of all the calculated values needed to plot
    """
    lambdas = np.power(10, log_lambdas)

    # errors.shape == (l, times)
    # errors[i][j][0] = train error of the j'th time we ran the expirement with lambdas[i]
    # errors[i][j][1] = test error of the j'th time we ran the expirement with lambdas[i]
    errors = np.array([[get_single_error(m, l)
                      for i in range(times)] for l in lambdas])
    train_errors = errors[:, :, 0]
    test_errors = errors[:, :, 1]

    # train_min_values[i] is the minimum train error with lambas[i]
    train_min_values = np.min(train_errors, axis=1)
    train_max_values = np.max(train_errors, axis=1)
    train_avg_values = np.mean(train_errors, axis=1)

    test_min_values = np.min(test_errors, axis=1)
    test_max_values = np.max(test_errors, axis=1)
    test_avg_values = np.mean(test_errors, axis=1)

    return {
        "log_lambdas": log_lambdas,
        "train_min_values": train_min_values,
        "train_max_values": train_max_values,
        "train_avg_values": train_avg_values,
        "test_min_values": test_min_values,
        "test_max_values": test_max_values,
        "test_avg_values": test_avg_values
    }


def plot(exp1_calc: dict, exp2_calc: dict, title: str):

    plt.figure(figsize=(10, 4))
    ax = plt.axes()
    ax.set(xlabel="log λ", ylabel="error",
           title=title,
           xticks=exp1_calc["log_lambdas"])
           
    # first experiment
    capsize, alpha = 3, 0.8
    plt.errorbar(x=exp1_calc["log_lambdas"] + 0.025, y=exp1_calc["train_avg_values"],
                 yerr=[exp1_calc["train_min_values"],
                       exp1_calc["train_max_values"]],
                 label="Train sample average error", capsize=capsize, alpha=alpha)

    plt.errorbar(x=exp1_calc["log_lambdas"] - 0.025, y=exp1_calc["test_avg_values"],
                 yerr=[exp1_calc["test_min_values"],
                       exp1_calc["test_max_values"]],
                 label="Test sample average error", capsize=capsize, alpha=alpha)

    # second experiment
    plt.scatter(exp2_calc["log_lambdas"],
                exp2_calc["train_avg_values"], label="Train error")
    plt.scatter(exp2_calc["log_lambdas"],
                exp2_calc["test_avg_values"], label="Test error")
    plt.legend(loc="best")
    plt.savefig(f"{title}.png")


def Q2():
    experiment1 = get_avg_error(100, np.arange(1, 11), 10)
    experiment2 = get_avg_error(1000, [1, 3, 5, 8], 1)
    plot(experiment1, experiment2,  "SVM error as function of λ")


if __name__ == '__main__':
    Q2()

