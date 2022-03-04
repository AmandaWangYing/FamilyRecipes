import React, {useState} from "react";
import styled from "styled-components";
import VideoPopUp from "./VideoPopUp";
import "./styles.css";

const Card = styled.div`
  display: inline-block;
  width: 100%;
  max-width: 350px;
  margin: 0 5px;
`;

const CardTitleRow = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
`;

const CardTitle = styled.h2`
  margin: 0;
`;

const Level = styled.span`
  font-size: 20px;
`;

const Img = styled.img`
  height: 250px
`;

const Description = styled.p`
  margin-top: 0;
  font-size: 20px;
`;

function IngredientRow({ item, quantity, unit }) {
  return (
    <li>
      <span>
        <span><b>{item}:</b></span>
        <span>&emsp;{quantity} </span>
        <span>{unit}</span>
      </span>
    </li>
  );
}

function IngredientList({recipe}) {
  return(
    <React.Fragment>
      <h2>Ingredients: </h2>
      <span><ol>
        {recipe && recipe.ingredients && recipe.ingredients.map((ingItem, ingIndex) =>
          (<IngredientRow key={ingIndex}
            item={ingItem.item}
            quantity={ingItem.quantity}
            unit={ingItem.unit}
          />)
        )}
      </ol></span>
    </React.Fragment>
  )
}

function RecipeDetails({ recipe }) {
  const [visible, setVisible] = React.useState(false);
  function togglePop() {
    setVisible(!visible);
  }

  return (
    <React.Fragment>
    <Card key={recipe.id} style={{width: '50%', float: 'left'}}>
      <CardTitleRow>
        <CardTitle>{recipe.name}</CardTitle>
        <Level>{recipe.level}</Level>
      </CardTitleRow>
      <Description><b>Category:</b> {recipe.category}</Description>
      <IngredientList recipe={recipe} />
      <a target="_blank" 
      href="https://google.com">
        <Img src={recipe.imageSrc} alt={recipe.imageDescription} />
      </a>
      <Description>{recipe.description}</Description>
      <div>
        <div className="btn" onClick={togglePop}>
        <button>Video</button>
        </div>
        {visible ? <VideoPopUp onClick={togglePop} /> : null}
      </div>
      </Card>
    <div style={{width: '50%', float: 'right'}}>
      <h2>Directions: </h2>
      <Description>{recipe.directions}</Description>
    </div>
    </React.Fragment>);
}

export default RecipeDetails;