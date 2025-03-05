import { useState } from 'react';
import styled from 'styled-components';

const RoleDice = () => {

  const [currentdice,setCurrentDice]=useState();

  const generateRandomNumber = (min,max) => {
    console.log(Math.floor(Math.random() * (max-min) + min))
    return Math.floor(Math.random() * (max-min) + min) ;
  };

  return (
    <DiceContainer>
      <div className='dice'
      onClick={()=>generateRandomNumber(1,7)}>
        
        <img src="/images/dice_1.png" alt='dice 1' />
      </div>
      <p> Click on Dice to roll</p>
    </DiceContainer>

  );
};

export default RoleDice;

const DiceContainer = styled.div`
display: flex;
align-items: center;
flex-direction: column;
margin-top: 48px;

.dice{
cursor:pointer;
}

p{
font-size: 24px;
}
`;