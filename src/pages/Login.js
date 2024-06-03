
import React, { useState } from 'react';
import { Button, Input, FormControl, FormLabel,Text } from '@chakra-ui/react';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();

  const handleSubmit = (e) => {
    e.preventDefault();
    login(username, password);
  };

  return (
    <div style={{maxWidth:'500px',margin:'auto',paddingTop:'100px'}}>
    <form onSubmit={handleSubmit}>
    <Text fontSize='3xl'>Login</Text>
      <FormControl>
        <FormLabel>Username</FormLabel>
        <Input value={username} onChange={(e) => setUsername(e.target.value)} />
      </FormControl>
      <FormControl>
        <FormLabel>Password</FormLabel>
        <Input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </FormControl>
      <Button sx={{marginTop:'10px'}} type="submit">Login</Button>
    </form>
    </div>
  );
};

export default LoginPage;
