import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

export default function App() {
  // State for friends data
  const [friends, setFriends] = useState(initialFriends);
  // State for showing add friend form
  const [showAddFriend, setShowAddFriend] = useState(false);
  // State for selected friend
  const [selectedFriend, setSelectedFriend] = useState(null);

  // Function to toggle add friend form
  function handleShowAddFriend() {
    setShowAddFriend((show) => !show);
  }

  // Function to handle friend selection
  function handleSelectedFriend(friend) {
    // setSelectedFriend(friend);
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
    setShowAddFriend(false);
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList
          friends={friends}
          selectedFriend={selectedFriend}
          onSelection={handleSelectedFriend}
        />

        {showAddFriend && <FormAddFriend setFriends={setFriends} />}

        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "Close" : "Add Friend"}
        </Button>
      </div>
      {selectedFriend && (
        <FormSplitBill
          selectedFriend={selectedFriend}
          setFriends={setFriends}
        />
      )}
    </div>
  );
}

function Button({ children, onClick }) {
  // Return a button with onClick handler and children as its content
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function FriendsList({ friends, onSelection, selectedFriend }) {
  // Return a list of Friend components
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          onSelection={onSelection}
          selectedFriend={selectedFriend}
        />
      ))}
    </ul>
  );
}

function Friend({ friend, onSelection, selectedFriend }) {
  // Check if the current friend is selected
  const isSelected = selectedFriend?.id === friend.id;
  // Return a list item with friend details and a select/close button
  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {friend.balance < 0 && (
        <p className="red">
          You own {friend.name} {Math.abs(friend.balance)}$.
        </p>
      )}
      {friend.balance > 0 && (
        <p className="green">
          {friend.name} owns you {friend.balance}$.
        </p>
      )}

      {friend.balance === 0 && <p>You and {friend.name} are even.</p>}
      <Button onClick={() => onSelection(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}

function FormAddFriend({ setFriends }) {
  // State for the new friend's name and image
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48?u=");
  // Function to handle form submission
  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !image) return;

    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name,
      image: `${image}?=${id}`,
      balance: 0,
    };

    setFriends((prevFriends) => [...prevFriends, newFriend]);
    setName("");
    setImage("https://i.pravatar.cc/48?u=");
    console.log(newFriend);
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

      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill({ selectedFriend, setFriends }) {
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
