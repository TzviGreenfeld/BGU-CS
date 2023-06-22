import matplotlib.pyplot as plt
import matplotlib.image as mpimg

def plot_images(file_names, titles, title):
    assert len(file_names) == len(titles), "File names and titles should have the same length"
    assert len(file_names) <= 9, "Only a maximum of 9 images can be plotted on a 3x3 grid"

    num_images = len(file_names)
    
    num_rows = 3
    num_cols = 2

    fig, axs = plt.subplots(num_rows, num_cols, figsize=(15, 15))
    axs = axs.ravel()

    # Plot each image
    for i in range(num_images):
        img = mpimg.imread(file_names[i])
        axs[i].imshow(img)
        axs[i].set_title(titles[i])
        axs[i].axis('off')
        
    # Hide extra subplots
    for j in range(i+1, num_rows*num_cols):
        axs[j].axis('off')

    plt.tight_layout()
    plt.savefig(title)

# Usage
# file_names = [f'raw_{i}.png' for i in range(1, 10)]
# pdc_file_names = [f'output/pdc/pdc_{i}.png' for i in range(1, 10)]
# real_file_names = [f'output/raw/raw_{i}.png' for i in range(1, 10)]
# titles = [f'frame {i}/{9}' for i in range(1, 10)]
# plot_images(pdc_file_names, titles, title="pdc_clusters.png")
# plot_images(real_file_names, titles, title="real_clusters.png")
# print("Done")
files = [f"./report/compare/frame_{i}.png" for i in range(5)]
titles = [f'frame {i}/{5}' for i in range(1, 6)]
plot_images(files, titles, title="compare.png")
