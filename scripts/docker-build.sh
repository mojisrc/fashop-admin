#!/bin/bash

REPOSITORY="registry.cn-beijing.aliyuncs.com/typescript-projects/react-admin-template"
PROJECT_VERSION="0.0.1"

echo '开始...'

# 删除dist、docker/dist目录
rm -rf dist docker/dist

# 执行build
npm run build

# 移动dist >> docker dist
mv dist docker

# 切换工作目录
cd ./docker

# 打包docker
docker build -t $REPOSITORY:$PROJECT_VERSION .

# 启动docker
# docker run -d -p 8080:80 -t react-admin-template:0.0.1

echo '结束...'
