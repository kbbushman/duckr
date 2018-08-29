import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { MainContainer, HomeContainer, AuthenticateContainer, FeedContainer, LogoutContainer, UserContainer, DuckDetailsContainer } from 'containers'

const getRoutes = (checkAuth) => {
  return (
    <BrowserRouter>
      <MainContainer>
        <Switch>
          <Route path='/' exact={true} component={checkAuth(HomeContainer)} />
          <Route path='/login' component={checkAuth(AuthenticateContainer)} />
          <Route path='/feed' component={checkAuth(FeedContainer)} />
          <Route path='/duck-detail/:duckId' component={checkAuth(DuckDetailsContainer)} />
          <Route path='/logout' component={LogoutContainer} />
          <Route path='/:uid' component={checkAuth(UserContainer)} />
        </Switch>
      </MainContainer>
    </BrowserRouter>
  )
}

export default getRoutes
