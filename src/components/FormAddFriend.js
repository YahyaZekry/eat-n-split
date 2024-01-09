import React, { useState } from "react";
import Button from "./Button";

export default function FormAddFriend({ setFriends }) {
  // State for the new friend's name and image
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48?u=");
  const [balance, setBalance] = useState(0);
  // Function to handle form submission
  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !image) return;

    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance,
    };

    setFriends((prevFriends) => [...prevFriends, newFriend]);
    setName("");
    setImage("https://i.pravatar.cc/48?u=");
  }
  // Return the form for adding a new friend
  return (
    <form className="form-add-friend" onSubmit={handleSubmit}>
      <label>🤼Friend's name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <label>📷IMG url</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      />

      <label>$ Balance</label>
      <input
        type="number"
        value={balance}
        onChange={(e) => setBalance(Number(e.target.value))}
      />

      <Button>Add</Button>
    </form>
  );
}
