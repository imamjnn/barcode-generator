"use client";

import React, { useEffect, useState } from "react";
import moment from "moment";
import { fetchReportProductTrans } from "./trans.datasource";
import { ReporProductTransData } from "./trans.types";
import { thousandSeparator } from "@/utils/helpers";

const Transaction = () => {
  const [data, setData] = useState<ReporProductTransData>();
  const [startDate, setStartDate] = useState("2024-01-01");
  const [endDate, setEndDate] = useState("2024-01-12");

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    const response = await fetchReportProductTrans(
      moment(startDate).startOf("day").format("YYYY-MM-DD HH:mm:ss"),
      moment(endDate).endOf("day").format("YYYY-MM-DD HH:mm:ss"),
      "",
      1,
      100
    );
    console.log(response);
    if (response) {
      if (response.status === 1) {
        setData(response.data);
      }
    }
  };

  const onSubmit = () => {
    loadData();
  };

  return (
    <>
      <div>
        <input
          type="date"
          placeholder="start date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          onKeyDown={(e) => {
            e.preventDefault();
          }}
        />
        <input
          type="date"
          placeholder="end date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          onKeyDown={(e) => {
            e.preventDefault();
          }}
        />
        <button className="btn" onClick={onSubmit}>
          submit
        </button>
      </div>
      <div className="flex w-full">
        <div className="flex h-full flex-grow card rounded-box p-10">
          {data && (
            <div className="overflow-x-auto">
              <table className="table table-xs">
                <thead>
                  <tr>
                    <th></th>
                    <th>Kode Transaksi</th>
                    <th>Grand Total</th>
                    <th>Tanggal</th>
                  </tr>
                </thead>
                <tbody>
                  {data?.transactions.map((item, index) => (
                    <tr key={item.id}>
                      <th>{index + 1}</th>
                      <td>{item.transaction_code}</td>
                      <td className="font-semibold">
                        Rp{thousandSeparator(item.total_price)}
                      </td>
                      <td>
                        {moment(item.created).format("DD MMM YYYY, HH:mm:ss")}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr>
                    <th></th>
                    <th>Kode Transaksi</th>
                    <th>Grand Total</th>
                    <th>Tanggal</th>
                  </tr>
                </tfoot>
              </table>
            </div>
          )}
        </div>
        {data && (
          <div className="flex h-full flex-grow card bg-base-300 rounded-box p-6">
            <p>Jumlah Transaksi: {data?.total_transaction}</p>
            <p>Jumlah Produk: {data?.total_stock_reduced}</p>
            <p>Jumlah Pemasukan: Rp{thousandSeparator(data?.total_sold)}</p>
          </div>
        )}
      </div>
    </>
  );
};

export default Transaction;
