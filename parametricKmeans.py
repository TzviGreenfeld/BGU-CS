from PIL import Image
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


def kmeans(X, k):
    centroids = X[np.random.choice(X.shape[0], k), :]
    clusters = np.zeros(X.shape[0])
    while True:
        new_clusters = np.argmin(np.linalg.norm(
            X[:, np.newaxis] - centroids, axis=2), axis=1)
        if np.array_equal(clusters, new_clusters):
            break
        clusters = new_clusters
        for i in range(k):
            centroids[i] = X[clusters == i].mean(axis=0)
    return clusters, centroids


def load_image(img_path):
    img_path = "data\mandrill3.jpg"
    data = np.array(Image.open(img_path))   
    original_shape = data.shape
    return original_shape, data.reshape(data.shape[0] * data.shape[1], data.shape[2])

def paint_image(centroids, clusters, data, og_shape):
    print("zain")
    pixels = np.zeros(og_shape)
    for i in range(og_shape[0]):
        for j in range(og_shape[1]):
            pixels[i, j] = tuple(centroids[int(clusters[j * og_shape[0] + i])])
    img = Image.fromarray(pixels, 'RGB')
    img.show()

if __name__ == '__main__':
    # X, Y = generateData(k=6)
    # plotData(X, Y)
    og_shape, data = load_image("data\mandrill3.jpg")
    print(data.shape)
    clusters, centroids = kmeans(data, 800)
    # plotData(X, clusters)
    paint_image(centroids, clusters, data, og_shape)
    
