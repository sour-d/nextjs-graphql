"use client";

import { useAuth } from "@/context/Auth";
import React, { useRef } from "react";

const UserLoginPage = () => {
  const { userName, setUserName } = useAuth();
  const inputRef = useRef(null);

  return (
    <div>
      <div>Login page</div>
      {userName ? (
        <>
          <p>Welcome {userName}</p>
          <button onClick={() => setUserName('')} className="bg-red-700 p-2">Logout</button>
        </>
      ) : (
        <>
          <p>Please login</p>
          <input
            type="text"
            style={{
              padding: '5px',
              margin: '5px',
              width: '200px',
              borderRadius: '5px',
              border: '1px solid #ccc',
            }}
            ref={inputRef}
          />
          <button onClick={() => setUserName(inputRef.current.value)} className="bg-green-700 p-2">Login</button>
        </>
      )}
    </div>
  );
};

export default UserLoginPage;