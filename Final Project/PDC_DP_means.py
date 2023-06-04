import numpy as np
from sklearn.datasets import make_blobs


def PDC_DP(X, l):
    k = 0
    centroids = np.array([np.mean(X, axis=0)])
    clusters = np.zeros(X.shape[0])  # row
    while True:

        dist = np.linalg.norm(X[:, np.newaxis, :] - centroids, axis=-1)
        new_clusters = np.argmin(dist, axis=1)

        # update centroids
        for i in range(k + 1):
            if i in new_clusters:
                centroids[i] = X[new_clusters == i].mean(axis=0)

        # find the inidces of points that their distance
        # to their closest centroid is greater than l, and get the farthest one
        j_max = np.argmax(np.linalg.norm(
            X - centroids[new_clusters].reshape(-1, X.shape[1]), axis=1))
        d_max = np.linalg.norm(X[j_max] - centroids[int(new_clusters[j_max])])

        if d_max > l:
            k += 1
            centroids = np.concatenate((centroids, np.array([X[j_max]])))
            new_clusters[j_max] = k

        # if np.allclose(clusters, new_clusters):
        #     break
        if np.allclose(clusters, new_clusters, atol=0.1):
            break
        clusters = new_clusters

    return clusters.astype(np.uint64), centroids


def PDC_DP_stream(X, l, prev_centroids=None, decay_factor=0.9):
    k = 0
    if prev_centroids is None:
        centroids = np.array([np.mean(X, axis=0)])
    else:
        centroids = prev_centroids

    clusters = np.zeros(X.shape[0])  # row
    while True:

        dist = np.linalg.norm(X[:, np.newaxis, :] - centroids, axis=-1)
        new_clusters = np.argmin(dist, axis=1)

        # update centroids
        for i in range(k + 1):
            if i in new_clusters:
                new_centroid = X[new_clusters == i].mean(axis=0)
                if i < len(centroids):
                    # apply decay factor
                    centroids[i] = decay_factor * centroids[i] + \
                        (1 - decay_factor) * new_centroid
                else:
                    centroids = np.concatenate(
                        (centroids, np.array([new_centroid])))

        # find the indices of points that their distance
        # to their closest centroid is greater than l, and get the farthest one
        j_max = np.argmax(np.linalg.norm(
            X - centroids[new_clusters].reshape(-1, X.shape[1]), axis=1))
        d_max = np.linalg.norm(X[j_max] - centroids[int(new_clusters[j_max])])

        if d_max > l:
            k += 1
            centroids = np.concatenate((centroids, np.array([X[j_max]])))
            new_clusters[j_max] = k

        if np.allclose(clusters, new_clusters, atol=0.1):
            break
        clusters = new_clusters

    return clusters.astype(np.uint64), centroids


if __name__ == '__main__':
    pass
