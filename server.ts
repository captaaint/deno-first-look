import { Application } from "https://deno.land/x/oak/mod.ts";
import { router as catRouter } from "./routes/cat.route.ts";

const app = new Application();

app.use(catRouter.routes());
app.use(catRouter.allowedMethods());

const env = Deno.env.toObject();
const PORT = env.PORT || 4000;
const HOST = env.HOST || "127.0.0.1";

console.log("App's listening...");

await app.listen(`${HOST}:${PORT}`);

