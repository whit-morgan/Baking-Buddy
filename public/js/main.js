// document.querySelector('#addIngredient').addEventListener('click', addNewIngredient)
document.querySelector('#numOfIngredients').addEventListener('change', addNewIngredient)

function addNewIngredient(){
    const ingredientNums = document.querySelector('#numOfIngredients').value //chooses num value from selector
    
    const iInput = document.querySelector('#iInput') //ingredient input section variable
    const amtInput = document.querySelector('#amtInput') //ingredient amount section variable
    const measureInput = document.querySelector('#measurement')

//////////ingredient name//////////////

    //this loop removes the list of ingredient inputs when the number of ingredients is changed
    while(iInput.firstChild){
        iInput.firstChild.remove() 
    }

    for(let i = 1; i <= ingredientNums; i++){

        const input = document.createElement('input')
        input.type = 'text'
        input.name = 'ingredient'
        input.placeholder= 'ingredient'
        document.querySelector('#iInput').appendChild(input)
        
    }
//////////ingredient amount//////////////

    //this loop removes the list of ingredient amount inputs when the number of ingredients is changed
    while(amtInput.firstChild){
        amtInput.firstChild.remove() 
    }
    //loops and list input fields for the user to submit the amount of each ingredient
    for(let i = 1; i <= ingredientNums; i++){

        const input = document.createElement('input')
        input.type = 'text'
        input.name = 'ingredientAmount'
        input.placeholder = 'amount'
        document.querySelector('#amtInput').appendChild(input)
        
    }
/////////ingredient measure//////////////

    while(measureInput.firstChild){
        measureInput.firstChild.remove() 
    }

    for(let i = 1; i <= ingredientNums; i++){

        const input = document.createElement('input')
        input.type = 'text'
        input.name = 'measurement'
        input.placeholder = 'measurement'
        document.querySelector('#measurement').appendChild(input)
        
    }
   
}



//////get more details on saved recipes
const moreArrow = document.querySelectorAll('.fa-chevron-circle-down')


// document.querySelectorAll('.fa-chevron-circle-down').addEventListener('click', buttonTest)
// function buttonTest(){
//     console.log('button clicked')
// }
Array.from(moreArrow).forEach((element)=>{
    element.addEventListener('click', showFullRecipe)
})

// function showFullRecipe(){
//     console.log('button clicked')
// }


///////show full recipe details//////
async function showFullRecipe(){
    const rName = this.parentNode.childNodes[1].innerText
    const recipeArea = document.querySelector('.recipeSection')
    try{
        const response = await fetch(`api/${rName}`)
            console.log(rName)

        const data = await response.json()
            console.log(data)

        while(recipeArea.firstChild){
            recipeArea.firstChild.remove()
        }

        data.forEach(obj => {
            if(rName === obj['recipeName']){

                for(let i = 0; i < obj['ingredient'].length; i++){
                    console.log(obj['recipeName'])
                    const li = document.createElement('li')
                    li.textContent = `${obj.ingredientAmount[i]} ${obj.ingredientMeasurement[i]} ${obj.ingredient[i]}`
                    recipeArea.appendChild(li)
                }

                // const li = document.createElement('li')
                // li.textContent = `${obj.ingredient}`
                // recipeArea.appendChild(li)
            }
        })

        // data.forEach(obj => {
        //     const li = document.createElement('li')
        //     console.log(obj)
        //     li.textContent = `${obj.ingredient}`
        //     recipeArea.appendChild(li)
        // })
    }catch(err){
        console.log(err)
    }
}

////////////////////////////////////////////////////////////////////

// Validating Empty Field
// function check_empty() {
//     if (document.getElementById('name').value == "" || document.getElementById('email').value == "" || document.getElementById('msg').value == "") {
//     alert("Fill All Fields !");
//     } else {
//     document.getElementById('form').submit();
//     alert("Form Submitted Successfully...");
//     }
//     }
    //Function To Display Popup
    function div_show() {
    document.querySelector('#popupContainer').style.display = "flex";
    }
    //Function to Hide Popup
    function div_hide(){
    document.querySelector('#popupContainer').style.display = "none";
    }
    