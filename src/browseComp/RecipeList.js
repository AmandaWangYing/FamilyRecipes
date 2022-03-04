import React from "react";
import styled from "styled-components";
import RecipeCard from './RecipeCard';

const CardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
`;

function RecipeList({recipes, levelFilter, nameFilter}) {

    const recipesInLevel = (levelFilter.length === 0) 
    ? recipes
    : recipes.filter(function (recipe) {
        return (levelFilter.indexOf(recipe.level) > -1);
      });

    const filteredRecipes = recipesInLevel.filter(
      recipe =>
        recipe.name.toLowerCase().includes(nameFilter.toLowerCase()) || 
        recipe.description.toLowerCase().includes(nameFilter.toLowerCase())
    );

    return (
      <React.Fragment><CardContainer>
        {filteredRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </CardContainer></React.Fragment>
    );
  };

export default RecipeList;