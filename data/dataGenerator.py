from sklearn.datasets import make_blobs

def generateData(n_samples=1000, k=3, n_features=2):
    X, Y = make_blobs(n_samples=n_samples,centers=k, n_features=n_features)
    return X, Y

def plotData(X, Y, title='Data', xLabel='X', yLabel='Y'):
    import matplotlib.pyplot as plt
    plt.scatter(X[:, 0], X[:, 1], c=Y)
    plt.title(title)
    plt.xlabel(xLabel)
    plt.ylabel(yLabel)
    plt.show()

if __name__ == '__main__':
    X, Y = generateData(k=5)
    plotData(X, Y)