import React from "react";
import { connect } from "react-redux";
import { List, ListItem } from "./BudgetTransactionList.css";
import { groupBy } from "lodash";
const BudgetTransactionList = ({ transactions }) => {
  const groupedTransactions = groupBy(transactions, transaction =>
    new Date(transaction.date).getUTCDate()
  );
  return (
    <List>
      {Object.entries(groupedTransactions).map(([key, transactions]) => (
        <li>
          <ul>
            {transactions.map(transaction => (
              <li>{transaction.description}</li>
            ))}
          </ul>
        </li>
      ))}
    </List>
  );
};

export default connect(state => ({
  transactions: state.budget.budget.transactions
}))(BudgetTransactionList);
