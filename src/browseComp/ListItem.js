import React from 'react';
import styled from 'styled-components';

const Checkbox = styled.input`
    margin: 6px 10px 5.8px 3px;
    border-radius: 2px;
    border: solid 1px #c6c4d2;
    width: 20%;
    float: left;
    background: ${(porps) => (porps.checked ? '#482474' : '#fbfcff')};
`

const Container = styled.div`
    margin-bottom: 0px !important;
    margin-top: 5px;
`

const Description = styled.p`
    padding-bottom: 1px;
    margin-top: 8px;
    font-size: 15px;
    font-weight: normal;
    font-stretch: normal;
    font-style: normal;
    text-align: left;  
`

const ListItem = ({text, handleOnChange, selected}) => {
    return (
        <Container>            
            <Description className="column" style={{width: '33%', float: 'left'}}>
                {text}
                <Checkbox type="checkbox"
                    checked = {selected}
                    onChange = {handleOnChange}
                />                         
            </Description>
        </Container>
    )
};

export default ListItem;