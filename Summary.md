# How to establish My Family Recipes website
## Step 1: Create a React App by following the process of Create a New React App. 
1. **Reference document:** https://create-react-app.dev/docs/getting-started
2. **Commands:**
    ```terminal commands
    yarn create react-app multicheckbox
    cd multicheckbox
3. A new react project has been created in a folder named `multicheckbox`. 

## Step 2: Copy the pre-generated recipes' content and images.
1. Generate recipe's content will be refactored and updated later.  It has been maintained in another react app. 
2. **Commands:**
    ```
    mkdir images
    mkdir recipes
    cp [recipe's image] ./images
    cp [recipe's json files] ./recipes
3. The recipes' json files include `recipes.json` which includes all the recipes. And `1.json`, `2.json` etc. which represents each recipe details. 

## Step 3: Update configuration of the `multicheckbox` app. 
1. These steps can be implemented later before compile. 
2. **Add needed libraries in `package.json`**. The first one is `react-router-dom` that is to provide link between components of react.  The other one is `styled-components` which is provide styled components like `css`. 
    ```package.json
    "dependencies": {
        "styled-components": "^5.3.3",
        "react-router-dom": "^6.2.1"
        },

## Step 4: Create the Home Page (`Browse.js`) of the website which lists: 
> All the recipes including the Name, the Difficulty Level, the Image and the rough description. 
> A text filter input bar to receive text and then filtered the recipes by the input text in name or description.  
> Three checkboxes represented the difficulty level of the recipes and then filtered the recipes by selected level. 

### 1. Components need to create
* `RecipeCard.js`: common recipe display.
* `RecipeList.js`: display all the recipes based on the inputtext filter and difficulty level filter 
settings in the homepage. 
* `ListItem.js`: common checkbox item

### 2. `RecipeCard.js`: common recipe display. It will receive a recipe element as the parameter and display teh recipe name, level, image and descritpion.  There is a link added to the RecipeCard to the specific recipe details. 
```html
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
```

### 3. `RecipeList.js`: display all the recipes based on the inputtext filter and difficulty level filter settings in the homepage. 
> This component get 3 parameters, all the recipes read from the recipes.json file (`recipes`), the level filter setting (`levelFilter`) and the input text filter setting (`nameFilter`). After getting the filtered out recipes, this component will render each recipe in the `RecipeCard` component. 

* Level Filter
    > If there is no level filter selected, return the whole recipes. Otherwise, return the recipes only existed in these selected levels. 
        
    > levelFilter is an Array includes the selected levels.  If the length of the levelFilter is 0, meaning no level is selected. 

    > If the levelFilter length is not 0, meaning some of the levels has been selected and saved in levelFilter array.  The `array.filter()` method will get each element in the array, check if the recipe.level is in the array or not by leveage `array.indexOf()` method.  If the result is true, then put the recipe in a recipes array named `recipesInLevel`. 
    ```javascript
    const recipesInLevel = (levelFilter.length === 0) 
    ? recipes
    : recipes.filter(function (recipe){
        return (levelFilter.indexOf(recipe.level) > -1);
    });
    ```
* Input Text Filter
    > use `String.includes()` to check if a recipe's name or descripts includes the input string or not. Then put the matched recipes in an array named `filteredRecipes`. 
    ```javascript
    const filteredRecipes = recipesInLevel.filter(
        recipe =>
            recipe.name.toLowerCase().includes(nameFilter.toLowerCase()) || 
            recipe.description.toLowerCase().includes(nameFilter.toLowerCase())
    );
    ```
* Render each recipe in the homepage. 
    > We need to use `array.map()` to get each recipe and render the recipe as a `RecipeCard` . 
    ```html
    return (
        <React.Fragment><CardContainer>
            {filteredRecipes.map((recipe) => (
            <RecipeCard key={recipe.id} recipe={recipe} />
            ))}
        </CardContainer></React.Fragment>
    );
    ```

### 4. `ListItem.js`: common checkbox item
> The common checkbox item includes 3 parameters. The description of the checkbox item (`text`), the state of the checkbox (`selected`) and the actions when the state of the checkbox item changed (`handleOnChange`).

> In order to put multiple checkbox items in ONE line, the checkbox element (`Checkbox`) must be nested under the description element (`Description`).  Otherwise, it will displayed in multiple lines, one checkbox item in one line. 

```html
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
```

### 5. `Browse.js`: Compose the homepage with Filters and RecipeList. 
> This is a complicated js files and need to be refactored later. 

> Recipes.json has been imported as an array.  This part needs to be refactored later to use `fetch(JSON File).then(res => res.json()).then(data => setData()` . 

> Because we need to getState of input text and selected checkbox, we have to create `InputText` and `CheckboxItems` as components in `Browse.js`.  The part can be refactored later to pass state value from child to parent in React by leveraging `callBack()`. 

* Create `CheckboxItems` for 3 difficulty levels `levelItems = ['Easy', 'Medium', 'Hard']`. 
    > We are leverage React functions `React.useState()` and get and set the checkbox item selected state. 
    ```javascript
    //selections is an array to save the selected checkbox. 
    const [state, setState] = React.useState({selections: []});
    
    function handleCheckboxChange(key){
    let sel = state.selections;
    let find = sel.indexOf(key);
    if (find > -1){ //if key is in selected array, 
        sel.splice(find, 1); //after the change, it should be deselected and removed from sel. 
    } else {
        sel.push(key) //otherwise, if the key is not in selections, then it should be pushed to sel. 
    }
    setState({
        selections: sel, //after this change action, update sel as the existing state of selections. 
    })
    }
    
    function CheckboxItems({leveItems}){
    return(
        <React.Fragment>
        {levelItems.map((levelItem) =>( //use map() to get the selected checkbox and render the state. 
            <ListItem
            key={levelItem} 
            text={levelItem}
            handleOnChange={() => handleCheckboxChange(levelItem)}
            selected={state.selections.includes(levelItem)}
            />
        ))}
        </React.Fragment> 
    )
    }
    ```
* Create `InputText` component to get text filter input. 
    > Use `React.useSate()` to get the input value. 
    ```javascript
    const [inputValue, setInputValue] = React.useState('');
  
    const inputChangeHandler = (event) => {
        setInputValue(event.target.value);
    };
    function InputText(){
    return(
        <React.Fragment>
        <label>
            Search for:
            <input className="ex1" type="text" value={inputValue} onChange={inputChangeHandler} />
        </label>
        </React.Fragment>
    )
    }
    ```
* Render components: `InputText`, `CheckboxItems` and `RecipeList`
    > Need to add a clear button later. (To be refactored)

    > `{InputText()}`: call function instead of component because we'd like to get the whole string 
as an input instead of rendering after each character's input. 
    ```html
    return (
    <div className="App">
        <div style={{width: '350px', overflowY: 'scroll', margin: 'auto'}}>
            {InputText()}
            <CheckboxItems levelItems={levelItems} />
        </div>
        <div><RecipeList 
                recipes={recipes} 
                levelFilter={state.selections} 
                nameFilter={inputValue} /></div>
    </div>
    );
    ```