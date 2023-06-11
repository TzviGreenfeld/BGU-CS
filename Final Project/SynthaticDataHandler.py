import cv2
import itertools
import numpy as np
import matplotlib.pyplot as plt
from pdc_dp_means import DPMeans
from sklearn.datasets import make_blobs
from matplotlib.animation import FuncAnimation
from scipy.spatial import ConvexHull
from mandrill import array_to_video
from matplotlib.widgets import Slider


class SynthaticDataHandler:
    def __init__(self):
        pass

    def generate_streaming_data(self, n_samples=1000, max_clusters=5, cluster_std=1.0, drift_rate=0.1, batch_size=100):
        centers = []
        for _ in range(max_clusters):
            # randomly generate cluster centers in range [0, 10)
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

    def generate_PDCDP_frames(self, generator, frames):
        # pre-generate all frames
        data = [[X.shape, X] for X, Y in list(itertools.islice(generator, frames))]
        frame_data = self.stream_DPMeans_synth(data, l=1)

        return frame_data
        
    def create_slide_show(self, frame_data):
        fig, ax = plt.subplots()
        plt.subplots_adjust(bottom=0.2)  # make room for the slider

        sc = ax.scatter([], [], c=[], cmap='tab20', alpha=0.45)
        ax.set_xlim(0, 11)
        ax.set_ylim(0, 11)

        slider_ax = plt.axes([0.1, 0.05, 0.8, 0.03])  # position of the slider
        slider = Slider(slider_ax, 'Frame', 0, len(
            frame_data)-1, valinit=0, valstep=1)

        polygons = []
        texts = []

        def update(frame):
            nonlocal polygons, texts
            X, clusters, centroids = frame_data[int(frame)]

            # remove old polygons and texts
            for polygon in polygons:
                polygon.remove()
            polygons = []
            for text in texts:
                text.remove()
            texts = []

            # draw new polygons and texts
            for i in range(len(centroids)):
                points = X[clusters == i]
                if len(points) >= 3:  # need at least 3 points to calculate the convex hull
                    hull = ConvexHull(points)
                    polygon = plt.Polygon(
                        points[hull.vertices], fill=None, edgecolor='r', alpha=0.7)
                    ax.add_patch(polygon)
                    polygons.append(polygon)

                # add cluster index as text
                centroid = points.mean(axis=0)
                if np.all(np.isfinite(centroid)):  # check that centroid is a finite number
                    text = ax.text(centroid[0], centroid[1], str(
                        i), color='black', fontweight='semibold', fontsize='small')
                    texts.append(text)

            sc.set_offsets(X)
            sc.set_array(clusters)

            return [sc] + polygons + texts,

        slider.on_changed(update)
        update(0)  # to display the first frame

        plt.show()
            
    def stream_DPMeans_synth(self, imgs, l):
        
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
            
            output_frames.append([data, y_dpmeans, centroids])
            
            # update the previous centroids and number of clusters to use in the next iteration
            # this is actaully the streaming part
            prev_centroids = centroids
            if len(centroids_agger) > 0:
                centroids_agger = np.vstack((centroids, centroids_agger))
            prev_n_clusters = len(centroids)
        return output_frames

if __name__ == '__main__':
    sdh = SynthaticDataHandler()
    gen = sdh.generate_streaming_data(n_samples=1000, batch_size=100)
    frames_data = sdh.generate_PDCDP_frames(generator=gen, frames=10)
    sdh.create_slide_show(frames_data)
    
