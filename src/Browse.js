import './Browse.css';
import React, {useEffect} from 'react';
import RecipeList from './browseComp/RecipeList';
import Button from './browseComp/Button';
import CheckboxItems from './browseComp/CheckboxItems';
import InputText from './browseComp/InputText';

function Browse() {
  /***** Get the selected items out of the 3 checkbox items *****/
  const levelItems = ['Easy', 'Medium', 'Hard'];
  //create an array named selections to save the selected items of checkbox. 
  const [state, setState] = React.useState({selections: []});
  function handleCheckboxChange(levelItem){
    let sel = state.selections;
    let find = sel.indexOf(levelItem);
    if (find > -1){
        sel.splice(find, 1);
    } else {
        sel.push(levelItem)
    }
    setState({
        selections: sel,
    })
  }
  /***** end *****/

  /**** Get searched text *****/
  const [inputValue, setInputValue] = React.useState('');
  const inputChangeHandler = (event) => (setInputValue(event.target.value));
  /***** end *****/

  /***** Clear the checkbox and input text *****/
  const resetAll = () => {
    setState({selections: []});
    setInputValue('');
  }
  /***** end *****/

  /***** Read all recipes from recipes.json *****/
  const [recipes, setRecipes] = React.useState([]);
  const getRecipes = () => {
    const host = "/recipes/";
    fetch(`${host}recipes.json`)
        .then(res => res.json())
        .then(recipes => setRecipes(recipes));
  }
  useEffect(() => {getRecipes()}, []);
  /***** end *****/

  //Display all the components in the homepage
  return (
    <div className="App">
      <div style={{width: '350px', overflowY: 'scroll', margin: 'auto'}}>
        <InputText
          value={inputValue}
          onChange={inputChangeHandler} 
        />
        <CheckboxItems 
          options={levelItems} 
          onChange={handleCheckboxChange}
          selected={state.selections}
        />
        <Button onClick={resetAll}>Clear</Button>
      </div>
      <div>
        <RecipeList 
          recipes={recipes} 
          levelFilter={state.selections} 
          nameFilter={inputValue} />
      </div>
    </div>
  );
}

export default Browse;
