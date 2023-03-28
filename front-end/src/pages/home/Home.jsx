import "./Style.css";
import React, { useState, useEffect } from "react";
import axios from "axios";
import AddModel from "../../components/AddModel";
import Button from "@mui/material/Button";
import Data from "../../components/Data";

const Home = () => {
  //logout code

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    window.location.reload();
  };
  const [state, setState] = useState({
    open: false,
    edit: false,
    name: "",
    email: "",
    phone: "",
  });

  let token = localStorage.getItem("accessToken");

  const [array, setarray] = useState([]);
  // console.log(array);
  useEffect(() => {
    const url = "https://contect-backend-re.onrender.com/api/contacts";
    axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // console.log(response);
        setarray(response.data);
      })
      .catch((error) => {
        console.log(error.response.data);
      });
  }, [array]);
  // console.log(array);
  const openAddModel = () => {
    setState({ open: true });
  };

  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onClose = () => {
    setState({ open: false });
  };

  const handleDelete = (_id) => {
    const url = `https://contect-backend-re.onrender.com/api/contacts/${_id}`;
    axios
      .delete(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {})
      .catch((error) => {
        console.log(error.response.data);
      });
  };
  const handleEdit = (row, i) => {
    // console.log(row.name);
    setState({
      open: true,
      edit: true,
      name: row.name,
      email: row.email,
      phone: row.phone,
      id: i,
    });
  };
  // console.log(state);
  return (
    <div>
      <div>
        <h1>User Contact List</h1>
        <Button variant="contained" onClick={openAddModel}>
          Add Contact
        </Button>
        <Button variant="contained" onClick={handleLogout} color="secondary">
          Logout
        </Button>
      </div>
      <AddModel
        open={state.open}
        onClose={onClose}
        onChange={onChange}
        value={state}
        setValue={setState}
      />

      <Data array={array} handleDelete={handleDelete} handleEdit={handleEdit} />
    </div>
  );
};

export default Home;
