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
    <div ref={ref}>
      <div className="grid gap-x-[10px] grid-cols-2 w-auto, pt-[6px]">
        {data?.map((item, index) => {
          return (
            <div
              key={item.product_code}
              className={classNames(
                "grid justify-center items-center, pb-[12px]",
                data.map((b, i) => i * 2).find((a) => a === index + 1)
                  ? "ml-[-18px]"
                  : "mr-[-52px]"
              )}
            >
              <div className=" bg-white max-h-[75px] h-[75px] max-w-[144px] w-[144px]">
                <div className="h-[30px] w-[144px] grid justify-center items-center, mt-[-4px]">
                  <Barcode
                    height={16}
                    width={1.2}
                    value={String(item.product_code)}
                    fontSize={8}
                    displayValue={true}
                    format="CODE128"
                  />
                </div>
                <div className="h-[45px] pt-2 relative">
                  <div className="text-[10px] leading-3 pl-1 pr-1">
                    {item.name}
                  </div>
                  <div className="font-semibold text-[10px] bottom-0 right-0 absolute">
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
