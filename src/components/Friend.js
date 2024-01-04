import Button from "./Button";

export default function Friend({ friend, onSelection, selectedFriend }) {
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
