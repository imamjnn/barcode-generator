import axios from "axios";
import { ProductListResponse } from "../barcode.types";

export const fetchOnlineProduct = async (
  offset: number = 1,
  limit: number = 14,
  search = "",
  startDate = "",
  endDate = ""
) => {
  try {
    const response = await axios.get<ProductListResponse>(
      `http://103.166.156.240:2024/product/barcode?search=${search}&page=${offset}&limit=${limit}&orderBy=created&startDate=${startDate}&endDate=${endDate}`
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
