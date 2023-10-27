import os
import subprocess
from os.path import abspath, dirname, join
from concurrent.futures import ThreadPoolExecutor

specific_dir = "front-end-programming-202.1.3091"

repo = "https://github.com/TzviGreenfeld/hw1-blog"

full_path = join(dirname(abspath(__file__)), specific_dir)

if not os.path.exists(full_path):
    os.makedirs(full_path)

os.chdir(full_path)


subprocess.run(["git", "remote", "add", "-f", "source_repo", repo], check=True)


def add_subtree(branch_name):
    target_dir = join(full_path, branch_name)

    command = [
        "git",
        "subtree",
        "add",
        "--prefix",
        target_dir,
        "source_repo",
        branch_name,
        "--squash"
    ]

    proc = subprocess.Popen(
        command, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    output, error = proc.communicate()
    print(output.decode(), error.decode())


def main():
    branches_to_clone = [
        "Assignment4-vulnerable",
        "Assignment4-protected",
        "Assignment2",
        "Assignment3"
    ]

    with ThreadPoolExecutor(max_workers=10) as executor:
        for branch_name in branches_to_clone:
            executor.submit(add_subtree, branch_name)


if __name__ == "__main__":
    main()
