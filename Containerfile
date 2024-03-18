# Stage 1 - the build process
FROM quay.io/fedora/nodejs-20 as build-deps
WORKDIR /tmp
RUN npm install -g yarn
RUN yarn set version stable
COPY package.json yarn.lock .yarnrc.yml ./
RUN yarn install
COPY . ./
RUN yarn build

# Stage 2 - build NGINX image
FROM quay.io/fedora/fedora-minimal

RUN microdnf -y install nginx \
  && microdnf clean all

COPY --from=build-deps /tmp/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/

USER 1001
EXPOSE 8080
STOPSIGNAL SIGTERM
CMD ["nginx", "-e", "stderr"]
