import React from "react";
import { connect } from "react-redux";
import { groupBy } from "lodash";
import { ToggleableList } from "components";
import ParentCategory from "./ParentCategory";
import CategoryItem from "./CategoryItem";
import "styled-components/macro";
const BudgetCategoryList = ({ budgetedCategories, allCategories, budget }) => {
  const budgetedCategoriesByParent = groupBy(
    budgetedCategories,
    item =>
      allCategories.find(category => category.id === item.categoryId)
        .parentCategory.name
  );

  const listItems = Object.entries(budgetedCategoriesByParent).map(
    ([parentName, categories]) => ({
      id: parentName,
      Trigger: ({ onClick }) => (
        <ParentCategory
          name={parentName}
          onClick={() => onClick(parentName)}
          categories={categories}
          transactions={budget.transactions}
        />
      ),
      children: categories.map(budgetedCategory => {
        const { name } = allCategories.find(
          category => category.id === budgetedCategory.categoryId
        );

        return (
          <CategoryItem
            key={budgetedCategories.id}
            name={name}
            item={budgetedCategory}
            transactions={budget.transactions}
          />
        );
      })
    })
  );

  const totalSpent = budget.transactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );
  const restToSpent = budget.totalAmount - totalSpent;

  const amountTaken = budgetedCategories.reduce((acc, budgetedCategory) => {
    const categoryTranscations = budget.transactions.filter(
      transaction => transaction.categoryId === budgetedCategory.id
    );
    const categoryExpenses = categoryTranscations.reduce(
      (acc, transaction) => acc + transaction.amount,
      0
    );

    return acc + Math.max(categoryExpenses, budgetedCategory.budget);
  }, 0);

  const notBudgetedTransaction = budget.transactions.filter(
    transaction =>
      !budgetedCategories.find(
        budgetedCategory => budgetedCategory.id === transaction.categoryId
      )
  );
  const notBudgetedExpenses = notBudgetedTransaction.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  );

  const availableForRestCategories =
    budget.totalAmount - amountTaken - notBudgetedExpenses;

  return (
    <div>
      <div
        css={`
          border-bottom: 5px solid ${({ theme }) => theme.color.gray.light};
        `}
      >
        <ParentCategory name={budget.name} amount={restToSpent} />
      </div>
      <ToggleableList items={listItems} />
      <div
        css={`
          border-bottom: 5px solid ${({ theme }) => theme.color.gray.light};
        `}
      >
        <ParentCategory
          name="Other Categories"
          amount={availableForRestCategories}
        />
      </div>
    </div>
  );
};

export default connect(state => ({
  budgetedCategories: state.budget.budgetedCategories,
  allCategories: state.common.allCategories,
  budget: state.budget.budget
}))(BudgetCategoryList);
