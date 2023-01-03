#!/bin/sh

cd PB
python3 manage.py runserver&
cd ..
cd PF
npm install
npm start


