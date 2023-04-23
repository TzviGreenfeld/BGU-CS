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
    new_pixels = centroids[clusters].astype(np.uint8)
    new_image = new_pixels.reshape(og_shape)
    return new_image


if __name__ == '__main__':
    imgs = [f"data\mandrill{i}.jpg" for i in range(3)]
    for i, img_path in enumerate(imgs):
        original_shape, data = load_image(img_path)
        for l in reversed([0.1, 1.0, 10.0, 100, 0, 1000.0]):
            PDC_DP_painted_image = paint_image_with_DCDP(data, original_shape, l)
            show_image(PDC_DP_painted_image, path=f'output\mandrrill\PDC_DP_{i}_{l}.png')
        for k in range(10, 41, 10):
            kmeans_painted_image = paint_image_with_kmeans(data, original_shape, 20)
            show_image(kmeans_painted_image,path=f'output\mandrrill\kmeans_{i}_k.png')
        
