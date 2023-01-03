#!/bin/sh
#cd group_11155
#cd PF
cd PB
python3 -m pip install virtualenv
python3 -m virtualenv -p `which python3.10` venv
source venv/bin/activate
pip3 install -r requirements.txt
cd ..
chmod +x run.sh


