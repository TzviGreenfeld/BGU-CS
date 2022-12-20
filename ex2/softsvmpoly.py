import numpy as np
from cvxopt import solvers, matrix, spmatrix, spdiag, sparse
import matplotlib.pyplot as plt
from softsvm import fix_small_eigvals

data = np.load('ex2q4_data.npz', allow_pickle=True)
trainX, testX = data['Xtrain'], data['Xtest']
trainY, testY = data['Ytrain'], data['Ytest']

def K(dot_res, k):
    """
    :param dot_res: dot product of two np.arrays
    :param k: the power of the poly kernel
    :return: (1 + dot_res)^k
    """
    return np.power(1 + dot_res, k)


def softsvmpoly(l: float, k: int, trainX: np.array, trainy: np.array):
    """

    :param l: the parameter lambda of the soft SVM algorithm
    :param sigma: the bandwidth parameter sigma of the RBF kernel.
    :param trainX: numpy array of size (m, d) containing the training sample
    :param trainy: numpy array of size (m, 1) containing the labels of the training sample
    :return: numpy array of size (m, 1) which describes the coefficients found by the algorithm
    """
    m, d = trainX.shape

    G = np.dot(trainX, trainX.T)
    # apply k to every item in G
    G = np.vectorize(lambda x: K(x, k))(G)

    H = np.pad(float(2) * l * G, [(0, m), (0, m)])
    H = fix_small_eigvals(H)

    A = np.block([[np.zeros((m, m)), np.identity(m)],
                  [G * trainy.reshape(-1, 1), np.identity(m)]])
    A = fix_small_eigvals(A)

    u = np.hstack((np.full(m, 0), np.full(m, 1/m)))

    v = np.hstack((np.zeros(m), np.ones(m)))

    z = solvers.qp(matrix(H), matrix(u), -matrix(A), -matrix(v))
    alphas = np.array(z["x"])[:m]
    return alphas


def simple_test():
    # load question 2 data
    data = np.load('EX2q2_mnist.npz')
    trainX = data['Xtrain']
    testX = data['Xtest']
    trainy = data['Ytrain']
    testy = data['Ytest']

    m = 100

    # Get a random m training examples from the training set
    indices = np.random.permutation(trainX.shape[0])
    _trainX = trainX[indices[:m]]
    _trainy = trainy[indices[:m]]

    # run the softsvmpoly algorithm
    w = softsvmpoly(10, 5, _trainX, _trainy)

    # tests to make sure the output is of the intended class and shape
    assert isinstance(
        w, np.ndarray), "The output of the function softsvmbf should be a numpy array"
    assert w.shape[0] == m and w.shape[
        1] == 1, f"The shape of the output should be ({m}, 1)"

def Q4_3():
    
    def plot_taining_set(title: str):
        plt.figure(figsize=(10, 4))
        plt.title()
        plt.scatter(x=trainX[:, 0], y=trainX[:, 1], c=trainY, cmap='cividis', s=5)
        plt.savefig(f"{title}.png")
        # plt.show()


    plot_taining_set("Training set")
    


if __name__ == '__main__':
    # before submitting, make sure that the function simple_test runs without errors
    simple_test()
    # here you may add any code that uses the above functions to solve question 4
    Q4_3()
