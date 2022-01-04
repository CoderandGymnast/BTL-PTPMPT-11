FROM ubuntu:20.04

RUN apt-get update -y

RUN apt-get install -y openjdk-8-jdk

WORKDIR /code

RUN apt-get install -y python3-pip

COPY requirements.txt .

RUN pip install -r requirements.txt

COPY . .

CMD [ "python3", "./__main__.py" ]


