`docker image build -t mymemo .`  
`docker container run -it -p 8000:8000 -v $(p):/usr/src/app mymemo`  
`docker container exec -it xxx bash`  

`python mymemo/manage.py runserver 0.0.0.0:8000 &`
`python mymemo/manage.py process_tasks &`

#### convert sqlite to mongo
`/Users/kin/Downloads/mongodb-macos-x86_64-4.2.7/bin/mongoimport --uri "mongodb+srv://jinyongnan:jinyongnan@cluster0-xk5om.gcp.mongodb.net/mymemo?retryWrites=true&w=majority" --collection memos_memo --jsonArray --file /Users/kin/Desktop/memos_memo.json`