#!/bin/bash
#
# Build the project for the appropriate environment.
#

set -e


scripts/determine-environment-name.sh "${CIRCLE_BRANCH}"
scripts/set-environment-name.sh
yarn build

scripts/compile-database-rules.sh
