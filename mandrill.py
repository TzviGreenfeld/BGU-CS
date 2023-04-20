import numpy as np
import matplotlib.pyplot as plt
from matplotlib.image import imread
from parametricKmeans import kmeans
from PCDPC import DC_DP


def load_image(img_path):
    data = imread(img_path)
    original_shape = data.shape
    data = data.reshape(-1, 3)
    return original_shape, data


def show_image(data, path=None):
    plt.imshow(data)
    plt.axis('off')
    if path is not None:
        plt.savefig(path, bbox_inches='tight')
    else:
        plt.show()


def paint_image_with_kmeans(data, og_shape, k):
    clusters, centroids = kmeans(data, k)
    new_pixels = centroids[clusters].astype(np.uint8)
    new_image = new_pixels.reshape(og_shape)
    return new_image


def paint_image_with_DCDP(data, og_shape, l):
    # l is lambda
    clusters, centroids = DC_DP(data, l)
    new_pixels = centroids[clusters]
    new_image = new_pixels.reshape(og_shape)
    return new_image


if __name__ == '__main__':
    img_path = "data\mandrill3.jpg"
    original_shape, data = load_image(img_path)
    painted_image = paint_image_with_kmeans(data, original_shape, 10)
    show_image(painted_image)
