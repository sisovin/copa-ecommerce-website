import React, { useState } from 'react';
import { Button, Input, Form, FormItem } from 'shadcn/ui';

interface AuthFormProps {
  type: 'login' | 'register';
  onSubmit: (email: string, password: string) => void;
}

const AuthForm: React.FC<AuthFormProps> = ({ type, onSubmit }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(email, password);
  };

  return (
    <Form onSubmit={handleSubmit}>
      <FormItem>
        <label htmlFor="email">Email</label>
        <Input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </FormItem>
      <FormItem>
        <label htmlFor="password">Password</label>
        <Input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
      </FormItem>
      <Button type="submit">
        {type === 'login' ? 'Login' : 'Register'}
      </Button>
    </Form>
  );
};

export default AuthForm;
