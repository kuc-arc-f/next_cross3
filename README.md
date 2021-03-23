# next_cross3

 Version: 0.9.1

 Author  : Kouji Nakashima / kuc-arc-f.com

 date    : 2021/03/22

 update  :

***
### Summary

Next.js + Headless CMS , Cross domain CRUD sample

***
### required

* Next.js : 10.0.0
* react : 16.13.1
* node : 14.11

***
### Setup

npm install

***
### Setup , etc
* next.config.js , 

if change URL, API URL, API_KEY, BASE_URL

```
API_URL: "http://localhost:3003",
MY_API_KEY: "123",
BASE_URL: "http://localhost:3004"
```

* package.json / scripts

if change, port number ( -p )

```
"dev": "next dev -p 3004"
```

***
### start server
* Start :

yarn dev

* if change , release mode

yarn serve


***
### Headless CMS

 kuc-arc-f / headless-2-redis

https://github.com/kuc-arc-f/headless-2-redis

***
### Related : 

Headless CMSを、バックエンドにしたCRUD をNext.jsで作成

https://note.com/knaka0209/n/ncbc51ec619e6

***

