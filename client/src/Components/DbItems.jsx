import React from "react";
import { DbTable } from "../Components";
import { HiCurrencyRupee } from "react-icons/hi2";
import { useSelector } from "react-redux";

const DbItems = () => {
  // getting all the products through getProducts :
  const products = useSelector((state) => state.products);

  return (
    <div className="flex items-center justify-center gap-4 mt-6 px-3 shadow-lg">
      <DbTable
        columns={[
          {
            title: "Image",
            field: "prod_image",
            render: (rowData) => (
              <img
                src={rowData.prod_image}
                className="w-32 h-16 object-contain rounded-md"
                alt="no"
              />
            ),
          },
          {
            title: "Name",
            field: "prod_name",
          },
          {
            title: "Category",
            field: "prod_category",
          },
          {
            title: "Price",
            field: "prod_price",
            render: (rowData) => (
              <p className="text-lg font-semibold text-textColor flex items-center justify-center ">
                <HiCurrencyRupee className="text-red-400" />
                {parseFloat(rowData.prod_price).toFixed(2)}
              </p>
            ),
          },
        ]}
        data={products}
        title="List of Products"
      />
    </div>
  );
};

export default DbItems;
