import './App.css';
import { fetchDataFromApi } from './utils/api';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getApiConfiguration, getGenres } from './store/homeSlice';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import Home from './pages/home/home';
import NotFound from './pages/404/PageNotFound';
import Details from './pages/details/details';
import Explore from './pages/explore/explore';
import SearchResults from './pages/searchRedults/searchResults';
import Header from './components/header/header';
import Footer from './components/Footer/footer';

function App() {
  //const { results } = useSelector((state) => state.home.url);

  const dispatch = useDispatch();

  useEffect(() => {
    fetchDataFromApi('/configuration').then((res) => {
      const url = {
        backdrop: res.images.secure_base_url + 'original',
        poster: res.images.secure_base_url + 'original',
        profile: res.images.secure_base_url + 'original',
      };
      dispatch(getApiConfiguration(url));
    });
  }, [dispatch]);

  useEffect(() => {
    const genresCall = async () => {
      let promise = [];
      let endPoints = ['tv', 'movie'];
      let allGenres = {};
      endPoints.forEach((url) => {
        promise.push(fetchDataFromApi(`/genre/${url}/list`));
      });
      const data = await Promise.all(promise);

      data.map(({ genres }) => {
        return genres.map((item) => {
          return (allGenres[item.id] = item);
        });
      });
      dispatch(getGenres(allGenres));
    };
    genresCall();
  }, [dispatch]);

  return (
    <>
      <Router>
        <Header></Header>
        <main>
          <Routes>
            <Route path="/" element={<Home></Home>}></Route>
            <Route path="*" element={<NotFound></NotFound>}></Route>
            <Route path="/:mediaType/:id" element={<Details></Details>}></Route>
            <Route path="/search/:query" element={<SearchResults />}></Route>
            <Route
              path="explore/:mediaType"
              element={<Explore></Explore>}
            ></Route>
          </Routes>
        </main>
        <Footer></Footer>
      </Router>
    </>
  );
}

export default App;
