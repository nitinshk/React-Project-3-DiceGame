import React, { useState } from 'react'
import styled from 'styled-components';

const NumberSelector = () => {
    const arrNumber =[1,2,3,4,5,6];
    const [selectedNumber, setSelectedNumber] = useState();


  return (
    <NumbeSelectorContainer>
        <div className='flex'> 
        {
            arrNumber.map((value, i) =>(
                <Box
                isSelected={value == selectedNumber}
                key={i}onClick={() => setSelectedNumber(value)}>
                {value}
                </Box>
            ))
        }
        </div>
        <p>Select Number</p>
        
    </NumbeSelectorContainer>
  )
}

const NumbeSelectorContainer = styled.div`
display: flex;
flex-direction: column;
align-items: end;
.flex{
    display: flex;
    gap: 24px;
}
    p{
        font-size: 24px;
        font-weight: 700px;
    }
`

const Box = styled.div`
height: 72px;
width: 72px;
border: 1px solid black;
display: grid;
place-items: center;
font-size: 24px;
font-weight: 700px;    
background-color: ${(props) => (props.isSelected ? "black" : "white") };
color: ${(props) => (!props.isSelected ? "black" : "white") };
`
export default NumberSelector;