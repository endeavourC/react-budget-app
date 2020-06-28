import React from "react";
import { formatCurrency } from "utils";
import { CategoryItem as Root, CategoryAmount } from "./BudgetCategoryList.css";

const CategoryItem = ({ name, item, transactions }) => {
  const categoryTransactions = transactions.filter(
    transaction => transaction.categoryId === item.id
  );

  const spentOnCategory = categoryTransactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );

  const totalLeft = (item.budget - spentOnCategory).toFixed(2);

  return (
    <Root>
      <span>{name}</span>
      <CategoryAmount negative={totalLeft < 0}>
        {formatCurrency(totalLeft)}
      </CategoryAmount>
    </Root>
  );
};

export default CategoryItem;
