#!/bin/bash
#
# This script is run before the build phase and determines which environment the project is
# configured to be run against. It does so by rewriting the EnvironmentName.js file with the name
# of the environment as taken from .environment-name.
#

set -e

environment_name=`cat .environment-name`
output_file="src/mollybudget/environment/EnvironmentName.js"

echo "// This file was automatically generated by scripts/set-environment-name.sh" > "${output_file}"
echo "export default function environmentName() { return '${environment_name}'; }" >> "${output_file}"
