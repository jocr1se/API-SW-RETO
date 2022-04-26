const axios = require("axios");

interface responseApi {
  titulo: string;
  personaje: string;
}

export const getDataApi = async (id: number): Promise<responseApi> => {
  const URI_FILMS = `https://swapi.py4e.com/api/films/${id}/`;
  const URI_PEOPLE = `https://swapi.py4e.com/api/people/${id}/`;

  const responseFilm = await axios.get(URI_FILMS, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
  const responsePeople = await axios.get(URI_PEOPLE, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });
  const { title } = responseFilm.data;
  const { name } = responsePeople.data;
  console.log(URI_PEOPLE);
  console.log(responsePeople);
  return {
    titulo: title,
    personaje: name,
  };
};
