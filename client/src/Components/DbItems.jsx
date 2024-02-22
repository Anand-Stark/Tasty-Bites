import React, { useEffect } from "react";
import { DbTable } from "../Components";
import { HiCurrencyRupee } from "react-icons/hi2";
import { useDispatch, useSelector } from "react-redux";
import { alertNull, alertSuccess } from "../context/actions/alertActions";
import { deleteProduct } from "../api";
import { getAllProducts } from "../api";
import { setAllProducts } from "../context/actions/productActions";


const DbItems = () => {
  // getting all the products through getProducts :
  const products = useSelector((state) => state.products);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!products) {
      getAllProducts().then((data) => {
        dispatch(setAllProducts(data));
      });
    }
  }, []);

  return (
    <>
    {products ? (<div className="flex items-center justify-center gap-4 mt-6 px-3 shadow-lg">
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
      title="Product List"
      actions={[
        {
          icon: "edit",
          tooltip: "Edit Data",
          onClick: (event, rowData) => {
            alert("You want to edit : -> " + rowData.productId);
          },
        },
        {
          icon: "delete",
          tooltip: "Delete Data",
          onClick: (event, rowData) => {
            if (
              window.confirm("Are you sure, you want to perform this action")
            ){
               deleteProduct(rowData.productId).then((res) =>{ 
                  dispatch(alertSuccess("Product Deleted Successfully"))
                  setInterval(() => {
                  dispatch(alertNull());
                }, 3000);
               })
               getAllProducts().then((data) => {
                  dispatch(setAllProducts(data));
                });
            }
          },
        },
      ]}
    />
  </div>): <>
     <h1>No Data</h1>
  </>}
    </>
    
    
  );
};

export default DbItems;
