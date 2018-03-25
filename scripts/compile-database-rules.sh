#
# Compiles the Firebase database rules.
#

set -e


node_modules/.bin/firebase-bolt < database.rules.bolt > database.rules.json
