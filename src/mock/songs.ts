import { ResponseResolver } from "msw";
import { MockResolveFn } from "./types";

export interface Songs {
  id: number;
  name: string;
  artist: string;
}

const songsData: Songs[] = [
  {
    id: 1,
    name: "strawberry moon",
    artist: "iu",
  },
  {
    id: 2,
    name: "ต้องชอบแค่ไหน",
    artist: "PRETZELLE",
  },
  {
    id: 3,
    name: "TRICK OR TREAT",
    artist: "4EVE",
  },
];

export const songsHandler: MockResolveFn = (_req, res, ctx) => {
  return res(ctx.status(200), ctx.json<Songs[]>(songsData));
};
