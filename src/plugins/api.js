import { client, Field, Query } from "@tilework/opus";

const API_ENDPOINT = "http://localhost:4000/";

export default class Api {
  constructor() {
    this.client = client;
    this.client.setEndpoint(API_ENDPOINT);
  }

  async getCurrencies() {
    const query = new Query("currencies", true).addFieldList([
      "label",
      "symbol",
    ]);
    const result = await this.client.post(query);

    return result;
  }

  async getCategories() {
    const query = new Query("categories", true).addField("name");
    const result = await this.client.post(query);

    return result;
  }

  async getCategoryData(category) {
    const query = new Query("category")
      .addArgument("input", "CategoryInput", { title: category })
      .addField("name")
      .addField(
        new Field("products", true)
          .addFieldList(["id", "brand", "inStock", "name", "gallery"])
          .addField(this.getPriceField())
          .addField(this.getAttributesField())
      );
    const result = await this.client.post(query);

    return result;
  }
  async getProductData(product) {
    const query = new Query("product")
      .addArgument("id", "String!", product)
      .addFieldList([
        "id",
        "inStock",
        "name",
        "brand",
        "gallery",
        "description",
      ])
      .addField(this.getPriceField())
      .addField(this.getAttributesField());
    const result = await this.client.post(query);

    return result;
  }

  getAttributesField() {
    return new Field("attributes", true)
      .addFieldList(["id", "name", "type"])
      .addField(
        new Field("items", true).addFieldList(["id", "value", "displayValue"])
      );
  }

  getPriceField() {
    return new Field("prices", true)
      .addField("amount")
      .addField(new Field("currency", true).addFieldList(["symbol", "label"]));
  }
}
