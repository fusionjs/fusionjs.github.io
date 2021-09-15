import React from 'react';
import { bool, func } from 'prop-types';

import { StyledBurger, StyledBurgerBar } from './styled-elements';

const Burger = ({ open, setOpen }) => {
    const handleClick = () => setOpen(!open)
    return (
        <StyledBurger onClick={handleClick}>
            <StyledBurgerBar styleProps={{open}} />
            <StyledBurgerBar styleProps={{open}} />
            <StyledBurgerBar styleProps={{open}} />
        </StyledBurger>
    )
}

Burger.propTypes = {
    open: bool.isRequired,
    setOpen: func.isRequired,
};

export default Burger;
