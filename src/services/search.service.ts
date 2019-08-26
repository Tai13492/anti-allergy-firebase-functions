import * as RequestPromise from "request-promise";
import * as cheerio from "cheerio";
import { IComputeResponse } from "./compute.service";

interface IProduct {
  brand: string;
  title: string;
  url: string;
}

function beautifyDirtyUrl(str: string): string {
  let words: Array<string> = str.split("-");
  words = words.map(word => capitalizeFirstLetter(word));
  return words.join(" ");
}

function capitalizeFirstLetter(word: string): string {
  return word.charAt(0).toUpperCase() + word.slice(1);
}

export async function extractListOfSearchResults(
  url: string
): Promise<IComputeResponse> {
  const listOfProducts: Array<IProduct> = [];
  try {
    const html = await RequestPromise(url);
    const $ = cheerio.load(html);
    $("li div.search.product-row div.ml-4 a", "ul.list-unstyled").each(
      (index, element) => {
        if (element.attribs.href !== "#") {
          const dirtyUrl: string = element.attribs.href;
          const splittedURL: Array<string> = dirtyUrl.split("/");
          const indexOfProductString: number = splittedURL.indexOf("products");

          if (indexOfProductString === -1)
            throw new Error("ERROR: Please inform Tai to update code");

          let brand: string = splittedURL[indexOfProductString + 1];
          let title: string = splittedURL[indexOfProductString + 2];

          brand = capitalizeFirstLetter(brand);
          title = beautifyDirtyUrl(title);

          listOfProducts.push({
            brand,
            title,
            url: `https://www.skincarisma.com${dirtyUrl}/ingredient_list`
          });
        }
      }
    );
    return {
      error: null,
      data: listOfProducts
    };
  } catch (error) {
    const unknownError: IComputeResponse = {
      error,
      data: null
    };
    return unknownError;
  }
}
