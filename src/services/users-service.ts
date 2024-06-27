import { IJWTPayload, ILogin, IUser } from "../@types/@types";
import User from "../db/models/user-model";
import BizCardsError from "../errors/BizCardsError";
import { authService } from "./auth-service";

const createUser = async (data: IUser) => {
  const user = new User(data);
  //replace the password with it's hash
  const hash = await authService.hashPassword(user.password);
  user.password = hash;
  return user.save();
};

const loginUser = async ({email, password}: ILogin) => {

  const user = await User.findOne({ email });

  if (!user) {
    throw new BizCardsError(401, "Invalid email or password");
  }

  //check the pass:
  const isValid = await authService.comparePassword(password, user.password);

  if (!isValid) {
    throw new BizCardsError(401, "Invalid email or password");
  }
  // payload {isAdmin ,isBusiness, _id}
  const payload: IJWTPayload = {
    _id: user._id.toString(),
    isAdmin: user.isAdmin,
    isBusiness: user.isBusiness,
  };
  return authService.generateJWT(payload);
};

export { createUser , loginUser};