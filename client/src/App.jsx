import './App.scss';
import globalStyles from './styles/global.module.scss';

import { useAuth } from './hooks/auth.hook';
import { useRoutes } from './hooks/routes.hook';

import Loading from './ui/Loading';

function App() {
  const { isAuthorization, ready } = useAuth();
  const routes = useRoutes(isAuthorization);

  if (ready === false) {
    return <Loading />;
  }

  return <div className={globalStyles.wrapper}>{routes}</div>;
}

export default App;
