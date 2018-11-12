import  React from 'react'
import { Route, Switch } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store'
import routes from './routes'
import Header from './components/header'
import 'antd/dist/antd.css'
import './assets/common.sass'

export default () => (
  <Provider store={store}>
    <div style={{height: '100%'}}>
      <Header/>
      <Switch>
        {
          routes.map(({ name, path, exact=true, component })=>(
            <Route path={path} exact={exact} component={component} key={name} />
          ))
        }
      </Switch>
    </div>
  </Provider>
)