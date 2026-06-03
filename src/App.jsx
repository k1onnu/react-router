import { lazy, Suspense } from 'react';
import { Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Loader from './components/Loader';
import PrivateRoute from './components/PrivateRoute';
import NetworkStatus from './components/NetworkStatus';
import { AuthProvider } from './contexts/AuthContext';
import './App.css';

const Home = lazy(() => import('./pages/Home'));
const List = lazy(() => import('./pages/List'));
const Details = lazy(() => import('./pages/Details'));
const About = lazy(() => import('./pages/About'));
const Favourites = lazy(() => import('./pages/Favourites'));
const Login = lazy(() => import('./pages/Login'));

function App() {
  return (
    <AuthProvider>
      <div className="App">
        <NetworkStatus />
        <Navigation />
        <main className="main-content">
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/list" element={<List />} />
              <Route path="/list/:id" element={<Details />} />
              <Route path="/about" element={<About />} />
              <Route path="/login" element={<Login />} />
              <Route path="/favourites" element={
                <PrivateRoute>
                  <Favourites />
                </PrivateRoute>
              } />
            </Routes>
          </Suspense>
        </main>
      </div>
    </AuthProvider>
  );
}

export default App;