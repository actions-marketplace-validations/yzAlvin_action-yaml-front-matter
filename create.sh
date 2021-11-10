#!/bin/bash
json=${1}
numberOfFiles=$(($(jq length <<< ${json})-1))

for n in $(seq 0 $numberOfFiles); do 
	jq -r ".[$n]" <<< ${json} > $n.json ; 
done