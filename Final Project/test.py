import numpy as np
import itertools
from matplotlib import pyplot as plt
from matplotlib.animation import FuncAnimation
from dataGenrator import generate_streaming_data
from dataVisualizer import plot_data, plot_streaming_data
from PDC_DP_means import PDC_DP_stream
from scipy.spatial import ConvexHull
from matplotlib.widgets import Slider



# def test_generate_streaming_data():
#     data_generator = generate_streaming_data(n_samples=1000, max_clusters=5, cluster_std=1.0, drift_rate=0.1, batch_size=100)
#     for i, (X, Y)in enumerate(data_generator):
#         print(f"Received batch {i}:", X.shape, Y.shape)
#         plot_data(X, Y, title=f'Data Batch {i}', path=None)


def test_generate_streaming_data():
    data_generator = generate_streaming_data(
        n_samples=1000, max_clusters=5, cluster_std=1.0, drift_rate=0.1, batch_size=50)
    plot_streaming_data(data_generator, interval=1000,
                        frames=20, title='Streaming Data')


def plot_streaming_data_with_clustering(generator, interval=1000, frames=10, title='Streaming Data', path=None):

    fig, ax = plt.subplots()
    plt.subplots_adjust(bottom=0.2)  # make room for the slider

    # sc = ax.scatter([], [], c=[], cmap='viridis', alpha=0.45)
    sc = ax.scatter([], [], c=[], cmap='tab20', alpha=0.45)
    ax.set_xlim(0, 10)
    ax.set_ylim(0, 10)

    slider_ax = plt.axes([0.1, 0.05, 0.8, 0.03])  # position of the slider
    slider = Slider(slider_ax, 'Frame', 0, frames-1, valinit=0, valstep=1)

    data = list(itertools.islice(generator, frames))  # pre-generate all frames
    polygons = []
    centroids = None
    texts = []

    def update(frame):
        nonlocal centroids, polygons, texts
        X, _ = data[int(frame)]
        clusters, centroids = PDC_DP_stream(
            X, l=1.0, prev_centroids=centroids, decay_factor=0.1)

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

    anim = FuncAnimation(fig, update, frames=frames, blit=True)
    slider.on_changed(update)

    plt.show()


if __name__ == '__main__':
    streaming_data_generator = generate_streaming_data(
        n_samples=1000, max_clusters=5, cluster_std=1.0, drift_rate=0.1, batch_size=100)
    plot_streaming_data_with_clustering(
        streaming_data_generator, interval=2000, frames=10, title='Streaming Data with Clustering')
    # fig, ax = plt.subplots()
    # sc = ax.scatter([], [], c=[], cmap='viridis',
    #                 alpha=0.5)  # make dots somewhat clear
    # ax.set_title(title)
    # ax.set_xlabel("X")
    # ax.set_ylabel("Y")
    # ax.set_xlim(0, 10)
    # ax.set_ylim(0, 10)

    # polygons = []
    # centroids = None
    # texts = []

    # def update(frame):
    #     nonlocal centroids, polygons, texts
    #     X, _ = next(generator)
    #     clusters, centroids = PDC_DP_stream(
    #         X, l=1.0, prev_centroids=centroids, decay_factor=0.9)

    #     # remove old polygons and texts
    #     for polygon in polygons:
    #         polygon.remove()
    #     polygons = []
    #     for text in texts:
    #         text.remove()
    #     texts = []

    #     # draw new polygons and texts
    #     for i in range(len(centroids)):
    #         points = X[clusters == i]
    #         if len(points) >= 3:  # need at least 3 points to calculate the convex hull
    #             hull = ConvexHull(points)
    #             polygon = plt.Polygon(
    #                 points[hull.vertices], fill=None, edgecolor='r')
    #             ax.add_patch(polygon)
    #             polygons.append(polygon)

    #         # add cluster index as text
    #         centroid = points.mean(axis=0)
    #         if np.all(np.isfinite(centroid)):
    #             text = ax.text(centroid[0], centroid[1], str(i), color='black')
    #             texts.append(text)

    #     sc.set_offsets(X)
    #     sc.set_array(clusters)

    #     return [sc] + polygons + texts,

    # anim = FuncAnimation(fig, update, frames=frames,
    #                      interval=interval, blit=False)

    # if path is not None:
    #     anim.save(path, dpi=80, writer='imagemagick')
    # else:
    #     plt.show()
