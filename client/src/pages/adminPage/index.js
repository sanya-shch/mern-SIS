import React, {Component} from 'react'
import {Switch, Route, Link} from 'react-router-dom'

import UserPanel from './addUserTab/UserPanel'
import UserAddPanel from './addUserTab/UserAddPanel'

import StudentAddPanel from './addUserTab/StudentAddPanel'
import StudentUpdatePanel from './addUserTab/StudentUpdatePanel'

import TeacherAddPanel from './addUserTab/TeacherAddPanel'
import TeacherUpdatePanel from './addUserTab/TeacherUpdatePanel'

import './AdminPage.css'
import '../../index.css'

import Typography from '@material-ui/core/Typography';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

class AdminPage extends Component {
    constructor() {
        super();
        this.state = {
            value: 0
        };
    }

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {

        const { value } = this.state;
        return (
            <div className="boby_block">
                <div>
                    <Tabs
                        value={value}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        centered
                    >
                        <Tab label="Головна" component={Link} to="/admin" />
                        <Tab label="Додати користувачів" component={Link} to="/admin/add_user" />
                        <Tab label="Розклад" component={Link} to="/admin/scheduler" />
                        <Tab label="Новини" component={Link} to="/admin/news" />
                    </Tabs>
                </div>

                <Switch>
                    <Route
                        exact path="/admin"
                        render={() =>
                            <div>
                                <Typography component="h2" variant="display4" gutterBottom>
                                    Admin page
                                </Typography>
                            </div>}
                    />
                    <Route
                        path="/admin/add_user"
                        render={() =>
                            <div className="content wrapper clearfix">
                                <div className="menu left">
                                    <a href="#add_user">Добавити користувача</a>
                                    <a href="#list_user">Список користувачів</a>
                                    <a href="#add_student">Добавити студента</a>
                                    <a href="#list_student">Список студентів</a>
                                    <a href="#add_teacher">Добавити вчителя</a>
                                    <a href="#list_teacher">Список вчителів</a>
                                </div>
                                <div className="examples left">

                                    <div className="example" id="add_user">
                                        <Typography component="h2" variant="display3" gutterBottom>
                                            Добавити користувача
                                        </Typography>
                                        <UserAddPanel/>
                                    </div>
                                    <div className="example" id="list_user">
                                        <Typography component="h2" variant="display3" gutterBottom>
                                            Список користувачів
                                        </Typography>
                                        <UserPanel />
                                    </div>
                                    <div className="example" id="add_student">
                                        <Typography component="h2" variant="display3" gutterBottom>
                                            Добавити студента
                                        </Typography>
                                        <StudentAddPanel />
                                    </div>
                                    <div className="example" id="list_student">
                                        <Typography component="h2" variant="display3" gutterBottom>
                                            Список студентів
                                        </Typography>
                                        <StudentUpdatePanel />
                                    </div>
                                    <div className="example" id="add_teacher">
                                        <Typography component="h2" variant="display3" gutterBottom>
                                            Добавити вчителя
                                        </Typography>
                                        <TeacherAddPanel />
                                    </div>
                                    <div className="example" id="list_teacher">
                                        <Typography component="h2" variant="display3" gutterBottom>
                                            Список вчителів
                                        </Typography>
                                        <TeacherUpdatePanel />
                                    </div>
                                </div>
                            </div>}
                    />
                    <Route
                        path="/admin/scheduler"
                        render={() =>
                            <div>

                            </div>}
                    />
                    <Route
                        path="/admin/news"
                        render={() =>
                            <div>

                            </div>}
                    />
                </Switch>

                <footer>
                    <h1>footer admin</h1>
                </footer>
            </div>
        )
    }
}

export default AdminPage;
