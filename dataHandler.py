from sklearn.datasets import make_blobs
import matplotlib.pyplot as plt
import numpy as np
import os


def generateData(n_samples=1000, k=3, n_features=2):
    X, Y = make_blobs(n_samples=n_samples, centers=k, n_features=n_features)
    return X, Y


def plot_data(X, Y, title='Data', path=None):
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


def save_subplots(title, plots_data, path, shape):
    """
    plots_data: is a list of dictionaries with the following keys:
        - X: points
        - Y: labels
        - title: the title of the figure
    """
    n_plots = len(plots_data)
    # rows = int(n_plots ** 0.5)
    # cols = int(n_plots / rows) if n_plots % rows == 0 else int(n_plots / rows) + 1
    rows, cols = shape
    fig, axes = plt.subplots(nrows=rows, ncols=cols)
    for i, plot_data in enumerate(plots_data):
        X = plot_data['X']
        Y = plot_data['Y']
        plot_title = plot_data['title']
        ax = axes.flat[i] if n_plots > 1 else axes
        ax.scatter(X[:, 0], X[:, 1], c=Y)
        ax.set_title(plot_title)
    fig.suptitle(title)
    fig.tight_layout()
    fig.savefig(path + '.png')


if __name__ == '__main__':
    pass
