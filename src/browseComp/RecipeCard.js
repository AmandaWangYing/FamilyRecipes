import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";

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

const RecipeCard = ({recipe}) => (
    <Card key={recipe.id}>
      <Link to={`/recipe/${recipe.id}`}>
        <CardTitleRow>
            <CardTitle>{recipe.name}</CardTitle>
            <Level>{recipe.level}</Level>
        </CardTitleRow>
        <Img src={recipe.imageSrc} alt={recipe.imageDescription} />
        <Description>{recipe.description}</Description>
      </Link>
    </Card>
  );

export default RecipeCard;