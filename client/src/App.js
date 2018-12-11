import React from 'react';
import {Switch, Route} from 'react-router-dom'

import HomePage from './pages/homePage'
import AdminPage from './pages/adminPage'
import StudentPage from './pages/studentPage'
import TeacherPage from './pages/teacherPage'

import NavBar from "./components/navbar";
import  NavTabs from './components/navbar/NavTabs'

// import "./App.css"

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            loggedIn: false
        };

        this.updateUser = this.updateUser.bind(this);
    }

    updateUser (userObject) {
        this.setState(userObject)
    }

    render() {
        return (
            <div>
                <header>
                    <NavBar updateUser={this.updateUser} loggedIn={this.state.loggedIn} />
                    <NavTabs/>
                    <br/>
                </header>
                <Switch>
                    <Route exact path="/" component={HomePage} />
                    <Route path="/home" component={HomePage} />
                    <Route
                        path="/student"
                        // component={StudentPage}
                        render={() =>
                            <StudentPage updateUser={this.updateUser} />}
                    />
                    <Route
                        path="/teacher"
                        // component={TeacherPage}
                        render={() =>
                            <TeacherPage updateUser={this.updateUser} />}
                    />
                    <Route
                        path="/admin"
                        // component={AdminPage}
                        render={() =>
                        <AdminPage updateUser={this.updateUser} />}
                    />
                </Switch>

            </div>
        );
    }
}

export default App;

