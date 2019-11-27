import React from 'react';
import styled from 'styled-components';

const Box = styled.div`
    position: relative;
    display: block;
    width: 100%;
    max-width: 500px;
    padding: 10px 20px;
    max-height: 300px;
    background-color: #FFF;
    margin: 30px auto;
    transition: box-shadow .3s ease-in-out;

    &:hover {
        -webkit-box-shadow: 0px 0px 20px 1px rgba(0,0,0,0.75);
        -moz-box-shadow: 0px 0px 20px 1px rgba(0,0,0,0.75);
        box-shadow: 0px 0px 20px 1px rgba(0,0,0,0.75);
    }
`;

const H2 = styled.h2`
    font-size: 30px;
    font-weight: 600;
`;

const H3 = styled.h3`
    font-size: 16px;
    font-weight: 500;
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    max-width: 200px;
`;

const H5 = styled.h5`
    font-size: 12px;
    font-weight: 800;
`;

const Button = styled.button`
    position: absolute;
    bottom: 0;
    right: 0;
    padding: 10px 15px;
    background-color: ${(props) => (props.error ? '#ff0000'  : '#00b300')};
    border: 0;
    border-radius: 3px;
    font-size: 18px;
    color: #FFF;
    outline: none;
    cursor: pointer;
`;

export default function Comment(props) {
    const button = props.type === 'remove' 
        ? <Button error onClick={() => props.onClick(props)}>Remove</Button> 
        : <Button onClick={() => props.onClick(props)}>Add</Button>;

    return ( 
        <React.Fragment >
        <Box key={props.id}>
            <H2> {props.name} </H2> 
            <H3> {props.body} </H3> 
            <H5> {props.email} </H5> 
            {button}
        </Box> 
        </React.Fragment>
    )
}