from PIL import Image
import numpy as np
import 'parametricKmeans' as pk


def load_image(img_path):
    img_path = "data\mandrill3.jpg"
    data = np.array(Image.open(img_path))
    return data