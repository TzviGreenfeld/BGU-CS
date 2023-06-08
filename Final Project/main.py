from sklearn.datasets import make_blobs
from pdc_dp_means import DPMeans

# Generate sample data
X, y_true = make_blobs(n_samples=300, centers=4, cluster_std=0.60, random_state=0)

# Apply DPMeans clustering
dpmeans = DPMeans(n_clusters=1,n_init=10, delta=10)  # n_init and delta parameters
dpmeans.fit(X)

# Predict the cluster for each data point
y_dpmeans = dpmeans.predict(X)
print(dpmeans.cluster_centers_)
print(y_dpmeans)

# Plotting clusters and centroids
import matplotlib.pyplot as plt

plt.scatter(X[:, 0], X[:, 1], c=y_dpmeans, s=50, cmap='viridis')
centers = dpmeans.cluster_centers_
plt.scatter(centers[:, 0], centers[:, 1], c='black', s=200, alpha=0.5)
plt.show()