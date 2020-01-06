# Stage 1 - the build process
FROM node as build-deps
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN yarn
COPY . ./
RUN yarn build

# Stage 2 - the production environment
FROM nginx:alpine
COPY --from=build-deps /usr/src/app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]

#FROM registry.redhat.io/ubi8/ubi
#
#RUN yum --disableplugin=subscription-manager -y install httpd \
#  && yum --disableplugin=subscription-manager clean all
#
#COPY --from=build-deps /usr/src/app/build /var/www/html
#RUN sed -i 's/Listen 80/Listen 8080/' /etc/httpd/conf/httpd.conf \
#  && chgrp -R 0 /var/log/httpd /var/run/httpd \
#  && chmod -R g=u /var/log/httpd /var/run/httpd 
#
#EXPOSE 8080
#USER 1001
#CMD httpd -D FOREGROUND
