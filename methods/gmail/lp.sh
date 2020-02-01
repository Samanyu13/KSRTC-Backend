#!/bin/bash
# Basic while loop
counter=1
while [ $counter -le 90 ]
do
node sendmail.js
sleep 5
((counter++))
done
echo All done
