import os
import subprocess
from os.path import abspath, dirname, join
from concurrent.futures import ThreadPoolExecutor

new_name = "operating-systems-202.1.3031"

repo = "https://github.com/TzviGreenfeld/xv6"

full_path = join(dirname(abspath(__file__)), specific_dir)

if not os.path.exists(full_path):
    os.makedirs(full_path)

os.chdir(full_path)


subprocess.run(["git", "remote", "add", "-f", new_name, repo], check=True)


def add_subtree(branch_name):

    command = [
        "git",
        "subtree",
        "add",
        "--prefix",
        f"{new_name}/{branch_name}",
        new_name,
        branch_name
    ]

    proc = subprocess.Popen(
        command, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    output, error = proc.communicate()
    print(output.decode(), error.decode())


def main():
    branches_to_clone = ['main']

    with ThreadPoolExecutor(max_workers=10) as executor:
        for branch_name in branches_to_clone:
            executor.submit(add_subtree, branch_name)


if __name__ == "__main__":
    main()


# git remote add -f operating-systems-202.1.3031 https://github.com/TzviGreenfeld/xv6

# git subtree add --prefix=operating-systems-202.1.3031/ operating-systems-202.1.3031 main
