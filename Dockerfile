FROM uber/web-base-image:1.0.4

WORKDIR /fusionjs-github-io

COPY package.json yarn.lock /fusionjs-github-io/
RUN yarn

COPY . .
