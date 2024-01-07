import Friend from "./Friend";

export default function FriendsList({ friends, onSelection, selectedFriend }) {
  // Return a list of Friend components
  return (
    <ul>
      {friends.map((friend) => (
          friend.name === "Me" ? null:
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
