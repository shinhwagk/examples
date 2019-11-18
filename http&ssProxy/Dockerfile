FROM ubuntu:18.04

RUN sed -i 's/archive\.ubuntu/mirrors\.aliyun/g' /etc/apt/sources.list
RUN sed -i 's/security\.ubuntu/mirrors\.aliyun/g' /etc/apt/sources.list
RUN apt update
RUN apt install -y privoxy

RUN sed -i 's/127\.0\.0\.1:8118/0\.0\.0\.0:8118/' /etc/privoxy/config
RUN sed -i '/^listen-address.*]:8118$/d'          /etc/privoxy/config
RUN echo 'forward-socks5t / 127.0.0.1:1080 .' >>  /etc/privoxy/config

ENTRYPOINT ["/usr/sbin/privoxy", "--no-daemon", "/etc/privoxy/config"]