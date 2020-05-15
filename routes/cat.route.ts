import { Router } from "https://deno.land/x/oak/mod.ts";
import { getCats } from "./../controllers/cat.controller.ts"

const router = new Router();

router.get("/cats", getCats);

export {
    router
}
