from sklearn.datasets import make_blobs
import matplotlib.pyplot as plt
import numpy as np
import os


def generateData(n_samples=1000, k=3, n_features=2):
    X, Y = make_blobs(n_samples=n_samples, centers=k, n_features=n_features)
    return X, Y


def plot_data(X, Y, title='Data', path=None):
    plt.clf()
    plt.scatter(X[:, 0], X[:, 1], c=Y)
    plt.title(title)
    plt.xlabel("X")
    plt.ylabel("Y")
    if path is not None:
        plt.savefig(path)
    else:
        plt.show()
        

def get_subplot(X, Y, title='Data', xLabel='X', yLabel='Y'):
    fig, ax = plt.subplots()
    ax.scatter(X[:, 0], X[:, 1], c=Y)
    ax.set_title(title)
    ax.set_xlabel(xLabel)
    ax.set_ylabel(yLabel)
    return fig




if __name__ == '__main__':
    pass
