#!/bin/bash
#
# Determine the environment we will be building for and deploying to based on the given branch
# name. Write the name of the environment to a temporary file which other scripts can refer to.
#

set -e

branch="${1}"
environment_name=""
output_file="./.environment-name"

if [ "${branch}" == "" ]; then
    echo "Usage: scripts/determine-environment-name.sh <branch-name>"
fi

if [ "${branch}" == "master" ]; then
    environment_name="production"
else
    environment_name="test"
fi

echo "${environment_name}" > $output_file
