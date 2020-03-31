`docker image build -t mymemo .`  
`docker container run -it -p 8000:8000 -v $(p):/usr/src/app mymemo`  
`docker container exec -it xxx bash`  

`python mymemo/manage.py runserver 0.0.0.0:8000 &`
`python mymemo/manage.py process_tasks &`
