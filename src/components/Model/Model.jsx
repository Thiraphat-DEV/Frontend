import { DatePicker, Input, Modal, Select } from "antd";
import { useState, useEffect } from "react";
import "./Model.css";
// @ts-check
const Model = () => {
  const { visible, onCreate, onClose } = props;
  const [category, setCategory] = useState("Shop");
  const [date, setDate] = useState();
  const [amount, setAmount] = useState();

  const createTransaction = () => {
    const income = ["Salary"];
    const typeIncome = income.includes(category) ? "income" : "payment";

    const newTransaction = {
      typeIncome,
      category,
      date,
      amount: type === "payment" ? amount * 1 : amount,
    };
    onCreate(newTransaction);
  };

  useEffect(() => {
    setCategory("Shop");
    setDate();
    setAmount();
  }, []);
  return (
    <>
      <Modal
        title="Create Transaction"
        visible={visible}
        onOk={createTransaction}
        onCancel={() => onClose()}
      >
        <div className="shop">
          <Select
            placeholder="Select Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <Select.Option value="Shopping">Shop</Select.Option>
            <Select.Option value="Salary">Salary</Select.Option>
          </Select>

          <DatePicker onChange={(e) => setDate(e.format("DD MMM YYYY"))} />

          <Input value={amount} onChange={(e) => setAmount(e.target.value)} />
        </div>
      </Modal>
    </>
  );
};
export default Model;
