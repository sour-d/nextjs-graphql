"use client";

import TextInput from "@/components/TextInput";
import { authenticate, logout, selectIsAuthenticated, selectUserName } from "@/redux/slices/user";
import { Box, Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import React, { useRef } from "react";
import { useDispatch, useSelector } from "react-redux";

const UserLoginPage = () => {
  const userInfoDispatch = useDispatch();
  const isAuthenicated = useSelector(selectIsAuthenticated);
  const userName = useSelector(selectUserName);
  const userNameRef = useRef(null);
  const passwordRef = useRef(null);

  return (
    <div>
      <Flex height={"100vh"} justifyContent={"center"} alignItems={"center"}>
        {isAuthenicated ? (
          <Stack>
            <Heading>Welcome {userName}</Heading>
            <Button
              onClick={() => userInfoDispatch(logout())}
              colorPalette="red"
            >
              Logout
            </Button>
          </Stack>
        ) : (
          <Stack>
            <Heading>Please login</Heading>
            <Text>Enter the dummy Username and password</Text>
            <Stack spacing={4} width={400} padding='20px 0'>
              <TextInput placeholder="Username" ref={userNameRef} />
              <TextInput placeholder="Password" ref={passwordRef} />
            </Stack>
            <Button
              onClick={() => userInfoDispatch(authenticate({
                userName: userNameRef.current.value,
                password: passwordRef.current.value
              }))}
              colorPalette="green"
            >
              Login
            </Button>
          </Stack>
        )}
      </Flex>
    </div>
  );
};

export default UserLoginPage;