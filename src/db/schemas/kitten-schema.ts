import { Schema } from "mongoose";
import { Cat } from "../../@types/@types";

const kittenSchema = new Schema<Cat>({
  name: String
});

export default kittenSchema;
