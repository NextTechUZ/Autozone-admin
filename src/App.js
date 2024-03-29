import React from 'react';
import {Provider} from 'react-redux';
import { QueryClient, QueryClientProvider } from "react-query";
import './shared/styles/crema.less';
import {
  AppContextProvider,
  AppLayout,
  AppLocaleProvider,
  AppThemeProvider,
  AuthRoutes,
} from './@crema';
import configureStore from './redux/store';
import {BrowserRouter} from 'react-router-dom';
import './@crema/services/index';
import JWTAuthProvider from '@crema/services/auth/jwt-auth/JWTAuthProvider';

const store = configureStore();
const queryClient = new QueryClient()

const App = () => (
  <AppContextProvider>
    <Provider store={store}>
      <AppThemeProvider>
        <AppLocaleProvider>
          <BrowserRouter>
            <JWTAuthProvider>
              <AuthRoutes>
              <QueryClientProvider client={queryClient}>
                <AppLayout />
                </QueryClientProvider>
              </AuthRoutes>
            </JWTAuthProvider>
          </BrowserRouter>
        </AppLocaleProvider>
      </AppThemeProvider>
    </Provider>
  </AppContextProvider>
);

export default App;
