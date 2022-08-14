///////////Add New Ingredient////////////
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



//////GET MORE DETAILS ON SAVED RECIPES//////
const moreArrow = document.querySelectorAll('.fa-chevron-circle-down')


Array.from(moreArrow).forEach((element)=>{
    element.addEventListener('click', showFullRecipe)
})



///////SHOW FULL RECIPE DETAILS //////
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

                    const p = document.createElement('p')
                    p.innerHTML = obj.instructions
                    recipeArea.appendChild(p)

            }
        })
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
//////////DISPLAY POPUP////////
    function divShowAdd() {
    document.querySelector('#popupContainer').style.display = "flex";
    }
//////////HIDE POPUP/////////
    function div_hide(){
    document.querySelector('#popupContainer').style.display = "none";
    document.querySelector('#popupContainerDelete').style.display = "none";
    }
    

///////////////DELETE RECIPE////////////
const trashIcon = document.querySelectorAll('.fa-trash-alt')
let oneToDelete 

Array.from(trashIcon).forEach((element)=>{
    element.addEventListener('click', divShowDelete)
})

function divShowDelete() {
    console.log('trash can clicked')
    document.querySelector('#popupContainerDelete').style.display = "flex";
    oneToDelete = this.parentNode.childNodes[1].innerText
    }


document.querySelector('#deleteButton').addEventListener('click', deleteRecipe)

async function deleteRecipe(){

    try{
        const response = await fetch('deleteRecipe', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'recipeName': oneToDelete
            })
        })
        const data = await response.json()
        console.log(data)
        location.reload()
    }catch(err){
        console.log(err)
    }
}

///////////////Unit Converter///////////////
document.querySelector('#convertUnitsButton').addEventListener('click', convertUnit)
const showConvertedUnit = document.querySelector('#convertedUnitDisplay')

const convertAllPurposeFlour = {
    cupsToGrams(amountToConvert){
        console.log(amountToConvert * 125)
    },
    gramsToCups(amountToConvert){
        showConvertedUnit.innerText = amountToConvert / 125
    }
}
    
function convertUnit() {
    const selectedIngredient = document.querySelector('#ingredientToConvert').value
    const convertFrom = document.querySelector('#convertFromUnit').value 
    const convertTo = document.querySelector('#convertToUnit').value
    const amountToConvert = document.querySelector('#amountToConvert').value

    if(selectedIngredient === 'allPurposeFlour' && convertFrom === 'cups' && convertTo === 'grams')
    convertAllPurposeFlour.cupsToGrams(amountToConvert)

    if(selectedIngredient === 'allPurposeFlour' && convertFrom === 'grams' && convertTo === 'cups')
    convertAllPurposeFlour.gramsToCups(amountToConvert)
    




    
}

