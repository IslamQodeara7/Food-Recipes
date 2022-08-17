let foodList = [];
let foodResults = document.querySelector(".foodResults");
let IngredientsObj={};
let searchInput = document.querySelector(".searchDiv input");
let searchButton = document.querySelector(".searchButton")
async function getFood(keyword){
let foodType = await fetch(`https://forkify-api.herokuapp.com/api/search?q=${keyword}`);
foodList = await foodType.json();
foodList = foodList.recipes;
console.log("foodlist is",foodList);
displayFood();
}

getFood("pasta");



function displayFood(){
  let temp = ``;
  foodList.forEach((element,index)=>{
    temp+=` <div class="text-center col-lg-4 col-md-6">
    <div style="height: 400px; border-radius: 50px; overflow: hidden;" class="my-3 item bg-white">
    <img src="${(element.image_url!=null)?element.image_url:'Images/broken-1.png'}" alt="">
   <div class="p-5 foodInfo">
   <h4 class="text-success my-2">${element.title}</h4>
  </div>

    
   <div class="layer d-flex justify-content-center align-items-center">
   <button onclick="getIngredients('${element.recipe_id}')"  class="btn btn-outline-light view">View Ingredients <i class="mx-2 fa-solid fa-kitchen-set"></i></button>
   </div> 
    </div>
    </div> `;
     
   
  })
  foodResults.innerHTML = temp;
 
}


async function getIngredients(id){
  let foodIngredients =await fetch(`https://forkify-api.herokuapp.com/api/get?rId=${id}`);
  IngredientsObj =await foodIngredients.json();
  
  document.querySelector(".layer2 h3").innerHTML= IngredientsObj.recipe.title;
  document.querySelector(".layer2 p").innerHTML = IngredientsObj.recipe.ingredients.join(',');
  document.querySelector(".layer2").style.height = "75%";
  document.querySelector(".layer2").style.padding = "50px";
  console.log(IngredientsObj.recipe.ingredients.join(','));
}

function closeLayer2(){
  document.querySelector(".layer2").style.height = "0%";
  document.querySelector(".layer2").style.padding = "0px";
}

document.addEventListener("keyup",closeLayer2);

searchButton.addEventListener("click",search);

function search(){
  if(searchInput.value){
    getFood(searchInput.value.toLowerCase());
  }
  else{
    alert("you can't search an empty value")
  }
}
// Images/broken-1.png
//   <div class="col-lg-4 col-md-6">
/* <div style="height: 500px; border-radius: 50px; overflow: hidden;" class="my-3 item bg-white">
<img class="w-100" src="" alt="">

</div>
</div> */

