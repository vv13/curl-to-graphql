Visit [https://vv13.github.io/curl-to-graphql/](https://vv13.github.io/curl-to-graphql/).

It can convert curl from 
```
curl 'http://localhost:3000/graphql' -H 'Accept-Encoding: gzip, deflate, br' -H 'Content-Type: application/json' -H 'Accept: application/json' -H 'Connection: keep-alive' -H 'DNT: 1' -H 'Origin: http://localhost:3000' -H 'Authorization: Bearer XXX' --data-binary '{"query":"query {\n  article(id: 2){\n    title\n    subTitle\n  }\n}","variables":{"query":{"pageSize":10,"pageNumber":1}}}' --compressed
```

to
```
Graphql Queries:
query {
  article(id: 2) {
    title
    subTitle
  }
}

Graphql Variables:
{
  "query": {
    "pageSize": 10,
    "pageNumber": 1
  }
}

Request Headers:
{
  "Accept-Encoding": "gzip, deflate, br",
  "Content-Type": "application/json",
  "Accept": "application/json",
  "Connection": "keep-alive",
  "DNT": "1",
  "Origin": "http://localhost:3000",
  "Authorization": "Bearer XXX"
}

```
