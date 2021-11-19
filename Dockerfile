# Stage 1 - the build process
FROM quay.io/bitnami/node as build-deps
WORKDIR /usr/src/app
COPY package.json . 
RUN yarn set version berry
COPY yarn.lock .yarn .yarnrc.yml ./
RUN yarn install
COPY . ./
RUN yarn build

# Stage 2 - build NGINX image
FROM registry.fedoraproject.org/fedora-minimal

RUN microdnf -y install nginx \
  && microdnf clean all

COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/

USER 1001
EXPOSE 8080
STOPSIGNAL SIGTERM
CMD ["nginx", "-g", "daemon off;"]
