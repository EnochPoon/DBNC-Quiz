function RoomList({ rooms }) {
    return (
        <ol>
            {rooms.map(({room_type, vacant_rooms, price }) => (
                <li>{room_type}, {vacant_rooms}, ${price}</li>
            ))}
        </ol>
    )
}