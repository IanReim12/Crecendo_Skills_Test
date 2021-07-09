//#############################################Program Start###############################################
//
//
//-------------Must change path to >>> fe-skill-test-recipe-api <<<------------------------------------
//
//
//understanding the problem - we need to pull data from the json server from both the recipes and specials endpoints
//then we need to create an app that allows users to view the recipes, and specials.

//sub problems
//1)What does a recipe contain?
//a)Recipe {
/*uuid: String
    title: String
    description: String
    images: {
      full: String
      medium: String,
      small: String
    }
    servings: Number
    prepTime: Number
    cookTime: Number
    postDate: Date
    editDate: Date
    ingredients: [
      Ingredient {
        uuid: String
        amount: Number
        measurement: String
        name: String
      }
    ]
    directions: [
      Direction {
        instructions: String
        optional: Boolean
      }
    ]
  }
]*/
//2)How do we access individual pices of the recipe?
//a)each recipe has a number that represents its place from 0 being the first one
//b)think of all recipes as being elements of an array

//3)How do we access individual json attributes?
//a)after refrencing which recipe you want to access all you need to do is include a second bracket, and enter the string of the desired attribute. recipe[0]["title"];

//What I need to do
//1) create a layout using HTML and CSS
//2) list all the recipes without their attribues on the display
//3) create the functionality to allow users to click the recipe they want, then expand the desired recipe to reveal the recipes attributes, and on next click collaps it again.
//4) Create the specials section which should desplay the ingridientID, the type, and the title of the special.

//selecting elements
const recipeBook = document.querySelector(".recipe-book");
//array of ingredient uudi's alocated in the addIngredients func
const ingredientsUUID = [];

//array of images paths
const recipeImages = [
  [
    "../img/queso_brat_scramble.jpg",
    "../img/queso_brat_scramble--m.jpg",
    "../img/queso_brat_scramble--s.jpg",
  ],
  [
    "../img/italian_meatballs.jpg",
    "../img/italian_meatballs--m.jpg",
    "../img/italian_meatballs--s.jpg",
  ],
  [
    "../img/kielbasa_skillet.jpg",
    "../img/kielbasa_skillet--m.jpg",
    "../img/kielbasa_skillet--s.jpg",
  ],
  [
    "../img/brussel_chips.jpg",
    "../img/brussel_chips--m.jpg",
    "../img/brussel_chips--s.jpg",
  ],
  [
    "../img/pancake_mountain.jpg",
    "../img/pancake_mountain--m.jpg",
    "../img/pancake_mountain--s.jpg",
  ],
];
//array of recipe <img> element id's
const recipeImgIDs = [
  "queso-brat-image",
  "italian-meatball-image",
  "kielbasa-skillet-image",
  "brussel-chips-image",
  "pancake-mountain-image",
];
//array of page titles for the recipes
const recipePageLinks = [
  "recipes/QuesoBratScramble.html",
  "recipes/ItalianMeatballs.html",
  "recipes/KielbasaSkillet.html",
  "recipes/BrusselChips.html",
  "recipes/PancakeMountain.html",
];
//ids for the links created on main
const recipeLinkIds = [
  "queso-brat-link",
  "italian-meatballs-link",
  "kielbasa-skillit-link",
  "brussel-chips-link",
  "pancake-mountain-link",
];
//array of recipe direction <ol> id's
const recipeDirectionListIDs = [
  "queso-brat-directions",
  "italian-meatball-directions",
  "kielbasa-skillet-directions",
  "brussel-chips-directions",
  "pancake-mountain-directions",
];
//array of recipe ingredients <ol> id's
const recipeIngredientsListIDs = [
  "qb-ingredients-list",
  "italian-mb-ingredients-list",
  "ks-ingredients-list",
  "bc-ingredients-list",
  "pm-ingredients-list",
];

