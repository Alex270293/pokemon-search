let input= document.getElementById("search-input");

let pokeDataArr=[];

let inputMinusculas = "";

let searchButton = document.querySelector("#search-button");
let hp = document.querySelector('#hp');
let attack = document.querySelector('#attack');
let defense = document.querySelector('#defense');
let specialAttack = document.querySelector('#special-attack');
let specialDefense = document.querySelector('#special-defense');
let speed = document.querySelector('#speed');
let pokemonName = document.querySelector('#pokemon-name');
let pokemonId = document.querySelector('#pokemon-id');
let height = document.querySelector('#height');
let weight =  document.querySelector('#weight');
let types = document.querySelector('#types');
let divImagen = document.querySelector('#div-imagen');
let imgDiv = document.querySelector('#img');

let abc= ["a", "b", "c", "d", "e", "f", "g","h", "i", "j","k", "l", "m", "n","ñ", "o", "p", "q", "r", "s","t","u", "v","w", "x", "y", "z", "1",'2','3','4','5','6','7','8','9',"0" ];

//devolver la busque en minusculas y sin simbolos.
let filtroDeBusqueda = () =>{

  if (input.value >= 0) {
    inputMinusculas= input.value
  } else {
    for (const key in input.value) {
        
      let comparador = abc.includes(input.value[key].toLowerCase());

       let filtroSimbolos =  comparador === true ?  input.value[key].toLocaleLowerCase(): false;
        
         if (filtroSimbolos != false) {
           inputMinusculas += filtroSimbolos;
         }
       
       }
  }

}

filtroDeBusqueda();


let pokeBuscador= () =>{

    let f = input.value.includes("♀");
    let m = input.value.includes("♂")

     if (f == true ) {
      fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${inputMinusculas}-f`)
    .then((res) => res.json())
    .then((data)=>{
    pokeDataArr = data;
     displayPokemon()
    } );
    } else if( m == true){
      fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${inputMinusculas}-m`)
      .then((res) => res.json())
      .then((data)=>{

      pokeDataArr = data;
      displayPokemon()
    } );
    } else {
     fetch(`https://pokeapi-proxy.freecodecamp.rocks/api/pokemon/${inputMinusculas}`)
    .then((res) => res.json())
    .then((data)=> {
    pokeDataArr = data
      
      displayPokemon()
    })
    .catch((err) => {
      if (input.value.length != 0) {
        resetDisplay();
      window.alert("Pokémon not found");
      }
      
    });
    }
}

pokeBuscador();

const displayPokemon = () =>{

  hp.textContent = pokeDataArr.stats[0].base_stat
  attack.textContent = pokeDataArr.stats[1].base_stat
  defense.textContent = pokeDataArr.stats[2].base_stat
  specialAttack.textContent = pokeDataArr.stats[3].base_stat
  specialDefense.textContent = pokeDataArr.stats[4].base_stat
  speed.textContent = pokeDataArr.stats[5].base_stat

  pokemonName.textContent = pokeDataArr.name
  pokemonId.textContent = `#${pokeDataArr.id}`
  height.textContent = `height: ${ pokeDataArr.height}`
  weight.textContent = `weight: ${ pokeDataArr.weight}`

  const img = document.createElement("img");
  img.src =  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${pokeDataArr.id}.png`;
  img.alt = "imagen de pokemon";
  img.id = "sprite";
  imgDiv.appendChild(img);

  let span= document.createElement('span')

  for (const key in pokeDataArr.types) {

    span = pokeDataArr.types[key].type.name
    types.innerHTML+= `<span > ${ span}</span>`
  }
}

const resetDisplay = () => {
  
  // reset stats
  
  hp.textContent = "";
  attack.textContent = "";
  defense.textContent = "";
  specialAttack.textContent = "";
  specialDefense.textContent = "";
  speed.textContent = "";
  types.textContent = '';
  pokemonName.textContent = "";
  pokemonId.textContent ="";
  height.textContent = "";
  weight.textContent = "";
  imgDiv.textContent= "";
};

searchButton.addEventListener("click",e=>{
  e.preventDefault();
 
  resetDisplay()
  
  filtroDeBusqueda();
  
  pokeBuscador();
  inputMinusculas = "";
  
})

