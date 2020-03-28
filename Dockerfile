# Stage 1 - the build process
FROM node as build-deps
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build

# Stage 2 - build NGINX image
FROM registry.fedoraproject.org/fedora-minimal

RUN microdnf -y install nginx \
  && microdnf clean all

# Forward request logs to Docker log collector
RUN ln -sf /dev/stdout /var/log/nginx/access.log \
  && ln -sf /dev/stderr /var/log/nginx/error.log \
  && mv /etc/nginx/nginx.conf.default /etc/nginx/nginx.conf \
  && chmod 777 /run \
  && sed -i 's/listen  .*/listen 8080;/g' /etc/nginx/nginx.conf

COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html

USER 1001
EXPOSE 8080
STOPSIGNAL SIGTERM
CMD ["nginx", "-g", "daemon off;"]
