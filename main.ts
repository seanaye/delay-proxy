import { serve } from "https://deno.land/std/http/server.ts";

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const someCorsShit = (req: Request) => ({
  "Access-Control-Allow-Origin": req.headers.get("Origin") || "*",
  "Access-Control-Allow-Headers":
    req.headers.get("Access-Control-Allow-Headers") ??
      "Content-Type, Authorization",
  "Access-Control-Allow-Methods":
    req.headers.get("Access-Control-Request-Methods") ?? "*",
  "Access-Control-Allow-Credentials": "true",
});

serve(async (req) => {
  const u = new URL(req.url);
  const [, delay, ...originalUrl] = u.pathname.split("/");
  if (!delay || !originalUrl) {
    return new Response("Invalid URL", { status: 400 });
  }

  const numberDelay = Number(delay);
  if (isNaN(numberDelay)) {
    return new Response("Invalid delay", { status: 400 });
  }

  let formatted: URL;
  try {
    formatted = new URL(originalUrl.join("/"));
  } catch {
    return new Response("Invalid URL", { status: 400 });
  }


  await sleep(numberDelay);

  if (req.method === "OPTIONS") {
    return new Response(null, {
      headers: someCorsShit(req),
      status: 200,
    });
  }


  return fetch(formatted, req);
}, { port: 8080 });
