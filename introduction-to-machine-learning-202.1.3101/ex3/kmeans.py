import numpy as np
import matplotlib.pyplot as plt


def initialize_centroids(X, k):
    """
    Initialize centroids by randomly selecting k data points from X
    """
    return X[np.random.choice(range(X.shape[0]), size=k)]


def get_distances(X, k, centroids):
    """
    Get the distance of each data point from each centroid
    """
    return np.array([np.linalg.norm(X - centroids[i], axis=1) for i in range(k)]).T



def assign_clusters(distances):
    """
    Assign each data point to the cluster with the nearest centroid
    """
    return np.argmin(distances, axis=1)


def compute_new_centroids(X, k, clusters):
    """
    Compute new centroids for each cluster by taking the mean of all data points in the cluster
    """
    return np.array([X[clusters == i].mean(axis=0) for i in range(k)])


def kmeans(X, k, t):
    """
    :param X: numpy array of size (m, d) containing the test samples
    :param k: the number of clusters
    :param t: the number of iterations to run
    :return: a column vector of length m, where C(i) ∈ {1, . . . , k} is the identity of the cluster in which x_i has been assigned.
    """
    centroids = initialize_centroids(X, k)
    clusters = None
    for _ in range(t):
        distances = get_distances(X, k, centroids)
        clusters = assign_clusters(distances)
        centroids = compute_new_centroids(X, k, clusters)

    return clusters.reshape((-1, 1))


def simple_test():
    # load sample data (this is just an example code, don't forget the other part)
    data = np.load('mnist_all.npz')
    X = np.concatenate((data['train0'], data['train1']))
    m, d = X.shape

    # run K-means
    c = kmeans(X, k=10, t=10)

    assert isinstance(c, np.ndarray), "The output of the function softsvm should be a numpy array"
    assert c.shape[0] == m and c.shape[1] == 1, f"The shape of the output should be ({m}, 1)"

if __name__ == '__main__':
    # before submitting, make sure that the function simple_test runs without errors
    simple_test()

    # here you may add any code that uses the above functions to solve question 2
