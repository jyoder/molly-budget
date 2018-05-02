#!/bin/bash
#
# Determine the environment we will be building for and deploying to based on the given branch
# name. Write the name of the environment to a temporary file which other scripts can refer to.
#

set -e

branch="${1}"
environment_name=""
output_file="./.environment-name"


if [[ "${CI}" == "true" && "${branch}" == "master" ]]; then
    environment_name="production"
elif [ "${CI}" == "true" ]; then
    environment_name="test"
else
    environment_name="development"
fi

echo "${environment_name}" > $output_file
