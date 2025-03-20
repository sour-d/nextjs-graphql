import { Button } from "@chakra-ui/react";

export default function ButtonComponent({ children, ...props }) {
  return (
    <Button {...props}>{children}</Button>
  );
}