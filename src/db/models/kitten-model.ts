import mongoose from "mongoose";
import kittenSchema from "../schemas/kitten-schema";

const Kitten = mongoose.model("Cat", kittenSchema);

export default Kitten;