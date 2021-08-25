import "./Orders.css";
import { useEffect, useState } from "react";
import axios from "axios";
import { DataGrid } from "@material-ui/data-grid";

const OrdersView = (props) => {
  const [rows, setRows] = useState([]);

  const getOrders = async () => {
    const token = sessionStorage.getItem("token");
    axios
      .get("/api/orders/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setRows(response.data.orders);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    getOrders();
  }, []);
  const columns = [
    {
      field: "status",
      headerName: "Status",
      width: 130,
      sortable: true,
    },
    {
      field: "products",
      headerName: "Products",
      sortable: false,
      width: 360,
      valueGetter: (params) =>
        `${params.row.products.map((p) => p.name + ":" + p.price + " ")}`,
    },
    {
      field: "total",
      headerName: "Total",
      width: 110,
      sortable: true,
    },
    {
      align: "center",
      field: "date_of_order",
      headerName: "Date Of Order",
      width: 350,
      editable: true,
    },
  ];

  return (
    <>
      <div style={{ height: 400 }}>
        <DataGrid
          rows={rows}
          style={{ width: "80%", margin: "auto" }}
          columns={columns}
          pageSize={5}
          checkboxSelection
          disableSelectionOnClick
        />
      </div>
    </>
  );
};

export default OrdersView;