function addDirections(jsonData, recipeDirectionsList) {
  const directionList = document.getElementById(recipeDirectionsList);
  for (let i = 0; i < jsonData["directions"].length; i++) {
    let embededList = document.createElement("ul");
    console.log(jsonData["directions"][i]);
    for (let key in jsonData["directions"][i]) {
      let value = jsonData["directions"][i][key];
      let li = document.createElement("li");
      switch (key) {
        case "instructions":
          let instructionStr = JSON.stringify(value);
          li.innerHTML += `${instructionStr}`;
          directionList.appendChild(li);
          break;
        case "optional":
          if (value == 1) {
            li.innerHTML += `Optional Step`;
            directionList.appendChild(embededList);
            embededList.appendChild(li);
          } else {
            console.log("essential step");
          }
      }
    }
  }

  // for (let key in jsonData["directions"]) {
  //   let value = jsonData["directions"][key];
  //   let li = document.createElement("li");
  //   let valStr = JSON.stringify(value);
  //   li.innerHTML += `${valStr}`;
  //   directionList.appendChild(li);
  // }
}
function ingredientIDChecker(specialsData, uuid) {
  for (let i = 0; i < specialsData.length; i++) {
    if (specialsData[i]["ingredientId"] === uuid) {
      return true;
    }
  }
}
function specialsInfoApplyer(specialsData, uuid) {
  for (let i = 0; i < specialsData.length; i++) {
    if (specialsData[i]["ingredientId"] === uuid) {
      sJTitle = specialsData[i]["title"];
      sJType = specialsData[i]["type"];
      sJText = specialsData[i]["text"];

      sTitle = JSON.stringify(sJTitle);
      sType = JSON.stringify(sJType);
      sText = JSON.stringify(sJText);
      return [sTitle, sType, sText];
    }
  }
}
function addIngredients(jsonData, recipeIngredientsList, specialsData) {
  let appended = false;
  const ingredientsList = document.getElementById(recipeIngredientsList);
  //loop throguh all recipe ingredients
  for (let i = 0; i < jsonData["ingredients"].length; i++) {
    //inner bullet list
    let embededList = document.createElement("ul");
    //loop throguh each ingredient attribute for current ingredient
    for (let key in jsonData["ingredients"][i]) {
      let value = jsonData["ingredients"][i][key];

      let li = document.createElement("li");
      switch (key) {
        case "uuid":
          if (ingredientIDChecker(specialsData, value) === true) {
            let [sTitle, sType, sText] = specialsInfoApplyer(
              specialsData,
              value
            );

            let liSpecial = document.createElement("li");
            liSpecial.innerHTML += `SPECIAL:   ${sType} -- ${sTitle} -- ${sText}`;
            ingredientsList.appendChild(liSpecial);
            ingredientsList.appendChild(embededList);
            appended = true;
          }
          ingredientsUUID.push(value);
          break;

        case "name":
          let nameStr = JSON.stringify(value);
          li.innerHTML += `Name: ${nameStr}`;
          embededList.appendChild(li);
          break;

        case "amount":
          let amountStr = JSON.stringify(value);
          li.innerHTML += `Amount: ${amountStr} `;
          if (appended === false) {
            ingredientsList.appendChild(li);
            ingredientsList.appendChild(embededList);
          } else {
            embededList.appendChild(li);
            appended = false;
          }

          break;

        case "measurement":
          if (value === "") {
            console.log("empty");
          } else {
            let measurementStr = JSON.stringify(value);
            li.innerHTML += `Measurement: ${measurementStr} `;
            embededList.appendChild(li);
          }
          break;
      }
    }
  }
  console.log(jsonData["ingredients"][0]["amount"]);
}

//recipeBook unordered list manipulator
function addRecipe(recName, link, idName) {
  let li = document.createElement("li");
  li.setAttribute("id", idName);
  li.innerHTML += `<a href=  ${link}> ${recName} </a>`;
  recipeBook.appendChild(li);
}
//adds links on main, and fills in recipe details on recipe pages
function addRecipeInfo(jsonData, recipeInfoList) {
  for (let key in jsonData) {
    let value = jsonData[key];
    let li = document.createElement("li");
    if (key !== "directions") {
      if (key !== "ingredients") {
        if (key !== "images") {
          li.innerHTML += `${key} : ${value}`;
          recipeInfoList.appendChild(li);
          console.log(key);
        }
      }
    }
  }
}
function recipeImageLoader(imgTagID, recipeImgPath) {
  const recipeImage = document.getElementById(imgTagID);
  recipeImage.setAttribute("src", recipeImgPath);
}

