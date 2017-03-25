#!/bin/sh
[ -z "$GH_TOKEN" ] && {
    echo "no GH_TOKEN set, aborting."
    exit 1
}

# This will build, package and upload the app to GitHub.
if uname -a | grep Darwin &> /dev/null; then
    node_modules/.bin/build --x64 --mac -p always
else
    node_modules/.bin/build --ia32 --win -p always
fi
