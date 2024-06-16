import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  background-color: #f1f1f1;
  margin-bottom: 20px;
`;

const Email = styled.p`
  margin: 0;
`;

const Button = styled.button`
  padding: 5px 10px;
  background-color: #dc3545;
  color: white;
  border: none;
  cursor: pointer;
`;

const UserMenu = ({ email, onLogout }) => {
  return (
    <Container>
      <Email>{email}</Email>
      <Button onClick={onLogout}>Logout</Button>
    </Container>
  );
};

export default UserMenu;
