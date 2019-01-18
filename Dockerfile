FROM node:10

LABEL maintainer="job@fashop.cn"

# 换淘宝源
RUN npm config set registry https://registry.npm.taobao.org/

# umi
RUN npm install -g umi

ADD . fashop-admin-code
VOLUME /fashop-admin-code
WORKDIR /fashop-admin-code

# ENTRYPOINT 配置容器启动时运行的命令
CMD ["/bin/echo", "fashop-admin docker is ok now"]
