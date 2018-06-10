#!/bin/sh

set -e

npm install
ng build --prod

docker build --tag nferraro/camel-workshop-ui .

