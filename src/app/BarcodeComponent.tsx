/* eslint-disable react/display-name */
"use client";
import classNames from "classnames";
import { ForwardedRef, forwardRef, useEffect, useState } from "react";
import Barcode from "react-barcode";
import { ProductData, ProductSelectedParams } from "./barcode.types";
import { thousandSeparator } from "@/utils/helpers";

type Props = {
  data: ProductSelectedParams[];
};

const BarcodeComponent = forwardRef(({ data }: Props, ref) => {
  useEffect(() => {
    console.log("iua", data);
  }, [data]);

  return (
    // @ts-ignore
    <div ref={ref}>
      <div className="grid gap-x-[10px] grid-cols-2 w-auto">
        {data?.map((item, index) => {
          return (
            <div
              key={item.product_code}
              className={classNames(
                "grid justify-center items-center",
                data.map((b, i) => i * 2).find((a) => a === index + 1)
                  ? "ml-[18px]"
                  : "mr-[-0.1px]"
              )}
            >
              <div className=" bg-white max-h-[58px] h-[58px] max-w-[144px] w-[144px]">
                <div className="w-[144px] grid justify-center items-center">
                  <Barcode
                    height={16}
                    width={1.2}
                    value={String(item.product_code)}
                    fontSize={8}
                    displayValue={false}
                    format="CODE128"
                  />
                </div>
                <div className="grid items-center content-center pl-1 relative mt-[-10px]">
                  <div className="text-[8px] leading-3 text-center">
                    {item.name}
                  </div>
                  <div className="font-semibold text-[10px] text-center">
                    Rp{thousandSeparator(item.price)}
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
});

export default BarcodeComponent;
