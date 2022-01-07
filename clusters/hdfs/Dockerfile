FROM ubuntu:20.04

WORKDIR /code

COPY ./hadoop-3.3.1 .

RUN apt-get update -y

RUN apt-get install -y openjdk-8-jdk

CMD ["bin/hdfs", "datanode"]

