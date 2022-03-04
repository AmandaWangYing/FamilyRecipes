import React, { useEffect } from "react";
import { useParams } from 'react-router-dom';
import RecipeDetails from "./RecipeComp/RecipeDetails";

function Recipe() {
    const [recipe, setRecipe] = React.useState([]);
    const id = useParams().id;

    const getRecipe = () => {
        const host = "/recipes/";
        //console.log(id, `${host}${id}.json`);
        fetch(`${host}${id}.json`)
            .then(res => res.json())
            .then(recipe => setRecipe(recipe));
    }

    useEffect( () => {getRecipe()}, [] );

    return <RecipeDetails recipe={recipe} />
}

export default Recipe;