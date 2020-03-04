docker image build -t mymemo .
docker container run -it -p 8000:8000 -v $(p):/usr/src/app mymemo
docker container exec -it xxx bash