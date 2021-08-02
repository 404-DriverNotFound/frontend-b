import React, { useEffect } from 'react';
import { Switch, Route } from 'react-router-dom';
import { useUserState } from './utils/hooks/useContext';
import LoginPage from './components/pages/LoginPage/LoginPage';

const App = () => {
  const { id } = useUserState();

  useEffect(() => {
    // TODO: API 서버에서 쿠키에 담긴 세션 아이디 검증
  }, []);

  const children = id ? (
    <Switch>
      <Route exact path="/" render={() => <h1>logged in</h1>} />
    </Switch>
  ) : (
    <Route path="/" component={LoginPage} />
  );

  return children;
};

export default App;
