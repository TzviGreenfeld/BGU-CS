import numpy as np
import cv2
import matplotlib.pyplot as plt
import matplotlib.animation as animation
from pdc_dp_means import DPMeans
import time
import os
from PIL import Image


def array_to_video(array_list, fps=10, title=""):
    # Create a figure
    fig, ax = plt.subplots()  # Modify this line to also get the Axes object

    # Create a list to hold our images
    im_list = []

    for i,arr in enumerate(array_list):
        # Normalize your array to be between 0 and 1
        arr = arr / 255.0
        im = plt.imshow(arr, animated=True)

        # Set the title and turn off the axis for each image
        ax.set_title(title)
        ax.axis('off')

        im_list.append([im])

    ani = animation.ArtistAnimation(fig, im_list, interval=1000/fps, blit=True)

    plt.close()  # Close the figure as we're done with it

    return ani


def load_image(img):
    original_shape = img.shape
    data = img.reshape(-1, 3)
    return original_shape, data


def load_video(video_path, fps=1):
    video = cv2.VideoCapture(video_path)
    frames = []

    # get the actual video fps
    video_fps = video.get(cv2.CAP_PROP_FPS)
    frame_skip = round(video_fps / fps)

    frame_count = 0
    while video.isOpened():
        ret, frame = video.read()
        if not ret:
            break

        if frame_count % frame_skip == 0:
            # openCV returns images as BGR we need convert it to RGB
            img_rgb = cv2.cvtColor(frame, cv2.COLOR_BGR2RGB)
            original_shape, data = load_image(img_rgb)
            frames.append((original_shape, data))

        frame_count += 1

    video.release()

    return frames


def stream_DPMeans(imgs, l, n_clusters_doc=[]):
    # if passed n_clusters_doc, store the number of clusters for each frame in place
    output_frames = []
    
    # these are default values of DPMeans.
    # we use them just for the first iteration
    centroids_agger = np.array([]) # new values at the begining
    prev_centroids = "k-means++" 
    prev_n_clusters = 8
    # give small weight to old values
    
    for (original_shape, data) in imgs:
        if len(centroids_agger) > 0:
            weights = [np.pow(0.9, i + 1) for i in range(len(centroids_agger))]
            prev_centroids = np.average(centroids_agger, axis=1, weights=weights)
            
        dpmeans = DPMeans(n_clusters=prev_n_clusters, init=prev_centroids, delta=l, max_iter=50)
        dpmeans.fit(data)
        y_dpmeans = dpmeans.predict(data)
        centroids = dpmeans.cluster_centers_
        
        # make each pixel the color of its cluster centroid
        pixels = centroids[y_dpmeans]
        # cast to uint8 to fit as RGB vlaues
        pixels = pixels.astype(np.uint8)
        # reshape from array of RGB to image shape
        pixels = pixels.reshape(original_shape)
        output_frames.append(pixels)
        
        # update the previous centroids and number of clusters to use in the next iteration
        # this is actaully the streaming part
        prev_centroids = centroids
        if len(centroids_agger) > 0:
            centroids_agger = np.vstack((centroids, centroids_agger))
        prev_n_clusters = len(centroids)
        n_clusters_doc.append(prev_n_clusters)
        
    return output_frames



def save_frames_as_png(frames, dir_path):
    if not os.path.exists(dir_path):
        os.makedirs(dir_path)

    for i, (original_shape, frame_data) in enumerate(frames):
        # Assuming the data is in uint8 format, reshape and save it
        image_data = np.reshape(frame_data, original_shape).astype(np.uint8)
        img = Image.fromarray(image_data)
        img.save(os.path.join(dir_path, f'frame_{i}.png'))


if __name__ == '__main__':
    logger = open("log.txt", "a+")
    video_name = 'many_mandrils'
    # video_path = f'./videos/{video_name}.mp4'
    video_path = f'./report/many_mandrils_comaprsion.mp4'
    l = 100 # lambda
    n_clusters = []
    # for fps in [1, 5, 10, 15, 20, 25, 30]:
    for fps in [1]:
        time_start = time.time()
        
        imgs = load_video(video_path, fps)
        save_frames_as_png(imgs, './report/compare/')
        # frames = stream_DPMeans(imgs, l=l, n_clusters_doc=n_clusters)
        
        # # export the frames as a gif
        # title = f"DPMeans with lambda={l} and fps={fps}"
        # ani = array_to_video(frames, fps, title)
        # ani.save(f"./output/{video_name}_fps-{fps}_lambda-{l}_new.gif", fps=fps)

        # # debug
        # total_time =  time.time() - time_start
        # logger.write(f"fps: {fps}\ttotal time: {total_time} seconds \n")
    logger.close()
    
    
    


