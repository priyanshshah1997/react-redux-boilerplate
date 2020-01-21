import React from 'react';
import ReactDOM from 'react-dom';
import App from '../containers/app';
import { Provider } from 'react-redux'
import store, { history } from '../modules/Redux/store'
import { ConnectedRouter } from "connected-react-router"
it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(<Provider store={store}>
    <ConnectedRouter history={history}>
      <div>
        <App history={history}/>
      </div>
    </ConnectedRouter>
  </Provider>, div);
});
