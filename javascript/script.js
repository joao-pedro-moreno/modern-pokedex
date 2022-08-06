const form = document.querySelector(".form")
const input = document.querySelector(".input-search")
const buttonPrev = document.querySelector(".btn-prev")
const buttonNext = document.querySelector(".btn-next")
const pokemonImage = document.querySelector(".pokemon-image")
const pokemonPhoto = document.querySelector(".pokemon-photo")
const pokemonId = document.querySelector(".pokemon-id")
const pokemonName = document.querySelector(".pokemon-name")
const pokemonType0 = document.querySelector(".pokemon-type0")
const pokemonType1 = document.querySelector(".pokemon-type1")
const pokemonSkill0 = document.querySelector(".pokemon-skill0")
const pokemonSkill1 = document.querySelector(".pokemon-skill1")
const pokemonHealth = document.querySelector(".pokemon-health")
const pokemonAttack = document.querySelector(".pokemon-attack")
const pokemonDefense = document.querySelector(".pokemon-defense")
const pokemonSpecialAttack = document.querySelector(".pokemon-special-attack")
const pokemonSpecialDefense = document.querySelector(".pokemon-special-defense")
const pokemonSpeed = document.querySelector(".pokemon-speed")

let searchPokemon = 1

const fetchPokemon = async (pokemon) => {
    const APIResponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
    
    if (APIResponse.status === 200) {
        const data = await APIResponse.json()
        return data
    }
}

const renderPokemon = async (pokemon) => {
    pokemonName.innerHTML = "Loading..."
    pokemonId.innerHTML = ""

    const data = await fetchPokemon(pokemon)

    if (data) {

        if (data["types"]["1"] == undefined) {
            pokemonType1.innerHTML = ""
        } else {
            pokemonType0.innerHTML = data["types"]["1"]["type"]["name"]
        }

        if (data["abilities"]["1"] == undefined) {
            pokemonSkill1.innerHTML = ""
        } else {
            pokemonSkill1.innerHTML = data["abilities"]["1"]["ability"]["name"]
        }

        if (data["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_default"] == null) {
            pokemonImage.src = "../assets/pokemon-logo.png"
        } else {
            pokemonImage.src = data["sprites"]["versions"]["generation-v"]["black-white"]["animated"]["front_default"]
        }

        pokemonImage.style.display = "block"
        pokemonId.innerHTML = data.id
        pokemonName.innerHTML = data.name
        pokemonType0.innerHTML = data["types"]["0"]["type"]["name"]
        pokemonSkill0.innerHTML = data["abilities"]["0"]["ability"]["name"]
        pokemonHealth.style.height = `${data["stats"]["0"]["base_stat"]}%`
        pokemonAttack.style.height = `${data["stats"]["1"]["base_stat"]}%`
        pokemonDefense.style.height = `${data["stats"]["2"]["base_stat"]}%`
        pokemonSpecialAttack.style.height = `${data["stats"]["3"]["base_stat"]}%`
        pokemonSpecialDefense.style.height = `${data["stats"]["4"]["base_stat"]}%`
        pokemonSpeed.style.height = `${data["stats"]["5"]["base_stat"]}%`

        input.value = ""
        searchPokemon = data.id
    } else {
        pokemonImage.style.display = "none"
        pokemonName.innerHTML = "Not Found"
        pokemonId.innerHTML = ""
        pokemonType0.innerHTML = ""
        pokemonType1.innerHTML = ""
        pokemonSkill0.innerHTML = ""
        pokemonSkill1.innerHTML = ""
        pokemonHealth.style.height = "0px"
        pokemonAttack.style.height = "0px"
        pokemonDefense.style.height = "0px"
        pokemonSpecialAttack.style.height = "0px"
        pokemonSpecialDefense.style.height = "0px"
        pokemonSpeed.style.height = "0px"
    }
}

form.addEventListener("submit", (event) => {
    event.preventDefault()

    renderPokemon(input.value.toLowerCase())
})

buttonPrev.addEventListener("click", () => {
    if (searchPokemon > 1) {
        searchPokemon -= 1
        renderPokemon(searchPokemon)
    }
})

buttonNext.addEventListener("click", () => {
    searchPokemon += 1
    renderPokemon(searchPokemon)
})

function leftArrow() {
    if (`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${searchPokemon}.gif` == null) {
        pokemonImage.src = "../assets/pokemon-logo.png"
    } else if (pokemonImage.src.includes('back')) {
        pokemonImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${searchPokemon}.gif`
    } else {
        pokemonImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/${searchPokemon}.gif`
    }
}

function rightArrow() {
    if (`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${searchPokemon}.gif` == null) {
        pokemonImage.src = "../assets/pokemon-logo.png"
    } else if (pokemonImage.src.includes('back')) {
        pokemonImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/${searchPokemon}.gif`
    } else {
        pokemonImage.src = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated/back/${searchPokemon}.gif`
    }
}

renderPokemon(searchPokemon)