import { Application } from "https://deno.land/x/oak/mod.ts";
import { CatRouter } from "./routes/cat.route.ts";
import { assertEquals } from "https://deno.land/std/testing/asserts.ts";

const app = new Application();
const catRouter = new CatRouter();

app.use(catRouter.routes());
app.use(catRouter.allowedMethods());

const env = Deno.env.toObject();
const PORT = env.PORT || 4000;
const HOST = env.HOST || "127.0.0.1";

console.log("App's listening...");

app.listen(`${HOST}:${PORT}`);


Deno.test({
    name: "getCat test",
     async fn() {
         const res = await fetch('http://127.0.0.1:4000/cats/5ec0286d00f665760097b964');
         const data = await res.json()
         const expectedData = { _id: { $oid: "5ec0286d00f665760097b964" }, name: "Folti" };
         assertEquals(data, expectedData);
    },
  });
