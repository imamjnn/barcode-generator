/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { useEffect, useRef, useState } from "react";
import {
  ItemSelectedParams,
  ProductData,
  ProductPrintsParams,
} from "./barcode.types";
import { fetchProducts } from "./barcode.datasource";
import BarcodeComponent from "./BarcodeComponent";
import { useReactToPrint } from "react-to-print";
import { thousandSeparator } from "@/utils/helpers";
import classNames from "classnames";

export default function Home() {
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const [search, setSearch] = useState("");
  const [products, setProducts] = useState<ProductData[]>([]);
  const [productSelected, setProductSelected] = useState<ItemSelectedParams[]>(
    []
  );
  const [productPrints, setProductPrints] = useState<ProductPrintsParams[]>([]);
  const [printCount, setPrintCount] = useState<any>({});
  const [priceSelected, setPriceSelected] = useState<any>({});

  useEffect(() => {
    if (search) {
      loadProduct();
    }
  }, [search]);

  const loadProduct = async () => {
    const response = await fetchProducts(1, 8, search);
    if (response) {
      if (response.status !== 0) {
        setProducts(response.data);
      }
    }
  };

  const onSelectItem = (item: ProductData) => {
    if (!productSelected.find((a) => a.product_code === item.product_code)) {
      const dfPrice = item.prices.filter((a) => a.type === "retail_price")[0];
      setProductSelected([
        ...productSelected,
        {
          name: item.name,
          prices: item.prices,
          product_code: item.product_code,
        },
      ]);
      setProductPrints([
        ...productPrints,
        {
          name: item.name,
          price: dfPrice.price,
          product_code: item.product_code,
        },
      ]);
      setPrintCount({ ...printCount, [item.product_code]: 1 });
      setPriceSelected({
        ...priceSelected,
        [item.product_code]: dfPrice.price,
      });
    }
  };

  const onChangeCount = (item: ItemSelectedParams, value: string) => {
    setPrintCount({
      ...productSelected.filter((a) => a.product_code !== item.product_code),
      [item.product_code]: value,
    });
    var data = [];
    for (var i = 0; i < Number(value); i++) {
      data.push({
        name: item.name,
        price: priceSelected[item.product_code],
        product_code: item.product_code,
      });
    }
    setProductPrints([
      ...productPrints.filter((a) => a.product_code !== item.product_code),
      ...data,
    ]);
  };

  const onDelete = (code: number) => {
    setProductSelected([
      ...productSelected.filter((a) => a.product_code !== code),
    ]);
    setProductPrints([...productPrints.filter((a) => a.product_code !== code)]);
  };

  const onSelectTypePrice = (item: ItemSelectedParams, value: string) => {
    setPriceSelected({
      ...priceSelected,
      [item.product_code]: value,
    });
    setProductSelected([
      ...productSelected.filter((a) => a.product_code !== item.product_code),
      {
        name: item.name,
        prices: item.prices,
        product_code: item.product_code,
      },
    ]);
    setProductPrints([
      ...productPrints.filter((a) => a.product_code !== item.product_code),
      {
        name: item.name,
        price: Number(value),
        product_code: item.product_code,
      },
    ]);
    setPrintCount({ ...printCount, [item.product_code]: 1 });
  };

  return (
    <div className="flex h-full">
      <div className="flex w-full">
        <div className="flex h-full flex-grow card rounded-box p-10">
          <h1>Barcode Print</h1>
          <div className="dropdown">
            <input
              type="text"
              placeholder="cari nama atau kode produk"
              className="input input-bordered w-full"
              onChange={(e) => setSearch(e.target.value)}
            />
            {search ? (
              <ul className="p-2 shadow menu dropdown-content z-[1] bg-base-100 rounded-box w-full">
                {products.length !== 0 ? (
                  products.map((item) => (
                    <li key={item.product_code}>
                      <a
                        href="#"
                        className={classNames(
                          productSelected.find(
                            (a) => a.product_code === item.product_code
                          )
                            ? "bg-base-300"
                            : ""
                        )}
                        onClick={() => onSelectItem(item)}
                      >
                        <div>
                          <p className="font-semibold">{item.name}</p>
                          <p>{item.product_code}</p>
                        </div>
                      </a>
                    </li>
                  ))
                ) : (
                  <div className="text-gray-400">no data</div>
                )}
              </ul>
            ) : null}
          </div>
          <div className="pt-10 pb-10">
            {productSelected.map((item) => (
              <div
                key={item.product_code}
                className=" mb-4 flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold">{item.name}</p>
                  <p>{item.product_code}</p>
                  <p className="font-semibold">
                    Rp{thousandSeparator(priceSelected[item.product_code])}
                  </p>
                </div>
                <div className="flex items-center">
                  <select
                    className="select select-bordered w-full max-w-xs mr-10"
                    onChange={(e) => onSelectTypePrice(item, e.target.value)}
                    value={priceSelected[item.product_code]}
                  >
                    {item.prices.map((pr) => (
                      <option
                        key={pr.type}
                        value={pr.price}
                        selected={
                          priceSelected &&
                          priceSelected[item.product_code] === item.product_code
                            ? true
                            : false
                        }
                      >
                        {pr.type === "retail_price"
                          ? "Harga Eceran"
                          : pr.type === "normal_price"
                          ? "Harga Normal"
                          : "Harga 1"}
                      </option>
                    ))}
                  </select>
                  <input
                    type="number"
                    min={1}
                    value={printCount[item.product_code]}
                    placeholder="Jumlah"
                    className="input input-bordered w-[120px] mr-10"
                    onChange={(e) => onChangeCount(item, e.target.value)}
                  />
                  <button
                    className="btn btn-circle btn-outline btn-error"
                    onClick={() => onDelete(item.product_code)}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="h-6 w-6"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M6 18L18 6M6 6l12 12"
                      />
                    </svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
          {productPrints.length !== 0 && (
            <button className="btn" onClick={handlePrint}>
              PRINT
            </button>
          )}
        </div>
        {/* <div className="divider divider-horizontal">OR</div> */}
        <div className="flex h-full flex-grow card bg-base-300 rounded-box place-items-center">
          {/* {productPrints.map((a, i) => (
            <div key={i}>
              {a.product_code} {a.price}
            </div>
          ))} */}
          <div>
            <BarcodeComponent ref={componentRef} data={productPrints} />
          </div>
        </div>
      </div>
    </div>
  );
}
