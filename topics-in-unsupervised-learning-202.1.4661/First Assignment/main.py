import numpy as np
from dataHandler import generateData, plot_data
from k_means import kmeans
from PDC_DP_means import PDC_DP


def task_2():
    for i in range(3):
        k = 5
        X, Y = generateData(k=k)
        plot_data(X, Y, title=f'Synthetic data from {k} isotropic Gaussians',
                  path=f'output\data{i}\Synthetic data from {k} isotropic Gaussians_{i}.png')
        for _k in [1, k-1, k, k+1, 1000]:
            clusters, centroids = kmeans(X, _k)
            plot_data(
                X, clusters, title=f'{k} isotropic Gaussians, Kmeans k={_k}', path=f'output\data{i}\Kmeans_{k}_{_k}_{i}.png')
        for l in reversed([0.01, 0.1, 1.0, 10.0, 100.0]):
            clusters, centroids = PDC_DP(X, l)
            plot_data(
                X, clusters, title=f"λ={l}, k={len(np.unique(clusters))}", path=f'output\data{i}\PDC_DP_means_{l}_{i}.png')


if __name__ == '__main__':
    task_2()
    
    
