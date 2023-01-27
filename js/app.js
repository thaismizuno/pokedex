let pokemonPromises = []
let primaryTypeInfo = []
let secondaryTypeInfo = []

const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`

const generatePokemonPromises = (quantity, startsAt) => Array(quantity).fill().map((_, index) =>
  (
    fetch(getPokemonUrl(index + startsAt))
      .then(response => response.json())
  )
)

const generateHTML = pokemons => {
  console.log(pokemons)
  clearPrimaryTypeInfo()
  clearSecondaryTypeInfo()

  return pokemons.reduce((accumulator, { name, id, sprites, types }) => {
    const elementTypes = types.map(typeInfo => `<span class="badge type-${typeInfo.type.name}">${formatTypes(typeInfo.type.name)}</span>`)

    findAndSetPrimaryTypeInfo(types[0].type.name)

    let secondaryType = ''
    if (types[1] !== undefined) {
      secondaryType = types[1].type.name
      findAndSetSecondaryTypeInfo(secondaryType)
    }

    accumulator += `
      <div class="col-md-6 col-lg-3" data-js="box-pokemon" primary-type="${types[0].type.name}" secondary-type="${secondaryType}" number="${id}" name="${name}">
        <div class="card mb-3 box-shadow card-pokemon">
          <div class="card-pokemon-imagem">
            <img alt="${name}" src="${sprites.other.dream_world.front_default === null ? sprites.front_default : sprites.other.dream_world.front_default}">
          </div>
          <div class="card-body">
            <p class="text-center">
              <small># ${formatNumber(id)}</small><br>
              <strong>${formatName(name)}</strong><br>
              ${elementTypes.join("<br>")}</p>
          </div>
        </div>
      </div>
    `

    return accumulator
  }, "")
}

const insertPokemonsIntoPage = pokemons => {
  const div = querySelector('[data-js="pokedex"]')
  div.innerHTML = pokemons
}

const filterGeneration = generation => {
  const divTitle = querySelector('[data-js="pokedex-title"]')
  divTitle.innerHTML = `<h2>Geração ${generation}</h2>`

  // I -> 151 / 1 a 151
  // II -> 100 / 152 a 251
  // III -> 135 / 252 a 386
  // IV -> 107 / 387 a 493
  // V -> 156 / 494 a 649
  // VI -> 72 / 650 a 721
  // VII -> 86 / 722 a 809
  // VIII -> 95 / 810 a 890
  let quantity = [0, 151, 100, 135, 107, 156, 72, 86, 95];
  let startsAt = [0, 1, 152, 252, 387, 494, 650, 722, 810];

  pokemonPromises = generatePokemonPromises(quantity[generation], startsAt[generation])

  Promise.all(pokemonPromises)
    .then(generateHTML)
    .then(insertPokemonsIntoPage)
    .then(primaryTypeHTML)
    .then(secondaryTypeHTML)
}

filterGeneration(1)

const changeGeneration = () => {
  const generationAux = getElementById("inputGroupSelectPokemonGenerations").value.split('-');
  const generation = generationAux[1]

  filterGeneration(generation)
}
