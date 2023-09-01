#!/bin/bash
#
current_dir=$(cd $(dirname $0); pwd)
sudo su
cp ${current_dir}/clash.service /etc/systemd/system
systemctl enable clash
systemctl start clash
echo "Clash has already started and ben set autostart"