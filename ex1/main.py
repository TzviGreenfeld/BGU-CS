import numpy as np
from nearest_neighbour import learnknn, predictknn

if __name__ == '__main__':
    k = 1
    x_train = np.array([[1,2], [3,4], [5,6]])
    y_train = np.array([1, 0, 1])
    classifier = learnknn(k, x_train, y_train)
    x_test = np.array([[10,11], [3.1,4.2], [2.9,4.2], [5,6]])
    y_testprediction = predictknn(classifier, x_test)
    print(y_testprediction)
    # print(y_testprediction == [1, 0, 0, 1])