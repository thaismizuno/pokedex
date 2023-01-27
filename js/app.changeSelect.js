const filterPrimaryType = pokemons => {
  const primaryTypeSelected = getElementById('selectPrimaryType').value

  if (primaryTypeSelected === "") {
    return pokemons
  } else {
    return pokemonsFilter = pokemons.filter(pokemon => pokemon.types[0].type.name === primaryTypeSelected)
  }
}

const changeSelectPrimaryType = () => {
  document.getElementById('inputGroupSelectOrder').selectedIndex = 0

  Promise.all(pokemonPromises)
    .then(filterPrimaryType)
    .then(generateHTML)
    .then(insertPokemonsIntoPage)
    .then(secondaryTypeHTML)
}

const filterSecondaryType = pokemons => {
  const primaryTypeSelected = getElementById('selectPrimaryType').value
  const secondaryTypeSelected = getElementById('selectSecondaryType').value

  if (secondaryTypeSelected === "") {
    return pokemonsFilter = pokemons.filter(pokemon => pokemon.types[0].type.name === primaryTypeSelected)
  } else {
    if (primaryTypeSelected !== "") {
      return pokemonsFilter = pokemons.filter(pokemon => (pokemon.types[0].type.name === primaryTypeSelected) && (pokemon.types[1] !== undefined && pokemon.types[1].type.name === secondaryTypeSelected))
    } else {
      return pokemonsFilter = pokemons.filter(pokemon => pokemon.types[1] !== undefined && pokemon.types[1].type.name === secondaryTypeSelected)
    }
  }
}

const changeSecondaryType = () => {
  document.getElementById('inputGroupSelectOrder').selectedIndex = 0

  Promise.all(pokemonPromises)
    .then(filterSecondaryType)
    .then(generateHTML)
    .then(insertPokemonsIntoPage)
}

const pokemonNames = pokemons => {
  return pokemons.map(pokemon => pokemon.name)
}

const pokemonNumbers = pokemons => {
  return pokemons.map(pokemon => pokemon.id)
}

const sortInformation = pokemons => {
  const orderSelected = getElementById('inputGroupSelectOrder').value
  switch(orderSelected) {
    case '1-9':
      listInfo = orderAsc(pokemonNumbers(pokemons))
      break;
    case '9-1':
      listInfo = orderDesc(pokemonNumbers(pokemons))
      break;
    case 'A-Z':
      listInfo = orderAsc(pokemonNames(pokemons))
      break;
    case 'Z-A':
      listInfo = orderDesc(pokemonNames(pokemons))
      break;
  }

  return listInfo.map((key) => { return pokemons[key] })
}

const changeOrder = () => {
  const primaryTypeSelected = getElementById('selectPrimaryType').value
  const secondaryTypeSelected = getElementById('selectSecondaryType').value

  if (primaryTypeSelected === "" && secondaryTypeSelected === "") {
    Promise.all(pokemonPromises)
    .then(sortInformation)
    .then(generateHTML)
    .then(insertPokemonsIntoPage)
  } else {
    Promise.all(pokemonPromises)
      .then(filterPrimaryType)
      .then(filterSecondaryType)
      .then(sortInformation)
      .then(generateHTML)
      .then(insertPokemonsIntoPage)
  }
}