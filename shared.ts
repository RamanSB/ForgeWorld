import {
  DOGE_DOG_IMAGE_URL,
  BO_BEAR_IMAGE_URL,
  PEPE_IMAGE_URL,
  PEPE_PIG_IMAGE_URL,
  TWINKY_WINKY_IMAGE_URL,
  CRYPPO_IMAGE_URL,
} from "./screens/CharacterSelectScreen";
import { ICharacter, IWorld, Token } from "./types/types";

export const worlds: IWorld[] = [
  {
    terrain: "Volcano",
    title: "Mine Gems 💎",
    color: "red",
    metadata: { activePlayers: 3, token: Token.RUBY },
    token: Token.RUBY,
  },
  {
    terrain: "Forest",
    title: "Harvest Wood 🪵",
    color: "green",
    metadata: { activePlayers: 3, token: Token.LUMBER },
    token: Token.LUMBER,
  },
  {
    terrain: "Ocean",
    title: "Fish for Pearls 🫧",
    color: "cornflowerblue",
    metadata: { activePlayers: 3, token: Token.PEARL },
    token: Token.PEARL,
  },
];

export const characters: ICharacter[] = [
  { name: "Doge Da Dog", imgSrc: DOGE_DOG_IMAGE_URL },
  { name: "Bober", imgSrc: BO_BEAR_IMAGE_URL },
  { name: "Pepe", imgSrc: PEPE_IMAGE_URL },
  { name: "PepePig", imgSrc: PEPE_PIG_IMAGE_URL },
  { name: "Twinky Winky", imgSrc: TWINKY_WINKY_IMAGE_URL },
  {
    name: "Cryp-Po",
    imgSrc: CRYPPO_IMAGE_URL,
  },
];

// export const alpha_characters: ICharacter[] = [
//   { name: "Doge Da Dog", imgSrc: DOGE_DOG_IMAGE_URL },
//   { name: "Doge Da Dog", imgSrc: DOGE_DOG_IMAGE_URL },
//   { name: "Doge Da Dog", imgSrc: DOGE_DOG_IMAGE_URL },
//   { name: "Doge Da Dog", imgSrc: DOGE_DOG_IMAGE_URL },
//   { name: "Doge Da Dog", imgSrc: DOGE_DOG_IMAGE_URL },
// ];
