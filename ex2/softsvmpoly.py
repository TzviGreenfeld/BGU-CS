import numpy as np
from cvxopt import solvers, matrix, spmatrix, spdiag, sparse
import matplotlib.pyplot as plt


def K(x1, x2, k):
    return np.power(1 + np.inner(x1, x2), k)

# todo: complete the following functions, you may add auxiliary functions or define class to help you


def softsvmpoly(l: float, k: int, trainX: np.array, trainy: np.array):
    """

    :param l: the parameter lambda of the soft SVM algorithm
    :param sigma: the bandwidth parameter sigma of the RBF kernel.
    :param trainX: numpy array of size (m, d) containing the training sample
    :param trainy: numpy array of size (m, 1) containing the labels of the training sample
    :return: numpy array of size (m, 1) which describes the coefficients found by the algorithm
    """
    m, d = trainX.shape

    u = np.hstack((np.full(d, 0), np.full(m, 1/m)))

    G = np.dot(trainX, trainX.T)
    H = np.pad(* l * G, [(0, m), (0, m)])
    # handle small eigenvalues
    epsilon = np.finfo(np.float64).eps
    if min(np.linalg.eigvals(H)) == 0:
        H = H + (epsilon * np.eye(H.shape[0]))

    A = np.block([[np.zeros((m, d)), np.identity(m)],
                  [trainX @ G, np.identity(m)]])
  
    z = solvers.qp(matrix(H), matrix(u), -matrix(A), -matrix(v))
    w = np.array(z["x"])[:d]
    return w


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
    assert isinstance(w, np.ndarray), "The output of the function softsvmbf should be a numpy array"
    assert w.shape[0] == 1 and w.shape[1] == 1, f"The shape of the output should be ({m}, 1)"


if __name__ == '__main__':
    # before submitting, make sure that the function simple_test runs without errors
    simple_test()

    # here you may add any code that uses the above functions to solve question 4
