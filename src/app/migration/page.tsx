"use client";

import moment from "moment";
import { fetchOnlineProduct } from "./migration.datasource";

export default function Migration() {
  const loadData = async () => {
    const response = await fetchOnlineProduct(
      1,
      50,
      "",
      "2023-12-28 01:33:23",
      "2023-12-29 23:33:23"
    );
    console.log(response);
  };
  return (
    <div>
      {moment().toDate().toString()}{" "}
      <button onClick={() => loadData()}>check</button>
    </div>
  );
}
