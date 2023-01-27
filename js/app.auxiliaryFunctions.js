const querySelector = info => {
  return document.querySelector(info)
}

const getElementById = info => {
  return document.getElementById(info)
}

const formatNumber = number => {
  const count = number.toString().length;

  for (let i = count; i < 3; i++) {
    number = '0' + number.toString();
  }
  
  return number;
}

const formatName = name => {
  let auxName = []

  name.split(" ").forEach(element => {
    auxName.push(element[0].toUpperCase() + element.substr(1))
  });

  return auxName.length === 1 ? auxName[0] : auxName.join(' ')
}

const formatTypes = type => {
  const typeInfo = translateTypes.find(element => element.type === type);
  return typeInfo ? typeInfo.translate : type
}

const orderAsc = list => {
  return list.map((val, ind) => {return {ind, val}})
              .sort((a, b) => {return a.val > b.val ? 1 : a.val == b.val ? 0 : -1 })
              .map((obj) => obj.ind);
}

const orderDesc = list => {
  return list.map((val, ind) => {return {ind, val}})
              .sort((a, b) => {return a.val > b.val ? 1 : a.val == b.val ? 0 : -1 }).reverse()
              .map((obj) => obj.ind);
}