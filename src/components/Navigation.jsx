import React from 'react';
import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const Nav = styled.nav`
  background-color: #f8f9fa;
  padding: 10px;
  margin-bottom: 20px;
`;

const Ul = styled.ul`
  list-style: none;
  display: flex;
  justify-content: space-around;
  padding: 0;
`;

const Li = styled.li`
  margin: 0 10px;
`;

const StyledNavLink = styled(NavLink)`
  text-decoration: none;
  color: #007bff;
  &.active {
    font-weight: bold;
  }
`;

const Navigation = () => {
  return (
    <Nav>
      <Ul>
        <Li>
          <StyledNavLink to="/register">Register</StyledNavLink>
        </Li>
        <Li>
          <StyledNavLink to="/login">Login</StyledNavLink>
        </Li>
        <Li>
          <StyledNavLink to="/contacts">Contacts</StyledNavLink>
        </Li>
      </Ul>
    </Nav>
  );
};

export default Navigation;
