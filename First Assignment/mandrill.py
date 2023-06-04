import numpy as np
import matplotlib.pyplot as plt
from matplotlib.image import imread
from k_means import kmeans
from PDC_DP_means import PDC_DP


def load_image(img_path):
    data = imread(img_path)
    original_shape = data.shape
    data = data.reshape(-1, 3)
    return original_shape, data


def show_image(data, path=None):
    plt.clf()
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


def paint_image_with_PDCDP(data, og_shape, l):
    # l is lambda
    clusters, centroids = PDC_DP(data, l)
    new_pixels = centroids[clusters].astype(np.uint8)
    new_image = new_pixels.reshape(og_shape)
    return new_image


if __name__ == '__main__':
    imgs = [f"data\mandrill{i}.jpg" for i in range(1)]
    for i, img_path in enumerate(imgs):
        original_shape, data = load_image(img_path)
        for l in reversed([100.0, 180.0, 250.0, 500.0]):
            PDC_DP_painted_image = paint_image_with_PDCDP(
                data, original_shape, l)
            output_k = len(np.unique(PDC_DP_painted_image))
            show_image(PDC_DP_painted_image,
                       path=f'output\mandrill\PDC_DP_{i}_{l}_{output_k}.png')
        for k in [5, 10, 20, 30]:
            kmeans_painted_image = paint_image_with_kmeans(
                data, original_shape, k)
            show_image(kmeans_painted_image,
                       path=f'output\mandrill\kmeans_{i}_{k}.png')
