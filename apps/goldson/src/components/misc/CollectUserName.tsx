"use client";

import React, { useState } from "react";
import { Button } from '@/components/ui/button';


const CollectUserName = () => {
  // State to store input values
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");

  // Handler for form submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Submit these values to your API or server
    console.log("Submitted: ", { firstName, lastName });
    // Add logic to actually submit these to the backend...
  };

  return (
    <div style={{ textAlign: "center", margin: "0 auto", maxWidth: "600px" }}>
      <h2>BOOK YOUR EVENT</h2>
      <form onSubmit={handleSubmit}>
        <div style={{ marginBottom: "20px" }}>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First name *"
            required
            style={{ marginRight: "10px", padding: "10px" }}
          />
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last name *"
            required
            style={{ padding: "10px" }}
          />
        </div>
        <Button type="submit">Submit</Button>
      </form>
    </div>
  );
};

export default CollectUserName;
