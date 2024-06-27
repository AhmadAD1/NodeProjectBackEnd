import { ICardInput } from "../@types/@types";
import Card from "../db/models/card-model";

export const cardService = {
  createCard: async (data: ICardInput, userId: string) => {
    //userId is extracted from the JWT
    const card = new Card(data);
    card.userId = userId;

    //generate random bizNumber:
    while (true) {
      const r = Math.round(Math.random() * 1_000_000);
      const dbRes = await Card.findOne({ bizNumber: r });
      if (!dbRes) {
        card.bizNumber = r;
        break;
      }
    }

    return card.save();
  },
};
