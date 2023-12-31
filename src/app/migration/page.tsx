"use client";

import moment from "moment";
import { createProduct, fetchOnlineProduct } from "./migration.datasource";
import { useState } from "react";
import { ProductListResults } from "../barcode.types";

export default function Migration() {
  const [data, setData] = useState<ProductListResults>();
  const [startDate, setStartDate] = useState("2023-12-28 01:33:23");
  const [endDate, setEndDate] = useState("2023-12-29 23:33:23");
  const [page, setPage] = useState(1);

  const loadData = async () => {
    const response = await fetchOnlineProduct(page, 20, "", startDate, endDate);
    console.log(response);
    if (response) {
      setData(response);
    }
  };

  const onSave = () => {
    Promise.all(
      data?.data.map(async (item) => {
        const nPrice = item.prices.filter((a) => a.type === "normal_price")[0];
        const rPrice = item.prices.filter((a) => a.type === "retail_price")[0];
        const oPrice = item.prices.filter((a) => a.type === "other_price")[0];
        const reqData = {
          category_id: item.category_id,
          name: item.name,
          normal_price: nPrice.price,
          normal_price_discount: nPrice.discount,
          other_price: oPrice.price,
          other_price_discount: oPrice.discount,
          photo: null,
          product_unit_id: item.product_unit_id,
          purchase_price: item.purchase_price,
          retail_price: rPrice.price,
          retail_price_discount: rPrice.discount,
          stock: item.stock,
          stock_limit: item.stock_limit,
          stock_opname: item.stock_opname,
          time_promotion: item.time_promotion,
        };
        // console.log("reqData", reqData);
        const response = await createProduct(reqData);
        if (response) {
          return "ok";
        } else {
          return "no";
        }
      })
    )
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };

  return (
    <div>
      {moment().toDate().toString()}
      <div className="grid max-w-sm">
        <input
          className="input input-bordered mb-2"
          type="text"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        />
        <input
          className="input input-bordered mb-2"
          type="text"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
        />
        <input
          className="input input-bordered mb-2"
          type="text"
          value={page}
          onChange={(e) => setPage(Number(e.target.value))}
        />
        <p>
          Total: {data?.total} Page: {data?.page}
        </p>
        <button className="btn" onClick={() => loadData()}>
          check
        </button>
        <button className="btn btn-error" onClick={() => onSave()}>
          save
        </button>
      </div>
    </div>
  );
}
