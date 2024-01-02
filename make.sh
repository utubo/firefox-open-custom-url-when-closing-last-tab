#!/usr/bin/sh

SCRIPT_DIR=$(cd $(dirname $0); pwd)
cd $SCRIPT_DIR/src
zip -r ../open-custom-url-when-closing-last-tab.zip *
cd ..
mv -f open-custom-url-when-closing-last-tab.zip open-custom-url-when-closing-last-tab.xpi

