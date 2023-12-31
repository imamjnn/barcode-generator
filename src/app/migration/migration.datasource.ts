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

export const createProduct = async (data: any) => {
  try {
    const response = await axios.post(
      `http://localhost:2024/product/add`,
      data,
      {
        headers: {
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwidXNlcm5hbWUiOiJhZG1pbiIsInJvbGUiOiJhZG1pbiIsImlhdCI6MTcwMjcyNTU5Mn0.p8Qtz7XpBYj4schYeJMkoIC3d8YqhcaK_-WiyAhV8kI",
        },
      }
    );
    if (response.status === 200) {
      return response.data;
    }
    return null;
  } catch (e) {
    console.log(e);
    return null;
  }
};
