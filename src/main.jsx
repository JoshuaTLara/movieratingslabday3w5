import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';
import App from './App.jsx';
import './css/index.css';
import ErrorPage from './pages/ErrorPage.jsx';
import IndexPage from './pages/IndexPage.jsx';
import AllMoviesPage from './pages/AllMoviesPage.jsx';
import axios from 'axios';
import MovieDetailPage from './pages/MovieDetailPage.jsx';
import LoginPage from './pages/LoginPage.jsx';
import YourRatingsPage from './pages/YourRatingsPage.jsx';



const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />} errorElement={<ErrorPage />}>
      <Route index element={<IndexPage />} />
      <Route
        path="movies"
        element={<AllMoviesPage />}
        loader={async () => {
        const res = await axios.get('/api/movies');
        console.log(res.data)
        return { movies: res.data };

        // const { data } = await axios.get('/api/movies');
        // console.log(data)
        // return data
  }}
/>
<Route
  path="movies/:movieId"
  element={<MovieDetailPage />}
  loader={async ({ params }) => {
    const res = await axios.get(`/api/movies/${params.movieId}`);
    return { movie: res.data };
  }}
/>
    {/* Login */}
    <Route path="login" element={<LoginPage />} />
     {/* Your ratings */}
     {/* <Route path="me" element={<YourRatingsPage />} /> */}

     <Route
       path="me"
        element={<YourRatingsPage />}
        loader={async () => {
        const res = await axios.get('/api/ratings');
        return { ratings: res.data };
  }}
/>

    </Route>,
  ),
);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
