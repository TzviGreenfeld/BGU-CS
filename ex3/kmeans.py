import numpy as np


def kmeans(X, k, t):
    """
    :param X: numpy array of size (m, d) containing the test samples
    :param k: the number of clusters
    :param t: the number of iterations to run
    :return: a column vector of length m, where C(i) ∈ {1, . . . , k} is the identity of the cluster in which x_i has been assigned.
    """
    m, d = X.shape
    C = [np.array([]) for i in range(k)]
    centroids = np.random.rand(k, d) * 255
    for _ in range(t):
        for i in range(k):
            distance = [xi - centroids[i] for xi in X]
            min_x = np.argmin([np.linalg.norm(di) for di in distance])
            for cluster in C:
                if min_x in cluster:
                    cluster = cluster[cluster != min_x]
            C[i] = np.append(C[i] ,min_x)
            centroids[i] = (1.0/len(C[i])) * sum(C[i]) 
            
    res = [np.argmin([np.linalg.norm(xi - centroid) for centroid in centroids]) for xi in X ]
    res = np.array(res)
    return res.reshape(-1, 1)

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
