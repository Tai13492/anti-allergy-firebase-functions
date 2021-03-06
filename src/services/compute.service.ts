import * as RequestPromise from "request-promise";
import * as cheerio from "cheerio";

export interface IComputeResponse {
  error: any;
  data: any;
}

const allergyList: Array<string> = [
  "fragrance",
  "2-bromo-2-nitropropane-1",
  "3-diol",
  "phenoxyethanol",
  "methyldibromo glutaronitril",
  "glutaraldehyde",
  "cetrimonium bromide",
  "cetrimide",
  "ammonium lauryl sulfate",
  "linear alkylbenzene sulfonate",
  "alkylbenzene sulfonate",
  "potassium cocoyl glycinate",
  "sodium cocoyl isethionate",
  "sodium lauryl ether sulfate",
  "sodium laureth sulfate",
  "sodium lauryl sulfate",
  "cocoaamphodiacetate",
  "lauryl glucoside"
];

export async function extractIngredients(
  url: string
): Promise<IComputeResponse> {
  const ingredients: Array<string> = [];
  try {
    const html = await RequestPromise(url);
    const $ = cheerio.load(html);
    let image: string | null = null;

    $("td.align-middle", ".ingredients-table").each((index, element) => {
      let item: string | undefined = element.children[0].data;
      if (!item) return;
      item = item.trim();
      if (item.length < 1) return;
      ingredients.push(item.toLowerCase());
    });

    $("img.img-fluid.mb-2", "div.col-4").each((index, element) => {
      if (element.attribs.src.includes("https")) {
        image = element.attribs.src;
      }
    });

    const extractedIngredients: IComputeResponse = {
      error: null,
      data: { ingredients, image }
    };

    return extractedIngredients;
  } catch (error) {
    const unknownError: IComputeResponse = {
      error,
      data: null
    };
    return unknownError;
  }
}

export async function computeAllergy(url: string): Promise<IComputeResponse> {
  try {
    const res: IComputeResponse = await extractIngredients(url);
    const { data, error } = res;

    if (error) throw error;
    const { ingredients, image } = data;
    const ingredientsSet = new Set(ingredients);
    const intersection = [...allergyList].filter(ingredient =>
      ingredientsSet.has(ingredient)
    );

    const extractedAllergy: IComputeResponse = {
      data: { intersection, image },
      error: null
    };

    return extractedAllergy;
  } catch (error) {
    const unknownError: IComputeResponse = {
      error,
      data: null
    };
    return unknownError;
  }
}
