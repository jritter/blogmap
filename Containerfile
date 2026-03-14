# Stage 1 - the build process
FROM quay.io/hummingbird/nodejs:24-builder as build-deps
USER root
# Copy only package definition files first
COPY package.json yarn.lock .yarnrc.yml ./
COPY .yarn/releases .yarn/releases

RUN npm install -g yarn

# Install without --immutable so lockfile can be refreshed (resolutions override react-scripts 0.0.0 → 5.0.1)
RUN yarn install
COPY . ./
RUN yarn build

# Stage 2 - build NGINX image
FROM quay.io/hummingbird/nginx:1.28

# react-scripts outputs to ./build
COPY --from=build-deps ./app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/

USER 1001
EXPOSE 8080
STOPSIGNAL SIGTERM
CMD ["nginx", "-e", "stderr"]
