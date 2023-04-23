import numpy as np
from sklearn.datasets import make_blobs
from dataHandler import generateData, plot_data, get_subplot, save_subplots


def kmeans(X, k):
    centroids = X[np.random.choice(X.shape[0], k), :]

    while True:
        # dist.shape == (x.shape[0], k), which gives us the distance formm each point to each cenntroid
        dist = np.linalg.norm(X[:, np.newaxis] - centroids, axis=2)
        # clusters.shape == (x.shape[0],). the sample X[i] is in cluster clusters[i]
        clusters = np.argmin(dist, axis=1)

        new_centroids = np.array(
            [X[clusters == i].mean(axis=0) for i in range(k)])

        if np.allclose(centroids, new_centroids):
            break

        centroids = new_centroids
    return clusters, centroids

# Test your implementations on synthetic 2D data of N = 1000 points that
# you will generate (e.g., you can sample points from K isotropic Gaussians)
# and display figures with your results. Demonstrate how different random
# initializations yield different results. For K-means, demonstrate the effect
# of changing the value of K on the results by trying several values of K
# (including, but not limited to, K = 1 and K = N where N is the number
# of points). For the non-parametric algorithm, demonstrate the effect of
# changing the value of λ.


if __name__ == '__main__':
    for i in range(3):
        k  = 5
        X, Y = generateData(k=k)
        plot_data(X, Y, title=f'Synthetic data from {k} isotropic Gaussians', path=f'output\Kmeans\Synthetic data from {k} isotropic Gaussians_{i}.png')
        for _k in [1, k-1, k, k+1, X.shape[0]]:
            clusters, centroids = kmeans(X, _k)
            plot_data(
                X, clusters, title=f'{k} isotropic Gaussians, Kmeans k={_k}', path=f'output\Kmeans\Kmeans_{k}_{_k}_{i}.png')
