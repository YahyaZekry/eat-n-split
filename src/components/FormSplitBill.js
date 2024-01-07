import React, { useState } from "react";
import Button from "./Button";
import {Slider} from "@mui/material";

export default function FormSplitBill({ selectedFriend, setFriends }) {
  // State for the total bill, user's expense, friend's expense, and who is paying
  const [bill, setBill] = useState("");
  const [userExpense, setUserExpense] = useState("");
  const friendExpense = bill && userExpense <= bill ? bill - userExpense : 0;
  const [whoIsPaying, SetWhoIsPaying] = useState("User");

    // Function to handle form submission
    function handleSubmit(e) {
        e.preventDefault();

        if (!bill) return;
        if (bill - userExpense > 0) {
            updateUserBalance(selectedFriend.id, calculateFriendDebt(bill, userExpense));
        } else {
            updateUserBalance(selectedFriend.id, -(bill / 2));
        }

        // Reset the form
        setBill("");
        setUserExpense("");
        SetWhoIsPaying("User");
    }

    function calculateFriendDebt(bill, userExpense) {
        // bill = 20 -- user paid 17, friend paid 3
        // friend shall owe me 7 (17-10)
        const splitShare = bill / 2;
        return -(userExpense - splitShare);
    }

    function updateUserBalance(id, value) {
        setFriends((prevFriends) =>
            prevFriends.map((friend) =>
                friend.id === id
                    ? {...friend, balance: friend.balance - value}
                    : friend
            )
        );
    }

    function valuetext(value: number) {
        return `${value}°C`;
    }

  // Return the form for splitting the bill
  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split the bill with {selectedFriend.name}</h2>

      <label>💲Bill Value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => {
          if (!isNaN(e.target.value)) {
            setBill(Number(e.target.value));
          }
        }}
      />

      <label>🧘‍♀️Your Expense</label>
      <input
        type="text"
        value={userExpense}
        onChange={(e) => {
          if (!isNaN(e.target.value)) {
            setUserExpense(
              Number(e.target.value) > bill
                ? userExpense
                : Number(e.target.value)
            );
          }
        }}
      />

      <label>🤼{selectedFriend.name}'s Expense</label>
      <input type="text" disabled value={friendExpense} />

        <Slider aria-label="user expense"
                value={userExpense}
                max={bill}
                valueLabelDisplay="on"
                getAriaValueText={valuetext}
                onChange={(e) => {
                    if (!isNaN(e.target.value)) {
                        setUserExpense(
                            Number(e.target.value) > bill
                                ? userExpense
                                : Number(e.target.value)
                        );
                    }
                }}/>
        <Button onClick={handleSubmit}>Split Bill </Button>
    </form>
  );
}
