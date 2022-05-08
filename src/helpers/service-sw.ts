const axios = require("axios");

interface responseApi {
  titulo: string;
  personaje: string;
}

interface responsePeople {
  cumpleanhos: string;
  color_ojos: string;
  genero: string;
  color_cabello: string;
  peso: number;
  nombre: string;
  peliculas: string[];
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
  return {
    titulo: title,
    personaje: name,
  };
};

export const getPeopleSW = async (id: string): Promise<responsePeople> => {
  interface DataPeople {
    birth_year: string;
    eye_color: string;
    gender: string;
    hair_color: string;
    height: number;
    name: string;
    films: string[];
  }

  const URI_PEOPLE = `https://swapi.py4e.com/api/people/${id}/`;
  const responsePeople = await axios.get(URI_PEOPLE, {
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
  });

  const {
    birth_year,
    eye_color,
    gender,
    hair_color,
    height,
    name,
    films,
  }: DataPeople = responsePeople.data;

  const peliculas = await Promise.all(
    films.map((film) => axios.get(film))
  ).then((result) => {
    return result[0].data.title;
  });

  console.log(peliculas);
  // films.forEach((element) => {});

  return {
    cumpleanhos: birth_year,
    color_ojos: eye_color,
    genero: gender,
    color_cabello: hair_color,
    peso: height,
    nombre: name,
    peliculas: peliculas,
  };
};
