import { Cat } from "../@types/@types";
import Kitten from "../db/models/kitten-model";

const createKitten = (cat: Cat) => {
  const c = new Kitten(cat);
  return c.save();
};

const getAllKittens = () => {
  return Kitten.find();
};

const findCatByName = (name: string) => {
  return Kitten.find({ name: name });
};

export { createKitten, getAllKittens, findCatByName };
