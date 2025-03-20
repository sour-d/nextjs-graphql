import { Input } from '@chakra-ui/react';

export default function TextInput({ ...props }) {
  return (
    <Input variant='outline' {...props} />
  );
}