import Header from './components/Header';
import Footer from './components/Footer';
import Layout from './components/Layout';
import Main from './components/Main';
import { Route, Routes } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { updateToken } from './store/token/tokenAction';
import { getToken } from './api/token';
import { allCurrenciesAsuncRequest } from './store/ext/extAction';

function App() {
  const dispatch = useDispatch();
  dispatch(updateToken(getToken()));
  dispatch(allCurrenciesAsuncRequest());

  return (
    <div className="app">
      <Routes>
        <Route
          path="*"
          element={
            <>
              <Header className="header" />
              <Layout>
                <Main />
              </Layout>
              <Footer />
            </>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
