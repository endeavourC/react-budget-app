import React, { useRef, useMemo, useCallback } from "react";
import { connect } from "react-redux";
import { groupBy } from "lodash";
import { ToggleableList } from "components";
import ParentCategory from "./ParentCategory";
import CategoryItem from "./CategoryItem";
import "styled-components/macro";

import { selectParentCategory } from "data/actions/budget.actions";

const BudgetCategoryList = ({
  budgetedCategories,
  allCategories,
  budget,
  selectParentCategory
}) => {
  const handleClickParentCategoryRef = useRef(null);
  const budgetedCategoriesByParent = useMemo(
    () =>
      groupBy(
        budgetedCategories,
        item =>
          allCategories.find(category => category.id === item.categoryId)
            .parentCategory.name
      ),
    [budgetedCategories, allCategories]
  );

  const listItems = useMemo(
    () =>
      Object.entries(budgetedCategoriesByParent).map(
        ([parentName, categories]) => ({
          id: parentName,
          Trigger: ({ onClick }) => (
            <ParentCategory
              key={parentName}
              name={parentName}
              onClick={() => {
                onClick(parentName);
                selectParentCategory(parentName);
              }}
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
      ),
    [
      allCategories,
      budget.transactions,
      budgetedCategories.id,
      budgetedCategoriesByParent,
      selectParentCategory
    ]
  );

  const totalSpent = useMemo(
    () =>
      budget.transactions.reduce(
        (acc, transaction) => acc + transaction.amount,
        0
      ),
    [budget.transactions]
  );
  const restToSpent = useMemo(() => budget.totalAmount - totalSpent, [
    totalSpent,
    budget.totalAmount
  ]);

  const amountTaken = useMemo(
    () =>
      budgetedCategories.reduce((acc, budgetedCategory) => {
        const categoryTranscations = budget.transactions.filter(
          transaction => transaction.categoryId === budgetedCategory.id
        );
        const categoryExpenses = categoryTranscations.reduce(
          (acc, transaction) => acc + transaction.amount,
          0
        );

        return acc + Math.max(categoryExpenses, budgetedCategory.budget);
      }, 0),
    [budget.transactions, budgetedCategories]
  );

  const notBudgetedTransaction = useMemo(
    () =>
      budget.transactions.filter(
        transaction =>
          !budgetedCategories.find(
            budgetedCategory => budgetedCategory.id === transaction.categoryId
          )
      ),
    [budget.transactions, budgetedCategories]
  );
  const notBudgetedExpenses = useMemo(
    () =>
      notBudgetedTransaction.reduce(
        (acc, transaction) => acc + transaction.amount,
        0
      ),
    [notBudgetedTransaction]
  );

  const availableForRestCategories = useMemo(
    () => budget.totalAmount - amountTaken - notBudgetedExpenses,
    [amountTaken, budget.totalAmount, notBudgetedExpenses]
  );

  const handleClearParentCategorySelect = useCallback(() => {
    handleClickParentCategoryRef.current();
    selectParentCategory();
  }, [selectParentCategory, handleClickParentCategoryRef]);
  const handleSelectRestParentCategories = useCallback(() => {
    selectParentCategory(null);
    handleClickParentCategoryRef.current();
  }, [selectParentCategory, handleClickParentCategoryRef]);
  return (
    <div>
      <div
        css={`
          border-bottom: 5px solid ${({ theme }) => theme.color.gray.light};
        `}
      >
        <ParentCategory
          onClick={handleClearParentCategorySelect}
          name={budget.name}
          amount={restToSpent}
        />
      </div>
      <ToggleableList
        clickRef={handleClickParentCategoryRef}
        items={listItems}
      />
      <div
        css={`
          border-bottom: 5px solid ${({ theme }) => theme.color.gray.light};
        `}
      >
        <ParentCategory
          name="Other Categories"
          amount={availableForRestCategories}
          onClick={handleSelectRestParentCategories}
        />
      </div>
    </div>
  );
};

export default connect(
  state => ({
    budgetedCategories: state.budget.budgetedCategories,
    allCategories: state.common.allCategories,
    budget: state.budget.budget
  }),
  {
    selectParentCategory
  }
)(BudgetCategoryList);
