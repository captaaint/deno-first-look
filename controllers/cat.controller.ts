import { Cat } from "../models/cat.ts";

let cats: Array<Cat> = [
  {
    name: "Maca",
  },
  {
    name: "Folti",
  },
];

const getCats = ({ response }: { response: any }) => {
  response.body = cats;
}

export {
  getCats
}
