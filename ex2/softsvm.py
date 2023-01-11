import numpy as np
from cvxopt import solvers, matrix, spmatrix, spdiag, sparse
import matplotlib.pyplot as plt


# todo: complete the following functions, you may add auxiliary functions or define class to help you
data = np.load('ex2q2_mnist.npz')
trainX, testX = data['Xtrain'], data['Xtest']
trainY, testY = data['Ytrain'], data['Ytest']


def softsvm(l, trainX: np.array, trainy: np.array):
    """
    :param l: the parameter lambda of the soft SVM algorithm
    :param trainX: numpy array of size (m, d) containing the training sample
    :param trainy: numpy array of size (m, 1) containing the labels of the training sample
    :return: linear predictor w, a numpy array of size (d, 1)
    """
    # zTHz + <u,z> s.t. Az >= v
    m, d = trainX.shape
    u = np.hstack((np.full(d, 0), np.full(m, 1/m)))

    H = np.pad(2.0 * l * np.identity(d), [(0, m), (0, m)])
    H = fix_small_eigvals(H)

    A = np.block([[np.zeros((m, d)), np.identity(m)],
                  [trainX * trainy.reshape(-1, 1), np.identity(m)]])

    v = np.hstack((np.zeros(m), np.ones(m)))
    z = solvers.qp(matrix(H), matrix(u), -matrix(A), -matrix(v))
    w = np.array(z["x"])[:d]
    return w


def simple_test():
    # load question 2 data
    data = np.load('ex2q2_mnist.npz')
    trainX = data['Xtrain']
    testX = data['Xtest']
    trainy = data['Ytrain']
    testy = data['Ytest']

    m = 100
    d = trainX.shape[1]

    # Get a random m training examples from the training set
    indices = np.random.permutation(trainX.shape[0])
    _trainX = trainX[indices[:m]]
    _trainy = trainy[indices[:m]]

    # run the softsvm algorithm
    w = softsvm(10, _trainX, _trainy)

    # tests to make sure the output is of the intended class and shape
    assert isinstance(
        w, np.ndarray), "The output of the function softsvm should be a numpy array"
    assert w.shape[0] == d and w.shape[
        1] == 1, f"The shape of the output should be ({d}, 1)"

    # get a random example from the test set, and classify it
    i = np.random.randint(0, testX.shape[0])
    predicty = np.sign(testX[i] @ w)

    # this line should print the classification of the i'th test sample (1 or -1).
    print(f"The {i}'th test sample was classified as {predicty}")

# functions to use across the entire assignment


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


def fix_small_eigvals(M: np.array):
    """
    given a matrix M that sould be positive definite,
    make sure it reallt is by adding small value to the main diagonal
    """
    # epsilon = np.finfo(np.float64).eps
    epsilon = 0.01
    while min(np.linalg.eigvals(M)) <= 0:
        M = M + (epsilon * np.eye(M.shape[0]))


    return M


def error(real_labels, predicted_labels):
    """
    :return: average of difference between two np arrays of shape (1,m)
    """
    # if the shapes dont match, try to reshape
    if real_labels.shape != predicted_labels.shape:
        try:
            predicted_labels = predicted_labels.reshape(real_labels.shape)
        except:
            raise ValueError(
                f"real_labels and predicted_labels must be of the same shape. got {real_labels.shape} and {predicted_labels.shape}")
        

    return np.mean(real_labels != predicted_labels)


def predict(w: np.array, testX: np.array):
    """
    :param w: linear predictor: numpy array of shape (d, 1)
    :param testX: samples to calssify: numpy array of shape (m, d)
    :return: predictions: numpy array of shape (m, 1)
    """
    return np.array([[np.sign(example @ w) for example in testX]])


def Q2():
    data = np.load('ex2q2_mnist.npz', allow_pickle=True)
    trainX, testX = data['Xtrain'], data['Xtest']
    trainY, testY = data['Ytrain'], data['Ytest']

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

    def plot(exp1_calc: dict, exp2_calc: dict, title: str, plot_large_m: bool = False):

            plt.figure(figsize=(10, 4))
            ax = plt.axes()
            ax.set(xlabel="log λ", ylabel="error",
                title=title,
                xticks=exp1_calc["log_lambdas"])

            # first experiment
            capsize, alpha = 3, 0.8
            params = {capsize
                    }
            plt.errorbar(x=exp1_calc["log_lambdas"] + 0.025, y=exp1_calc["train_avg_values"],
                        yerr=[exp1_calc["train_min_values"],
                            exp1_calc["train_max_values"]],
                        label="Train sample average error", capsize=capsize, alpha=alpha)

            plt.errorbar(x=exp1_calc["log_lambdas"] - 0.025, y=exp1_calc["test_avg_values"],
                        yerr=[exp1_calc["test_min_values"],
                            exp1_calc["test_max_values"]],
                        label="Test sample average error", capsize=capsize, alpha=alpha)

            # second experiment
            if plot_large_m:
                plt.scatter(exp2_calc["log_lambdas"],
                            exp2_calc["train_avg_values"], label="Train error")
                plt.scatter(exp2_calc["log_lambdas"],
                            exp2_calc["test_avg_values"], label="Test error")

            plt.legend(loc="best")
            # plt.show()
            title = "_".join(title.split('\n'))
            plt.savefig(f"{title}.png")

    def solve_Q2():
        experiment1 = get_avg_error(100, np.arange(1, 11), 10)
        experiment2 = get_avg_error(1000, [1, 3, 5, 8], 1)

        plot(experiment1, experiment2, title="SVM error as function of λ\nSmall m") # 2.a
        plot(experiment1, experiment2, title="SVM error as function of λ\nwith large m", plot_large_m=True) # 2.b

    solve_Q2()


if __name__ == '__main__':
    # before submitting, make sure that the function simple_test runs without errors
    simple_test()

    # here you may add any code that uses the above functions to solve question 2
    Q2()
