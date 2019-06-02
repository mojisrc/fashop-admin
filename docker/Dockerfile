FROM centos:7
MAINTAINER wangxingkang<wang_xingkang@qq.com>

ARG PUBLISH_VERSION

RUN yum install -y epel-release && \
    yum install -y nginx


ADD nginx.conf /etc/nginx/nginx.conf
COPY ./dist /usr/share/nginx/html/

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
