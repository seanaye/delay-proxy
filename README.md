# Delay Proxy

Articifically deplay requests sent through the proxy

### Usage

1. run the server
`deno run -A main.ts`

2. make your request e.g.
`fetch("http://localhost:8080/5000/https://example.com")`
Delays for 5000ms and returns contents of page


Works with CORS, authorization headers, and differenet http methods e.g. POST

