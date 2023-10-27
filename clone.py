import os
import subprocess
from os.path import abspath, dirname, join
from concurrent.futures import ThreadPoolExecutor

specific_dir = "front-end-programming-202.1.3091"

full_path = join(dirname(abspath(__file__)), specific_dir)

if not os.path.exists(full_path):
    os.makedirs(full_path)

os.chdir(full_path)


def clone_branch(github_url, branch_name):
    command = [
        "git",
        "clone",
        "--single-branch",
        "--branch",
        branch_name,
        github_url,
        branch_name,
    ]
    proc = subprocess.Popen(
        command, stdout=subprocess.PIPE, stderr=subprocess.PIPE)
    output, error = proc.communicate()
    print(output.decode(), error.decode())


def main():
    github_url = "https://github.com/TzviGreenfeld/hw1-blog"
    branches_to_clone = [
        "Assignment4-vulnerable",
        "Assignment4-protected",
        "Assignment2",
        "Assignment3"
    ]

    with ThreadPoolExecutor(max_workers=10) as executor:
        for branch_name in branches_to_clone:
            executor.submit(clone_branch, github_url, branch_name)


if __name__ == "__main__":
    main()
