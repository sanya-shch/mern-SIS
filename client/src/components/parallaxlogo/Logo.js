import React from 'react';
import styled from 'styled-components';

const Root = styled.h1`
    // background-color: #19B5FE;
    border-radius: 3px;
    // box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24);
    color: #4b4d51;
    // letter-spacing: 1px;
    margin: 0;
    text-align: center;
    // transform: rotate(-12deg);
    font-size: 1.7rem;
    // /* Fix flickering in Safari */
    line-height: 50px;
    height: 50px;
    // width: 270px;
    width: 680px;
    @media (min-width: 550px) {
        font-size: 3rem;
        /* Fix flickering in Safari */
        line-height: 100px;
        height: 200px;
        // width: 540px;
        width: 740px;
    }
`;

export default function Logo() {
    return (
        <Root>Кафедра Комп'ютерної інженерії</Root>
    );
}