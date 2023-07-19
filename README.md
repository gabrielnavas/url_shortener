## Requirements

- Send a URL to generate and obtain a unique hash.
- Send a URL with a hash and redirect to the original link.

<br>

### Create a hash URL
`POST` /endpoint/url

##### Request body:
```json
{
  url: 'https://example.com/path'
}
```

Response: `200 OK` with body:
```json
{
  hash: 'un!qu&h@sh',
  validity: 1689788620253
}
```


<br>

### Find an original URL
`GET` endpoint/url

`Response` status 200, with body:

```json
{
  original_url: 'https://example.com/path',
}
```
