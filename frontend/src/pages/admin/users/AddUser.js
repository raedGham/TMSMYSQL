import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { toast } from "react-toastify";
import { validateEmail, registerUser } from "../../../services/authService";
import UserForm from "./UserForm";
import { useDispatch } from "react-redux";

import Loader from "../../../components/loader/Loader";
import logo from "../../../assets/Logo.png";
const initialState = {
  name: "",
  email: "",
  type: "",
  password: "",
  password2: "",
};

function AddUser() {
  const [formData, setFormData] = useState(initialState);
  const [isLoading, setIsLoading] = useState(false);
  const { name, email, password, password2, type } = formData;
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const addUser = async (e) => {
    e.preventDefault();

    // validation
    if (!name || !email || !password || !type) {
      return toast.error("All fields are required");
    }

    if (password.length < 6) {
      return toast.error("Password must be at least 6 chars ");
    }

    if (!validateEmail(email)) {
      return toast.error("Please Enter a valid Email");
    }

    if (password !== password2) {
      return toast.error("Passwords do not match");
    }

    const userData = { name, email, password, type };
    setIsLoading(true);

    // attemps to add the user
    try {
      const data = await registerUser(userData);
      // console.log(data)

      navigate(-1);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log(error.message);
    }
  };

  return (
    <UserForm
      name={name}
      email={email}
      password={password}
      password2={password2}
      type={type}
      handleInputChange={handleInputChange}
      addUser={addUser}
      formTitle={"Add User"}
    />
  );
}

export default AddUser;
