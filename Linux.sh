#!/bin/bash
#
current_dir=$(cd $(dirname $0); pwd)
cp ${current_dir}/clash.service /usr/lib/systemd/system
systemctl enable clash --now
echo "Clash has already started and ben set autostart"
