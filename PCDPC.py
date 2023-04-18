import numpy as np
from sklearn.datasets import make_blobs
from dataHandler import generateData, plotData

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
    return clusters, centroids
            

if __name__ == '__main__':
    X, Y = generateData(k=6)
    # plotData(X, Y)
    for l in reversed([0.1, 0.5, 1, 2, 5, 7]):
        clusters, centroids = DC_DP(X, l)
        plotData(X, clusters, title=f"lambda = {l}, k = {len(np.unique(clusters))}")
