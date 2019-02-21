FROM node:slim

LABEL maintainer="job@fashop.cn"

WORKDIR /fashop-admin

# ENTRYPOINT 配置容器启动时运行的命令
CMD ["/bin/echo", "fashop-admin docker is ok now"]
