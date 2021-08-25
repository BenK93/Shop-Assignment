import "./NewOrder.css";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Badge from "@material-ui/core/Badge";
import IconButton from "@material-ui/core/IconButton";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import { BasicModal } from "../../components/Modals/BasicModal";
import { Product } from "../../components/Product/Product";
import { Link } from "react-router-dom";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
    maxWidth: 275,
    display: "inline-block",
    margin: 5,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
}));

const StyledBadge = withStyles((theme) => ({
  badge: {
    right: -3,
    top: 5,
    border: `2px solid ${theme.palette.background.paper}`,
    padding: "0 4px",
  },
}))(Badge);

export const NewOrderView = (props) => {
  const [products, setProducts] = useState([]);
  const [order, setOrder] = useState([]);
  const [orderSentSuccessfully, setOrderSentSuccessfully] = useState(false);
  const [unAuthorized, setUnAuthorized] = useState(false);
  const [open, setOpen] = React.useState(false);
  const classes = useStyles();

  const handleClose = () => {
    setOpen(false);
  };

  const sendOrder = async () => {
    const token = sessionStorage.getItem("token");
    axios
      .post(
        "/api/orders",
        {
          products: order,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + token,
          },
        }
      )
      .then((response) => {
        setOrder([]);
        setOpen(false);
        setOrderSentSuccessfully(true);
      })
      .catch((error) => {
        setUnAuthorized(true);
        setOpen(false);
      });
  };
  const getProducts = async () => {
    const token = sessionStorage.getItem("token");
    axios
      .get("/api/products/", {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
      })
      .then((response) => {
        setProducts(response.data);
      })
      .catch((error) => {});
  };

  const addToOrder = (product) => {
    setOrder([...order, product]);
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <div className="products-container">
      {orderSentSuccessfully && (
        <>
          <Typography color="primary" variant="h6">
            Your order has been sent!
          </Typography>
        </>
      )}
      {unAuthorized && (
        <Typography color="error" variant="h6">
          You are not Authorized - Try logging in again{" "}
          <Link to="/login">Login Page</Link>
        </Typography>
      )}
      {products.map((p) => {
        return (
          <Product
            root={classes.root}
            name={p.name}
            price={p.price}
            addToOrder={addToOrder}
            product={p}
          />
        );
      })}
      <div style={{ with: "100%" }}>
        <IconButton onClick={() => setOpen(!open)} aria-label="cart">
          <StyledBadge badgeContent={order.length} color="secondary">
            <ShoppingCartIcon fontSize="large" />
          </StyledBadge>
        </IconButton>
      </div>
      <BasicModal
        open={open}
        handleClose={handleClose}
        order={order}
        sendOrder={sendOrder}
      />
    </div>
  );
};
