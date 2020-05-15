import { listenAndServe } from "https://deno.land/std@0.50.0/http/server.ts";

const s = listenAndServe({ port: 8000 }, async (req) => {
  if (req.method === "GET" && req.url === "/cat") {
    req.respond({
      status: 200,
      body: "Hello Kitty!",
    });
  }
});
