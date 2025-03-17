"use client";

import { authenticate, selectIsAuthenticated, selectUserName } from "@/redux/slices/user";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

const UserLoginPage = () => {
  const userInfoDispatch = useDispatch();
  const isAuthenicated = useSelector(selectIsAuthenticated);
  const userName = useSelector(selectUserName);
  const userNameRef = useRef(null);
  const passwordRef = useRef(null);

  console.log('isAuthenicated', isAuthenicated);
  console.log('userName', userName);

  return (
    <div>
      {isAuthenicated ? (
        <>
          <p>Welcome {userName}</p>
          <button onClick={() => setUserName('')} className="bg-red-700 p-2">Logout</button>
        </>
      ) : (
        <>
          <p>Please login</p>
          <input
            type="text"
            placeholder="user name"
            style={{
              padding: '5px',
              margin: '5px',
              width: '200px',
              borderRadius: '5px',
              border: '1px solid #ccc',
            }}
              ref={userNameRef}
          />
          <input
            type="text"
            placeholder="password"
            style={{
              padding: '5px',
              margin: '5px',
              width: '200px',
              borderRadius: '5px',
              border: '1px solid #ccc',
            }}
            ref={passwordRef}
          />
          <button
            onClick={() =>
                userInfoDispatch(authenticate({
                userName: userNameRef.current.value,
                password: passwordRef.current.value
              }))
            }
            className="bg-green-700 p-2"
          >
            Login
          </button>
        </>
      )}
    </div>
  );
};

export default UserLoginPage;