//function used to do stuff to the json promise--------------------------------------------------
const jsonActions = function (jsonData, specialsData) {
  let currentPage = document.URL;
  ingredientIDChecker(specialsData, "62798278-2fbc-4c31-98de-b7959c191688");
  //initialise each page
  switch (currentPage) {
    case "http://127.0.0.1:8080/":
      for (let i = 0; i < jsonData.length; i++) {
        addRecipe(jsonData[i]["title"], recipePageLinks[i], recipeLinkIds[i]);
      }
      break;
    case "http://127.0.0.1:8080/recipes/QuesoBratScramble.html":
      const qbDescription = document.getElementById("qb-description-list");

      console.log(qbDescription);
      addRecipeInfo(jsonData[0], qbDescription);
      recipeImageLoader(recipeImgIDs[0], recipeImages[0][1]);
      addDirections(jsonData[0], recipeDirectionListIDs[0]);
      addIngredients(jsonData[0], recipeIngredientsListIDs[0], specialsData);

      break;
    case "http://127.0.0.1:8080/recipes/ItalianMeatballs.html":
      const italianMbDescription = document.getElementById(
        "italian-mb-description-list"
      );
      addRecipeInfo(jsonData[1], italianMbDescription);
      recipeImageLoader(recipeImgIDs[1], recipeImages[1][1]);
      addDirections(jsonData[1], recipeDirectionListIDs[1]);
      addIngredients(jsonData[1], recipeIngredientsListIDs[1], specialsData);
      break;
    case "http://127.0.0.1:8080/recipes/KielbasaSkillet.html":
      const ksDescription = document.getElementById("ks-description-list");
      addRecipeInfo(jsonData[2], ksDescription);
      recipeImageLoader(recipeImgIDs[2], recipeImages[2][1]);
      addDirections(jsonData[2], recipeDirectionListIDs[2]);
      addIngredients(jsonData[2], recipeIngredientsListIDs[2], specialsData);
      break;
    case "http://127.0.0.1:8080/recipes/BrusselChips.html":
      const bcDescription = document.getElementById("bc-description-list");
      addRecipeInfo(jsonData[3], bcDescription);
      recipeImageLoader(recipeImgIDs[3], recipeImages[3][1]);
      addDirections(jsonData[3], recipeDirectionListIDs[3]);
      addIngredients(jsonData[3], recipeIngredientsListIDs[3], specialsData);
      break;
    case "http://127.0.0.1:8080/recipes/PancakeMountain.html":
      const pmDescription = document.getElementById("pm-description-list");
      addRecipeInfo(jsonData[4], pmDescription);
      recipeImageLoader(recipeImgIDs[4], recipeImages[4][1]);
      addDirections(jsonData[4], recipeDirectionListIDs[4]);
      addIngredients(jsonData[4], recipeIngredientsListIDs[4], specialsData);
      break;
  }
};

//-----------------------------------------------------------------------------------------------

//Funcion used to access the desired endpoints recipes or specials--------------------------------
// const getJsonRecipeSelector = function (recOrSpec) {
//   fetch(`http://localhost:3001/${recOrSpec}`)
//     .then((response) => response.json())
//     .then((data) => jsonActions(data));
// };
// const getJsonSpecialsSelector = function (specials) {
//   fetch(`http://localhost:3001/${specials}`)
//     .then((response) => response.json())
//     .then((data) => specialsStorage(data));
// };
async function getJsonData(recipes, specials) {
  const res1 = await fetch(recipes);
  const res2 = await fetch(specials);

  const json1 = await res1.json();
  const json2 = await res2.json();

  jsonActions(json1, json2);
}
//------------------------------------------------------------------------------------------------

getJsonData("http://localhost:3001/recipes", "http://localhost:3001/specials");
