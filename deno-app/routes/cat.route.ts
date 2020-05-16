import { Router } from "https://deno.land/x/oak/mod.ts";
import { CatController } from "./../controllers/cat.controller.ts"

export class CatRouter extends Router {
    catController: CatController;

    constructor() {
        super();
        this.catController = new CatController();
        this.get("/cats", this.catController.getCats);
        this.get("/cats/:id", this.catController.getCat);
        this.post("/cats", this.catController.newCat);
        this.put("/cats/:id", this.catController.updateCat);
        this.delete("/cats/:id", this.catController.deleteCat);
    }
}
