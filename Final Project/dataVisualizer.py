import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation

def plot_data(X, Y, title='Data', path=None):
    plt.clf()
    plt.scatter(X[:, 0], X[:, 1], c=Y)
    plt.title(title)
    plt.xlabel("X")
    plt.ylabel("Y")
    if path is not None:
        plt.savefig(path)
    else:
        plt.show()

def plot_streaming_data(generator, interval=1000, frames=10, title='Streaming Data', path=None):
    fig, ax = plt.subplots()
    sc = ax.scatter([], [], c=[], cmap='viridis')
    ax.set_title(title)
    ax.set_xlabel("X")
    ax.set_ylabel("Y")
    ax.set_xlim(-10, 10)
    ax.set_ylim(-10, 10)

    def update(frame):
        X, Y = next(generator)
        sc.set_offsets(X)
        sc.set_array(Y)
        return sc,

    anim = FuncAnimation(fig, update, frames=frames, interval=interval, blit=True)

    if path is not None:
        anim.save(path, dpi=80, writer='imagemagick')
    else:
        plt.show()
        
if __name__ == '__main__':
    pass