import numpy as np
from sklearn.datasets import make_blobs
from dataHandler import generateData, plotData

def kmeans(X, k):
    centroids = X[np.random.choice(X.shape[0], k), :]

    while True:
        # dist.shape == (x.shape[0], k), which gives us the distance formm each point to each cenntroid
        dist = np.linalg.norm(X[:, np.newaxis] - centroids, axis=2)
        # clusters.shape == (x.shape[0],). the sample X[i] is in cluster clusters[i]
        clusters = np.argmin(dist, axis=1)  
        
        new_centroids = np.array([X[clusters == i].mean(axis=0) for i in range(k)])
        
        if np.allclose(centroids, new_centroids): 
            break
        
        centroids = new_centroids 
    return clusters, centroids


if __name__ == '__main__':
    X, Y = generateData(k=6)
    plotData(X, Y)
    for k in range(3, 8):
        clusters, centroids = kmeans(X, k)
        plotData(X, clusters, title=f"k = {k}")
