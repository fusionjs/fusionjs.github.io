FROM uber/web-base-image:1.0.4@sha256:54882a63e6d989100f351c6fbc3585922d3659c09384a74039f586d60f9635f8

WORKDIR /fusionjs-github-io

COPY package.json yarn.lock /fusionjs-github-io/
RUN yarn

COPY . .
