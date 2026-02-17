import React from "react";
import { useParams } from "react-router-dom";

const RoomDetails = () => {
  const { id } = useParams();

  return (
    <div style={{ padding: "40px" }}>
      <h1>Room Details Page</h1>
      <p>Room ID: {id}</p>
    </div>
  );
};

export default RoomDetails;
