import { PeanutButterIngredients } from "./peanut-butter-ingredients";
import { ProteinOatsIngredients } from "./protein-oats-ingredients";

export function IngredientsPage() {
  return (
    <>
      <ProteinOatsIngredients />
      <PeanutButterIngredients />
    </>
  );
}
