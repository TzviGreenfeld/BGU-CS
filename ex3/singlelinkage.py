import numpy as np
import scipy.io as sio
data = np.load('mnist_all.npz')



def get_random_samples(digit, m):
    X = data[f'train{digit}']
    indices = np.arange(X.shape[0])
    np.random.shuffle(indices)
    samples = X[indices][:m]
    labels = np.full((m, 1), digit)
    return samples, labels


def get_small_sample(samples_per_digit):
    # make dictionary smaller sample from data
    X = {f"train{i}": get_random_samples(i, samples_per_digit)[
        0] for i in range(10)}
    return X


small_data = get_small_sample(30)


def cluster_dist(c1, c2):
    return np.array([np.linalg.norm(x1 - x2) for x1 in c1 for x2 in c2]).min()


def singlelinkage(X, k):
    """
    :param X: numpy array of size (m, d) containing the test samples
    :param k: the number of clusters
    :return: a column vector of length m, where C(i) ∈ {1, . . . , k} is the identity of the cluster in which x_i has been assigned.
    """
    m, d = X.shape
    clusters = [np.array([i]) for i in range(m)]
    while len(clusters) > k:
        distances = np.array([[cluster_dist(clusters[i], clusters[j])
                               for j in range(len(clusters))] for i in range(len(clusters))])
        np.fill_diagonal(distances, np.inf)
        min_i, min_j = np.unravel_index(np.argmin(distances), distances.shape)
        clusters[min_i] = np.concatenate((clusters[min_i], clusters[min_j]))
        clusters.pop(min_j)
    res = np.zeros((m, 1))
    for i, c in enumerate(clusters):
        for x_index in c:
            res[x_index] = i
    return res
                

def simple_test():
    # load sample data (this is just an example code, don't forget the other part)
    # data = np.load('mnist_all.npz')
    data = small_data
    X = np.concatenate((data['train0'], data['train1']))
    m, d = X.shape

    # run single-linkage
    c = singlelinkage(X, k=10)

    assert isinstance(
        c, np.ndarray), "The output of the function softsvm should be a numpy array"
    assert c.shape[0] == m and c.shape[
        1] == 1, f"The shape of the output should be ({m}, 1)"


if __name__ == '__main__':
    # before submitting, make sure that the function simple_test runs without errors
    simple_test()

    # here you may add any code that uses the above functions to solve question 2
