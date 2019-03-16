FROM node:10
# This is throwing an Error Width must be multiple of 2
RUN apt-get update && apt-get upgrade -y && apt-get autoremove && apt-get autoclean
RUN apt-get install -y \
        libhidapi-dev \
        libblas-dev \
        liblapack-dev \
        libmcrypt-dev 

WORKDIR /app
COPY . /app
RUN npm install 
EXPOSE 3000
CMD ["node", "index.js"]