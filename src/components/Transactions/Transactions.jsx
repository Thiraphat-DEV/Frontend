import { message } from "antd";
import "./Transactions.css";
// @ts-check
const Transactions = () => {
  const deleteItem = async () => {
    await onDelete(transaction._id);
    message.success(`DELETE ITEM SUCCESSED ${transaction._id}`); // alert from antdesign
  };
  const { transaction, onDelete } = props;
  return (
    <div className="transaction">
      <div className="item">
        <h2>
          {transaction.id}
          {transaction.category}
        </h2>
        <p>{transaction.date}</p>
      </div>

      <div
        className="getLocal"
        style={{ color: transaction.amount > 0 ? "green" : "red" }}
      >
        {transaction.amount.toLocaleString()}
      </div>

      <div className="delete">
        <div className="items" onClick={deleteItem}>
          X
        </div>
      </div>
    </div>
  );
};
export default Transactions;
