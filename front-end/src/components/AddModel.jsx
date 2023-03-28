import React, { useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

const AddModel = (props) => {
  let token = localStorage.getItem("accessToken");

  const addContact = () => {
    const url = "https://contect-backend-re.onrender.com/api/contacts";
    axios
      .post(url, props.value, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {})
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  const editContact = () => {
    const url = `http://localhost:5001/api/contacts/${props.value.id}`;
    axios
      .put(url, props.value, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {})
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  return (
    <div>
      <Dialog open={props.open} onClose={props.onClose}>
        <DialogTitle>
          {props.value.edit ? <p>Edit </p> : <p>Add Contact</p>}
        </DialogTitle>
        <DialogContent>
          <TextField
            id="standard-basic"
            type="text"
            autoComplete="off"
            name="name"
            value={props.value.name}
            onChange={props.onChange}
            placeholder=" Name"
            required
          />
          <br />
          <TextField
            id="standard-basic"
            type="text"
            autoComplete="off"
            name="email"
            value={props.value.email}
            onChange={props.onChange}
            placeholder="E-mail"
            required={true}
          />

          <br />
          <TextField
            id="standard-basic"
            type="number"
            autoComplete="off"
            name="phone"
            value={props.value.phone}
            onChange={props.onChange}
            placeholder="Phone-Number"
            required={true}
          />
          <br />
        </DialogContent>
        <DialogActions>
          <Button onClick={props.onClose}>Cancel</Button>

          {props.value.edit ? (
            <Button onClick={editContact}>Edit Contact</Button>
          ) : (
            <Button onClick={addContact}>Add Contact</Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default AddModel;
