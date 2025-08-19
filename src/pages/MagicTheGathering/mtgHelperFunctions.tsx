import type { MtgCard } from "../../types/mtg-types";

export function mtgCard(
  name: string,
  cost: string,
  url: string,
  description?: string
): MtgCard {
  return {
    name: name,
    manaCost: cost,
    magicardsInfoUrl: url,
    description: description
  };
}
