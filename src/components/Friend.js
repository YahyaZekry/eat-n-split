import Button from "./Button";

export default function Friend({ friend, onSelection, selectedFriend }) {
  // Check if the current friend is selected
  const isSelected = selectedFriend?.id === friend.id;
  // Use the friend prop to determine the balance status
  const isEven = friend.balance === 0;
  const isOwing = friend.balance < 0;
  const isOwedBy = friend.balance > 0;
  // Return a list item with friend details and a select/close button
  return (
    <li className={isSelected ? "selected" : ""}>
      <img src={friend.image} alt={friend.name} />
      <h3>{friend.name}</h3>
      {isEven && <p>You and {friend.name} are even.</p>}
      {isOwing && (
        <p className="red">
          You owe {friend.name} {Math.abs(friend.balance)}$.
        </p>
      )}
      {isOwedBy && (
        <p className="green">
          {friend.name} owes you {friend.balance}$.
        </p>
      )}

      <Button onClick={() => onSelection(friend)}>
        {isSelected ? "Close" : "Select"}
      </Button>
    </li>
  );
}
