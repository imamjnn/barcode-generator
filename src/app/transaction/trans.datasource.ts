import axios from "axios";
import { ReporProductTransResponse } from "./trans.types";

export const fetchReportProductTrans = async (
  startDate: string,
  endDate: string,
  search: string = "",
  page: number = 1,
  limit: number = 20
) => {
  try {
    const response = await axios.get<ReporProductTransResponse>(
      `http://localhost:2024/report/product-transaction?startDate=${startDate}&endDate=${endDate}&search=${search}&page=${page}&limit=${limit}`,
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
    return null;
  }
};
