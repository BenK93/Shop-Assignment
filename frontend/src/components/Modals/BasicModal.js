import React from "react";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";

import { makeStyles } from "@material-ui/core/styles";

function getModalStyle() {
  return {
    top: `50%`,
    left: `50%`,
    transform: `translate(-50%, -50%)`,
  };
}
const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: "2px solid #000",
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export const BasicModal = (props) => {
  const [modalStyle] = React.useState(getModalStyle);
  const classes = useStyles();

  const body = (
    <div style={modalStyle} className={classes.paper}>
      <h2 id="simple-modal-title">Would You Like to Set Your Order?</h2>
      <br />
      {props.order.map((p) => {
        return (
          <>
            <p>
              <strong>Product:</strong>
              {p.name} <strong>Price:</strong>
              {p.price}
            </p>
            <br />
          </>
        );
      })}
      <Button size="medium" onClick={props.sendOrder} color="primary">
        Set My Order!
      </Button>
    </div>
  );

  return (
    <Modal
      open={props.open}
      onClose={props.handleClose}
      aria-labelledby="simple-modal-title"
      aria-describedby="simple-modal-description"
    >
      {body}
    </Modal>
  );
};
