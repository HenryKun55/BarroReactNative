import { createStackNavigator } from 'react-navigation';

import SignIn from '../pages/signIn';
import SignUp from '../pages/signUp';
import Home from '../pages/home';

const Routes = createStackNavigator({
  SignIn,
  SignUp,
  Home,
});

export default Routes;