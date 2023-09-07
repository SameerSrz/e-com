import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { server } from "../server";
import axios from "axios";

const Activation = () => {
  const { activation_token } = useParams();
  const [error, setError] = useState(false);
  useEffect(() => {
    if (activation_token) {
      const sendRequest = async () => {
        await axios
          .post(`${server}/activation`, {
            activation_token,
          })
          .then((res) => {
            console.log(res);
          })
          .catch((err) => {
            setError(true);
          });
      };
      sendRequest();
    }
  }, [activation_token]);
  return (
    <>
      <div
        style={{
          width: "100%",
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {error ? (
          <p>Your Token is expired</p>
        ) : (
          <p>Your account has been successfully created</p>
        )}
      </div>
    </>
  );
};

export default Activation;
