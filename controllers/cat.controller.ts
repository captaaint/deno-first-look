import { Cat } from "../models/cat.ts";
import { cats } from "../database/mock.cats.ts";

export class CatController {

  cats: Cat[];

  constructor() {
    this.cats = cats;
  }

  getCats = ({ response }: { response: any }) => {
    response.body = this.cats;
  };

  getCat = (
    { params, response }: { params: { name: string }; response: any },
  ) => {
    const cat = this.cats.filter((cat) => cat.name == params.name);

    if (cat.length) {
      response.body = cat[0];
      response.status = 200;
      return;
    }

    response.body = { msg: `Cannot find cat: ${params.name}` };
    response.status = 401;
  };

  newCat = async ({ request, response }: { request: any; response: any }) => {
    const body = await request.body();
    const cat: Cat = body.value;
    this.cats.push(cat);

    response.body = { msg: "OK" };
    response.status = 200;
  };

  updateCat = async ({ params, request, response }: { params: { name: string }, request: any; response: any }) => {
    const cat = this.cats.filter(cat => cat.name == params.name);
    const body = await request.body();
    const { name } = body.value;
  
    if (cat.length) {
      cat[0].name = name
      response.body = { msg: "Ok"};
      response.status = 200;
      return;
    }

    response.body = { msg: `Can't find cat: ${params.name}` };
    response.status = 401;
  };

  deleteCat = ({ params, request, response }: { params: { name: string}, request: any, response: any}) => {
    const catsLength = this.cats.length;
    this.cats = this.cats.filter(cat => cat.name !== params.name );

    if (this.cats.length == catsLength) {
      response.body = { msg: `Can't find cat: ${params.name}`};
      response.status = 200;
      return;
    }

    response.body = { msg: "Ok"};
    response.status = 200;
  }
}
