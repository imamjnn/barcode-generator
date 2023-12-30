import axios from "axios";
import { ProductListResponse } from "./barcode.types";

export const fetchProducts = async (
  offset: number = 1,
  limit: number = 14,
  search = ""
) => {
  try {
    const response = await axios.get<ProductListResponse>(
      `http://192.168.1.15:2024/product/barcode?search=${search}&page=${offset}&limit=${limit}&orderBy=created`
    );
    if (response.status === 200) {
      return response.data;
    }
    return null;
  } catch (e) {
    console.log("fetchProducts", e);
    return null;
  }
};
