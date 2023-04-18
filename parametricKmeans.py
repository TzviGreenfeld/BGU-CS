from PIL import Image
import numpy as np
from sklearn.datasets import make_blobs
from dataHandler import generateData, plotData

max_iterations = 100
def kmeans(X, k):
    iter_counter = 0
    centroids = X[np.random.choice(X.shape[0], k), :]
    clusters = np.zeros(X.shape[0])
    while iter_counter < max_iterations:
        new_clusters = np.argmin(np.linalg.norm(
            X[:, np.newaxis] - centroids, axis=2), axis=1)
        if np.array_equal(clusters, new_clusters):
            break
        clusters = new_clusters
        for i in range(k):
            centroids[i] = X[clusters == i].mean(axis=0)
        iter_counter += 1
    return clusters, centroids


if __name__ == '__main__':
    X, Y = generateData(k=6)
    plotData(X, Y)
    for k in range(3, 8):
        clusters, centroids = kmeans(X, k)
        plotData(X, clusters)
