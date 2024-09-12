let arrOptions = [];
export function genre(data) {
  const arrGenres = [];
  data.items.forEach((item) => {
    for (let key in item.genres[0]) {
      if (arrGenres.includes(item.genres[0][key])) {
        return;
      } else {
        arrGenres.push(item.genres[0][key]);
      }
    }
  });
  arrOptions = arrGenres.map((item) => {
    return `<option value=${item}>${item}</option>`;
  });
  return arrOptions;
}
