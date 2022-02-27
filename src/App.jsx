import { useEffect, useState } from "react";
import "./App.css";
import "antd/dist/antd.css";
import Transactions from "./components/Transactions/Transactions";
import Model from "./components/Model/Model";

import {  Button, Input, message } from "antd";
import Axios from "axios";
import styled from "styled-components";

//requst to backend
Axios.defaults.baseURL = "https://expressthiraphat.vercel.app/";
const Container = styled.div`
  background-color: #ffff;
  width: 100vw;
  height: 100vh;
  padding-top: 100px;
`;

const Content = styled.div`
  width: 80%;
  margin: auto;
  max-width: 600px;
`;

const Box = styled.div`
  display: flex;
`;

const getToken = (token) => {
  return {
    headers: {
      authorization: `Bearer ${token}`,
    },
  };
};

function App() {
  const [showModel, setShowModel] = useState(false);
  const [transactions, setTransaction] = useState([]);
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const [search, setSearch] = useState("");
  const [token, setToken] = useState();

  const showToken = () => {
    setToken();
    localStorage.removeItem("token");
    setTransaction([]);
  };

  const fetchTransaction = async () => {
    const res = await Axios.get("/api/transactions", getToken(token));
    setTransaction(res.data.transactions);
  };
  const createModel = async (transaction) => {
     await Axios.post(
      "/api/transaction",
      transaction,
      getToken(token)
    );
    message.success("Create transaction Successfuly");
    console.log(transaction);
    setTransaction([...transactions, transaction]);
    setShowModel(true);
  };
  const onDelete = async (_id) => {
     await Axios.delete(
      `/api/transactions/${_id}`,
      getToken(token)
    );

    setTransaction(
      transactions.filter((transaction) => transaction.id !== _id)
    );
  };
  const fetchUserLogin = async () => {
    console.log(username, password);
    const login = await Axios.post("/user/login", {
      username,
      password,
    });
    setToken(login.data.token);
    localStorage.setItem("token", login.data.token);
  };

  const filterTransaction = transactions.filter((transaction) =>
    transaction.category.includes(search)
  );

  useEffect(() => {
    const oldToken = localStorage.getItem("token");
    if (oldToken) setToken(oldToken);
  }, []);
  useEffect(() => {
    if (token) fetchTransaction();
  }, [token]);
  return (
    <Container>
      <div className="token">
        {token ? (
          <div className="showToken">
            <Button onClick={showToken}>Logout</Button>
          </div>
        ) : (
          <>
            <Input
              placeholder="username"
              onChange={(e) => setUsername(e.target.value)}
            />
            <Input
              placeholder="password"
              type="password"
              onChange={(e) => setPassword(e.target.value)}
            />

            <Button onClick={fetchUserLogin}>Login</Button>
          </>
        )}
      </div>
      <Content>
        <Box>
          <Input
            placeholder="Search"
            onChange={(e) => setSearch(e.target.value)}
          />
          <Button onClick={() => setShowModel(true)}>CREATE</Button>
        </Box>

        {transactions.length === 0 ? (
          <Box className="nodata">
            <h1>NO DATA</h1>
          </Box>
        ) : (
          ""
        )}

        {filterTransaction.map((transaction) => (
          <Transactions transaction={transaction} onDelete={onDelete} />
        ))}
      </Content>
      <Model
        visible={showModel}
        onCreate={createModel}
        onClose={() => setShowModel(false)}
      />
    </Container>
  );
}

export default App;
