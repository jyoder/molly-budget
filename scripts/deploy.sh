#!/bin/bash
#
# Deploy the project to firebase in the appropriate environment.
#

set -e

firebase="./node_modules/.bin/firebase"
project_base="molly-budget"

environment_name=`cat .environment-name`
project='';

if [ "${environment_name}" == "production" ]; then
    project=$project_base
elif [ "${environment_name}" == "test" ]; then
    project="${project_base}-test"
else
    project="${project_base}-development"
fi

$firebase deploy --token=$FIREBASE_TOKEN --project $project --non-interactive
