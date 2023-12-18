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
  const [showAddFriend, setShowAddFriend] = useState(false);

  function handleShowAddFriend() {
    setShowAddFriend((show) => !show);
  }
  return (
    <div className="app">
      <div className="sidebar">
        <FriendsList />
        {showAddFriend && <FormAddFriend />}
        <Button onClick={handleShowAddFriend}>
          {showAddFriend ? "Close" : "Add Friend"}
        </Button>
      </div>
      <FormSplitBill />
    </div>
  );
}

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}
function FormAddFriend() {
  return (
    <form className="form-add-friend">
      <label>🤼Friend's name</label>
      <input type="text" />

      <label>📷IMG url</label>
      <input type="text" />

      <Button>Add</Button>
    </form>
  );
}

function FriendsList() {
  return (
    <ul>
      {initialFriends.map((freind) => (
        <Friend freind={freind} key={freind.id} />
      ))}
    </ul>
  );
}

function Friend({ freind }) {
  return (
    <li>
      <img src={freind.image} alt={freind.name} />
      <h3>{freind.name}</h3>
      {freind.balance < 0 && (
        <p className="red">
          You own {freind.name} {Math.abs(freind.balance)}$.
        </p>
      )}
      {freind.balance > 0 && (
        <p className="green">
          {freind.name} owns you {freind.balance}$.
        </p>
      )}

      {freind.balance === 0 && <p>You and {Friend.name} are even.</p>}
      <Button>Select</Button>
    </li>
  );
}

function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2>Split the bill with X</h2>

      <label>💲Bill Value</label>
      <input type="text" />

      <label>🧘‍♀️Your Expense</label>
      <input type="text" />

      <label>🤼X's Expense</label>
      <input type="text" disabled />

      <label>🤑Who is paying the bill?</label>
      <select>
        <option value="user">You</option>
        <option value="friend">X</option>
      </select>
      <Button>Split Bill</Button>
    </form>
  );
}
