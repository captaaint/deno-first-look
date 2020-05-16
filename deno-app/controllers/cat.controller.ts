import { Cat } from "../models/cat.ts";
import db  from "../database/database.ts";

export class CatController {

  database: any;
  cats: any

  constructor() {
    this.database = db.getDatabase;
    this.cats = this.database.collection('cats'); 
  }

  getCats = async ({ response }: { response: any }) => {

    try {
      const catList = await this.cats.find();
      response.body = catList;
      response.status = 200;
    } catch (err) {
      console.log("Error - getCats: ", err);
      response.body = { msg: "Server error" };
      response.status = 300;
    }
  };

  getCat = async ({ params, response }: { params: { id: string }; response: any }) => {
    try {
      const cat = await this.cats.findOne({ _id: { "$oid": params.id } });
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

  newCat = async ({ request, response }: { request: any; response: any }) => {
    const body = await request.body();
    const cat: Cat = body.value;

    try {
      const insertId = await this.cats.insertOne(cat);
      console.log(insertId);
      response.body = { msg: "OK", id: insertId };
      response.status = 200;
    } catch(err) {
      console.log("Error - newCat: ", err);
      response.body = { msg: "Server error" };
      response.status = 300;
    }
  };

  updateCat = async ({ params, request, response }: { params: { id: string }, request: any; response: any }) => {
    const body = await request.body();
    const { name } = body.value;

    try {
      const { matchedCount, modifiedCount, upsertedId } = await this.cats.updateOne(
        { _id: { "$oid": params.id } },
        { $set: { name: name } }
      );

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

  deleteCat = async ({ params, request, response }: { params: { id: string}, request: any, response: any}) => {
    try {
      const deleteCount = await this.cats.deleteOne({ _id: { "$oid": params.id } });
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
