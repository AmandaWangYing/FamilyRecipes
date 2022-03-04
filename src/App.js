import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import AppHeader from './AppHeader';
import Browse from "./Browse";
import Recipe from "./Recipe";

let numRecipes = 2; 
fetch(`/recipes/recipes.json`)
    .then(res => res.json())
    .then(recipes => {
        numRecipes = recipes.length;
    });

const randomId = Math.floor(Math.random() * numRecipes) + 1;
//console.log("numbRecipes: ", numRecipes, "randomId: ", randomId);
const Random = () => <Navigate to={`/recipe/${randomId}`} />;

function App() {
    return (
        <BrowserRouter>
            <React.Fragment>
                <AppHeader />
                <Routes>
                    <Route exact path="/" element={<Browse />} />
                    <Route exact path="/recipe/:id" element={<Recipe />} />
                    <Route exact path="/random" element={<Random />} />
                </Routes>
            </React.Fragment>
        </BrowserRouter>
    );
}

export default App;
