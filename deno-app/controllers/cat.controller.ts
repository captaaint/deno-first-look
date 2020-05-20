import { Cat } from "../models/cat.ts";
import db  from "../database/database.ts";

export class CatController {

  database: any;
  cats: any

  constructor() {
    this.database = db.getDatabase;
    this.cats = this.database.collection('cats'); 
  }

  // @desc Get Cats
  // @route GET /cats

  getCats = async ({ response }: { response: any }) => {
    try {
      response.body = await Cat.selectAll();
      response.status = 200;
    } catch (err) {
      console.log("Error - getCats: ", err);
      response.body = { msg: "Server error" };
      response.status = 300;
    }
  };

  // @desc Get Cat
  // @route GET /cats/:id
  getCat = async ({ params, response }: { params: { id: string }; response: any }) => {
    try {
      const cat = await Cat.selectById(params.id);
      if (cat) {
        response.body = cat;
        response.status = 200;
      } else {
        response.body = { msg: `Cannot find cat: ${params.id}` };
        response.status = 401;
      }
    } catch(err) {
      console.log("Error - getCat: ", err);
      response.body = { msg: "Server error" };
      response.status = 300;
    }
  };

  // @desc Add Cat
  // @route POST /cats
  newCat = async ({ request, response }: { request: any; response: any }) => {
    const body = await request.body();
    const cat: Cat = body.value;
    try {
      const insertId = await Cat.create(cat);
      response.body = { msg: "OK", id: insertId };
      response.status = 200;
    } catch(err) {
      console.log("Error - newCat: ", err);
      response.body = { msg: "Server error" };
      response.status = 300;
    }
  };

  // @desc Update Cat
  // @route PUT /cats/:id
  updateCat = async ({ params, request, response }: { params: { id: string }, request: any; response: any }) => {
    const body = await request.body();
    const { name } = body.value;
    try {
      const matchedCount = await Cat.update(params.id, name);
      if (matchedCount) {
        response.body = { msg: "Ok"};
        response.status = 200;
      } else {
        response.body = { msg: `Can't find cat: ${params.id}` };
        response.status = 401;
      }
    } catch(err) {
      console.log("Error - updateCat: ", err);
      response.body = { msg: "Server error" };
      response.status = 300;
    }
  };

  // @desc Delete Cat
  // @route DELETE /cats/:id
  deleteCat = async ({ params, request, response }: { params: { id: string}, request: any, response: any}) => {
    try {
      const deleteCount = await Cat.delete(params.id);
      if (deleteCount) {
        response.body = { msg: "Ok"};
        response.status = 200;
      } else {
        response.body = { msg: `Can't find cat: ${params.id}`};
        response.status = 401;
      }
    } catch (err) {
      console.log("Error - updateCat: ", err);
      response.body = { msg: "Server error" };
      response.status = 300;
    }
  }
}
