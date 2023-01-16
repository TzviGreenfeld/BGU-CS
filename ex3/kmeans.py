import numpy as np
import matplotlib.pyplot as plt


def kmeans(X, k, t):
    """
    :param X: numpy array of size (m, d) containing the test samples
    :param k: the number of clusters
    :param t: the number of iterations to run
    :return: a column vector of length m, where C(i) ∈ {1, . . . , k} is the identity of the cluster in which x_i has been assigned.
    """
    m, d = X.shape
    C = [np.array([]) for i in range(k)]
    centroids = X[np.random.choice(range(X.shape[0]), size=k)]
    for _ in range(t):
        for i in range(k):
            distance = [xi - centroids[i] for xi in X]
            min_x = np.argmin([np.linalg.norm(di) for di in distance])
            for j,cluster in enumerate(C):
                if min_x in cluster:
                    cluster = cluster[cluster != min_x]
                    if len(C[j]) != 0:
                        centroids[j] = (1.0/len(cluster)) * sum(cluster)
            C[i] = np.append(C[i] ,min_x)
            centroids[i] = (1.0/len(C[i])) * sum(C[i]) 
            
    res = [np.argmin([np.linalg.norm(xi - centroid) for centroid in centroids]) for xi in X ]
    res = np.array(res)
    return res.reshape(-1, 1)

def Q1c():
    def make_table(data, cols, rows):
        fig, ax = plt.subplots(figsize=(12, 2))
        ax.axis('tight')
        ax.axis('off')
        the_table = ax.table(cellText=data, colLabels=cols, rowLabels=rows, cellLoc = 'center', loc='center', fontsize=20)
        # plt.show()

    def analyze_kmeans_unlabeld():
        X = np.concatenate([data[f'train{i}'] for i in range(10)])
        Y = np.concatenate(
            [np.full((data[f'train{i}'].shape[0], 1), i) for i in range(10)])

        indices = np.arange(X.shape[0])
        np.random.shuffle(indices)
        samples = np.array(X[indices][:1000])
        labels = Y[indices][:1000]

        kmeans_res = kmeans(samples, 10, 20)

        clusters = np.empty((10,), dtype=object)
        for i in range(10):
            indices = np.where(kmeans_res == i)[0]
            clusters[i] = indices

        clsuters_size = np.array([len(cluster) for cluster in clusters])

        real_labels_per_cluster = [[labels[i]
                                    for i in cluster] for cluster in clusters]
        most_common_label_in_cluster = []
        for real_labels in real_labels_per_cluster:
            if len(real_labels) > 0:
                most_common_label_in_cluster.append(
                    max(real_labels, key=real_labels.count))
                print(np.histogram(real_labels, bins=10)[0])
            else:
                most_common_label_in_cluster.append(-1)
        
        precent_of_most_common_label_in_cluster = [real_labels.count(most_common_label_in_cluster[i]) / clsuters_size[i] for i,real_labels in enumerate(real_labels_per_cluster)]

        errors = []
        for i in range(10):
            if clsuters_size[i] == 0:
                errors.append(0)
            else:
                errors.append(np.mean((np.array([most_common_label_in_cluster[i] for _ in range(
                    clsuters_size[i])]).reshape(-1, 1)) != real_labels_per_cluster[i]))

        row_headers = ["cluster size", "most common label", "%", "error"]
        col_headers = np.array([f"cluster {i}" for i in range(10)])

        table = np.vstack([clsuters_size, most_common_label_in_cluster, precent_of_most_common_label_in_cluster, errors])

        make_table(table, col_headers, row_headers)


    analyze_kmeans_unlabeld()


def simple_test():
    # load sample data (this is just an example code, don't forget the other part)
    data = np.load('mnist_all.npz')
    X = np.concatenate((data['train0'], data['train1']))
    m, d = X.shape

    # run K-means
    c = kmeans(X, k=10, t=10)

    assert isinstance(c, np.ndarray), "The output of the function softsvm should be a numpy array"
    assert c.shape[0] == m and c.shape[1] == 1, f"The shape of the output should be ({m}, 1)"

if __name__ == '__main__':
    # before submitting, make sure that the function simple_test runs without errors
    simple_test()

    # here you may add any code that uses the above functions to solve question 2
