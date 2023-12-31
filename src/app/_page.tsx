"use client";
import BarcodeComponent from "./BarcodeComponent";
import { useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { ProductData, ProductSelectedParams } from "./barcode.types";
import { fetchProducts } from "./barcode.datasource";
import { thousandSeparator } from "@/utils/helpers";

export default function Home() {
  const componentRef = useRef(null);
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const [products, setProducts] = useState<ProductData[]>([]);
  const [productSelected, setProductSelected] = useState<
    ProductSelectedParams[]
  >([]);

  const [search, setSearch] = useState("");
  const [priceSelected, setPriceSelected] = useState<any>(null);

  useEffect(() => {
    loadProduct();
  }, [search]);

  const loadProduct = async () => {
    const response = await fetchProducts(1, 8, search);
    if (response) {
      if (response.status !== 0) {
        setProducts(response.data);
        const arr = response.data.map((a) => {
          console.log(a);
          return {
            key: a.product_code,
            value: a.prices.filter((b) => b.type === "retail_price")[0].price,
          };
        });
        let result = {};
        for (let i = 0; i < arr.length; i++) {
          //@ts-ignore
          result[arr[i].key] = arr[i].value;
        }
        console.log("result", result, arr);
        setPriceSelected(result);
      }
    }
  };

  const onSelectProduct = (item: ProductSelectedParams) => {
    if (productSelected.find((a) => a.product_code === item.product_code)) {
      setProductSelected(
        productSelected.filter((a) => a.product_code !== item.product_code)
      );
    } else {
      setProductSelected([
        ...productSelected,
        { ...item, price: priceSelected[item.product_code] },
      ]);
    }
  };

  return (
    <div className="bg-white p-10">
      <div>
        <BarcodeComponent ref={componentRef} data={productSelected} />
      </div>
      <div className="pb-8">
        <input
          type="text"
          placeholder="cari nama atau kode produk"
          onChange={(e) => setSearch(e.target.value)}
          className="input input-bordered w-full max-w-xs"
        />
      </div>
      {products.map((item) => (
        <div key={item.product_code} className="pb-2 flex">
          <input
            type="checkbox"
            className="accent-pink-500 size-6"
            checked={
              productSelected.find((a) => a.product_code === item.product_code)
                ? true
                : false
            }
            onClick={() =>
              onSelectProduct({
                name: item.name,
                price: item.prices[0].price,
                product_code: item.product_code,
              })
            }
          ></input>
          <div className="pl-3">
            <p className="font-semibold">{item.name}</p>
            <div className="flex gap-x-4">
              <p>{item.product_code}</p>
              <select
                name="prices"
                id="prices"
                onChange={(e) => {
                  setPriceSelected({
                    ...priceSelected,
                    [item.product_code]: e.target.value,
                  });
                  setProductSelected([
                    ...productSelected.filter(
                      (a) => a.product_code !== item.product_code
                    ),
                    {
                      name: item.name,
                      price: Number(e.target.value),
                      product_code: item.product_code,
                    },
                  ]);
                }}
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
              Rp
              {thousandSeparator(
                priceSelected
                  ? priceSelected[item.product_code]
                  : item.prices[0].price
              )}
            </div>
          </div>
        </div>
      ))}

      <div className="absolute right-4 bottom-4">
        <button className="btn" onClick={handlePrint}>
          Print
        </button>
      </div>
    </div>
  );
}
