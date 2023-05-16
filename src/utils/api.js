import axios from 'axios';
const BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_TOEKN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIzNzdkZWZhNzQyNTAyYzllYTRjMWVhNmM5NTYzNTExNSIsInN1YiI6IjYyMmFjOGE4NDk4ZWY5MDA2ZDE2NWQxYiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.NzDlJ4mmV4NESDZvzeoVMbW2l_loKbk4i-xqPvs_aSc';
const headers = {
  Authorization: 'bearer ' + TMDB_TOEKN,
};

export const fetchDataFromApi = async (url, params) => {
  try {
    const { data } = await axios.get(BASE_URL + url, {
      headers,
      params,
    });

    return data;
  } catch (error) {
    console.log(error);
    return error;
  }
};
