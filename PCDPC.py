import numpy as np
from sklearn.datasets import make_blobs


def generateData(n_samples=1000, k=3, n_features=2):
    X, Y = make_blobs(n_samples=n_samples, centers=k, n_features=n_features)
    return X, Y


def plotData(X, Y, title='Data', xLabel='X', yLabel='Y'):
    import matplotlib.pyplot as plt
    plt.scatter(X[:, 0], X[:, 1], c=Y)
    plt.title(title)
    plt.xlabel(xLabel)
    plt.ylabel(yLabel)
    plt.show()


def DC_DP(X, l):
    k = 0
    centroids = np.array([np.mean(X, axis=0)])
    clusters = np.zeros(X.shape[0])  # row
    while True:
        new_clusters = np.zeros(X.shape[0])
        for i in range(X.shape[0]):
            new_clusters[i] = np.argmin(np.array([np.linalg.norm(X[i] - c) for c in centroids]))
            if np.linalg.norm(X[i] - centroids[int(new_clusters[i])]) > l:
                k += 1
                new_clusters[i] = k
                centroids = np.concatenate((centroids, np.array([X[i]])))
        for i in range(k + 1):
            centroids[i] = X[new_clusters == i].mean(axis=0)
        if np.array_equal(clusters, new_clusters):
            break
        clusters = new_clusters
    return clusters
            

if __name__ == '__main__':
    X, Y = generateData(k=6)
    # plotData(X, Y)
    for l in reversed([0.1, 0.5, 1, 2, 5, 7]):
        clusters = DC_DP(X, l)
        plotData(X, clusters, title=f"lambda = {l}, k = {len(np.unique(clusters))}")
