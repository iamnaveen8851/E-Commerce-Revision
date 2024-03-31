import axios from "axios";
import React, { useContext, useReducer } from "react";
import Loading from "../components/Loading";
import Error from "../components/Error";
import { AuthContext } from "../context/AuthContextProvider";
import { useNavigate } from "react-router-dom";
import { Input, Table, Tbody, Tr, Box, Text } from "@chakra-ui/react";
function reducer(state, { type, payload }) {
  switch (type) {
    case "email":
      return {
        ...state,
        email: payload,
      };

    case "password":
      return { ...state, password: payload };

    case "reset":
      return { ...state, email: "", password: "" };

    case "loading":
      return { ...state, loading: true, error: false };

    case "success":
      return { ...state, loading: false, error: false };
    case "error":
      return { ...state, error: true, loading: false };
    default:
      return state;
  }
}
const Login = () => {
  const [state, dispatch] = useReducer(reducer, {
    email: "",
    password: "",
    loading: false,
    error: false,
  });

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();
  const { loading, error, email, password } = state;

  async function handleSubmit(e) {
    e.preventDefault();
    dispatch({
      type: "reset",
    });

    dispatch({
      type: "loading",
    });
    try {
      let res = await axios.post("https://reqres.in/api/login", {
        ...state,
        email: email,
        password: password,
      });
      console.log(res.data);
      dispatch({
        type: "success",
      });

      login(res.data.token);
      navigate("/");
    } catch (error) {
      dispatch({
        type: "error",
      });
    }
  }

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <Error />;
  }
  return (
    <Box>
      <form onSubmit={handleSubmit}>
        <Text>Email</Text>
        <Input
          type="text"
          value={email}
          onChange={(e) =>
            dispatch({
              type: "email",
              payload: e.target.value,
            })
          }
        />
        <Text>Password</Text>
        <Input
          type="text"
          value={password}
          onChange={(e) =>
            dispatch({
              type: "password",
              payload: e.target.value,
            })
          }
        />
        <Input type="submit" />
      </form>
    </Box>
  );
};

export default Login;
