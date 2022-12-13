import numpy as np
from scipy.spatial import distance
from scipy.spatial.distance import cdist
from collections import Counter


def gensmallm(x_list: list, y_list: list, m: int):
    """
    gensmallm generates a random sample of size m along side its labels.

    :param x_list: a list of numpy arrays, one array for each one of the labels
    :param y_list: a list of the corresponding labels, in the same order as x_list
    :param m: the size of the sample
    :return: a tuple (X, y) where X contains the examples and y contains the labels
    """
    assert len(x_list) == len(y_list), 'The length of x_list and y_list should be equal'

    x = np.vstack(x_list)
    y = np.concatenate([y_list[j] * np.ones(x_list[j].shape[0]) for j in range(len(y_list))])

    indices = np.arange(x.shape[0])
    np.random.shuffle(indices)

    rearranged_x = x[indices]
    rearranged_y = y[indices]

    return rearranged_x[:m], rearranged_y[:m]


# todo: complete the following functions, you may add auxiliary functions or define class to help you

def learnknn(k: int, x_train: np.array, y_train: np.array):
    """

    :param k: value of the nearest neighbour parameter k
    :param x_train: numpy array of size (m, d) containing the training sample
    :param y_train: numpy array of size (m, 1) containing the labels of the training sample
    :return: classifier data structure
    """
    # transpose
    y_train = np.reshape(y_train, (-1, 1))

    def classifier(test_sample):
        """
        :param sample: vector of features
        :return: label from y_train that fits given sample
        """
        # distance[i] is the euclidian distance betweeen xi and sample
        distances = np.array([[np.linalg.norm(test_sample - xi) for xi in x_train]]).T
        labeled_dist = np.hstack((distances, y_train))
        sorted_by_dist = labeled_dist[np.argsort(distances[:, 0])]
        # TODO: output float/int?
        labels_of_min_k = np.array(sorted_by_dist[:k, 1])
        counter = Counter(labels_of_min_k)
        return counter.most_common(1)[0][0]

    
    return classifier
        

        


def predictknn(classifier, x_test: np.array):
    """

    :param classifier: data structure returned from the function learnknn
    :param x_test: numpy array of size (n, d) containing test examples that will be classified
    :return: numpy array of size (n, 1) classifying the examples in x_test
    """    
    
    predictions =  np.array([[classifier(sample)] for sample in x_test])
    return predictions



def simple_test():
    # data = np.load('mnist_all_not_compressed.npz')
    # np.random.seed(0) #TODO: delete this before submission
    data = np.load('mnist_all.npz')

    train0 = data['train0']
    train1 = data['train1']
    train2 = data['train2']
    train3 = data['train3']

    test0 = data['test0']
    test1 = data['test1']
    test2 = data['test2']
    test3 = data['test3']

    x_train, y_train = gensmallm([train0, train1, train2, train3], [0, 1, 2, 3], 100)

    x_test, y_test = gensmallm([test0, test1, test2, test3], [0, 1, 2, 3], 50)

    classifer = learnknn(5, x_train, y_train)

    preds = predictknn(classifer, x_test)

    # tests to make sure the output is of the intended class and shape
    assert isinstance(preds, np.ndarray), "The output of the function predictknn should be a numpy array"
    assert preds.shape[0] == x_test.shape[0] and preds.shape[
        1] == 1, f"The shape of the output should be ({x_test.shape[0]}, 1)"

    # get a random example from the test set
    # for i in range(10):
    #     print(f"The {i}'th test sample was classified as {preds[i]}")

    i = np.random.randint(0, x_test.shape[0])
    # this line should print the classification of the i'th test sample.
    print(f"The {i}'th test sample was classified as {preds[i]}")


if __name__ == '__main__':

    # before submitting, make sure that the function simple_test runs without errors
    simple_test()


