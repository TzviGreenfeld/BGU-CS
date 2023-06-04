from sklearn.datasets import make_blobs
import numpy as np


def generate_data(n_samples=1000, k=3, n_features=2, batch_size=100):
    for _ in range(n_samples // batch_size):
        X, Y = make_blobs(n_samples=batch_size, centers=k,
                          n_features=n_features)
        yield X, Y


def generate_streaming_data(n_samples=1000, max_clusters=5, cluster_std=1.0, drift_rate=0.1, batch_size=100):
    centers = []
    for _ in range(max_clusters):
        # randomly generate cluster centers
        centers.append(np.random.rand(2) * 10)

    n_batches = n_samples // batch_size
    current_clusters = max_clusters

    for i in range(n_batches):
        # simulate concept drift
        if np.random.rand() < drift_rate:
            # decrease, keep, or increase clusters randomly
            current_clusters += np.random.choice([-1, 0, 1])

        # generate data for the current batch
        X, Y = make_blobs(
            n_samples=batch_size, centers=centers[:current_clusters], cluster_std=cluster_std)

        yield X, Y

# Example usage


if __name__ == '__main__':
    pass
