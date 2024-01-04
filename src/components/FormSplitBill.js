import React, { useState } from "react";
import Button from "./Button";

export default function FormSplitBill({ selectedFriend, setFriends }) {
  // State for the total bill, user's expense, friend's expense, and who is paying
  const [bill, setBill] = useState("");
  const [userExpense, setUserExpense] = useState("");
  const friendExpense = bill ? bill - userExpense : "";
  const [whoIsPaying, SetWhoIsPaying] = useState("User");
  // Function to handle form submission
  function handleSubmit(e) {
    e.preventDefault();

    if (!bill || !userExpense) return;

    // Calculate the new balance for the friend
    let newBalance;
    if (whoIsPaying === "user") {
      newBalance = selectedFriend.balance + bill;
    } else {
      newBalance = selectedFriend.balance - bill;
    }

    // Update the friends state
    setFriends((prevFriends) =>
      prevFriends.map((friend) =>
        friend.id === selectedFriend.id
          ? { ...friend, balance: newBalance }
          : friend
      )
    );

    // Reset the form
    setBill("");
    setUserExpense("");
    SetWhoIsPaying("User");
  }
  // Return the form for splitting the bill
  return (
    <form className="form-split-bill" onSubmit={handleSubmit}>
      <h2>Split the bill with {selectedFriend.name}</h2>

      <label>💲Bill Value</label>
      <input
        type="text"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />

      <label>🧘‍♀️Your Expense</label>
      <input
        type="text"
        value={userExpense}
        onChange={(e) =>
          setUserExpense(
            Number(e.target.value) > bill ? userExpense : Number(e.target.value)
          )
        }
      />

      <label>🤼{selectedFriend.name}'s Expense</label>
      <input type="text" disabled value={friendExpense} />

      <label>🤑Who is paying the bill?</label>
      <select
        value={whoIsPaying}
        onChange={(e) => SetWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>
      <Button>Split Bill</Button>
    </form>
  );
}
