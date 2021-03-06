import {Switch} from 'react-router-dom';
import Route from './Route'
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Dashboard from '../pages/Dashboard';
import Devices from '../pages/Devices';
import Profile from '../pages/Profile';
import Stock from '../pages/Stock';
import EditDevices from '../pages/EditDevices';

export default function Routes(){
    return(
        <Switch>
            <Route exact path="/" component={SignIn}/>
            <Route exact path="/register" component={SignUp}/>
            <Route exact path="/dashboard" component={Dashboard} isPrivate/>
            <Route exact path="/profile" component={Profile} isPrivate/>
            <Route exact path="/inventario" component={Devices} isPrivate/>
            <Route exact path="/stock" component={Stock} isPrivate/>
            <Route exact path="/inventario/:id" component={EditDevices} isPrivate/>
        </Switch>
    )
}