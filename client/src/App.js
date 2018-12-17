import React from 'react';
import {Switch, Route, Link} from 'react-router-dom'

import Modal from "react-responsive-modal";
import axios from "axios/index";

import Routes from './Routes'
import AdminPage from './pages/adminPage'
import StudentPage from './pages/studentPage'
import TeacherPage from './pages/teacherPage'

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import {withStyles} from "@material-ui/core/styles/index";
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

import LoginForm from "./components/login/LoginForm";

import { Redirect } from 'react-router-dom';

// import "./index.css"

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: -12,
        marginRight: 20,
    },
};

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            value: 0,
            loggedIn: false,
            userId: null,
            openModal: false,
            anchorEl: null,
            role: null
        };
        this.logout = this.logout.bind(this);
    }

    logout(event) {
        event.preventDefault();
        console.log('logging out');
        axios.post('/user/logout').then(response => {
            console.log(response.data);
            if (response.status === 200) {
                this.setState({loggedIn: false, userId: null, role: null});

            }
        }).catch(error => {
            console.log('Logout error', error)
        })
    }

    onOpenModal = () => {
        this.setState({ openModal: true });
    };

    onCloseModal = () => {
        this.setState({ openModal: false });
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    updateData = (value) => {
        this.setState({ loggedIn: value.loggedIn, userId: value.userId, role: value.role/*, openModal: false*/ });
        console.log(this.state);
    };

    handleMenu = event => {
        this.setState({ anchorEl: event.currentTarget });
    };

    handleClose = () => {
        this.setState({ anchorEl: null });
    };

    render() {
        const { classes } = this.props;
        const { openModal, role, value, anchorEl } = this.state;
        const open = Boolean(anchorEl);
        return (
            <div>
                <header>
                    <Paper>
                        <div className={classes.root}>
                            <AppBar position="static">
                                <Toolbar>
                                    <Typography variant="h6" color="inherit" className={classes.grow}>
                                        ДУТ | Кафедра Комп'ютерної інженерії
                                    </Typography>
                                    {this.state.loggedIn ? (
                                        <div>
                                            <IconButton
                                                aria-owns={open ? 'menu-appbar' : undefined}
                                                aria-haspopup="true"
                                                onClick={this.handleMenu}
                                                color="inherit"
                                            >
                                            <AccountCircle />
                                            </IconButton>
                                            <Menu
                                                id="menu-appbar"
                                                anchorEl={anchorEl}
                                                anchorOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                                transformOrigin={{
                                                    vertical: 'top',
                                                    horizontal: 'right',
                                                }}
                                                open={open}
                                                onClose={this.handleClose}
                                            >
                                            <MenuItem component={Link} to="/">Головна</MenuItem>
                                            {role==='a'?
                                                <MenuItem component={Link} to="/admin">Моя сторінка</MenuItem>:
                                                role==='s'?
                                                    <MenuItem component={Link} to="/student">Моя сторінка</MenuItem>:
                                                    <MenuItem component={Link} to="/teacher">Моя сторінка</MenuItem>}
                                            <MenuItem onClick={this.logout}>Вихід</MenuItem>
                                            </Menu>
                                        </div>
                                    ) : (
                                        <div>
                                            <Button color="inherit" onClick={this.onOpenModal}>Login</Button>
                                            <Modal open={openModal} onClose={this.onCloseModal} center>
                                                <LoginForm updateData={this.updateData} />
                                            </Modal>
                                        </div>
                                    )}
                                </Toolbar>
                            </AppBar>
                        </div>
                        <Tabs
                            value={value}
                            onChange={this.handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                            centered
                        >
                            <Tab label="Головна" component={Link} to="/" />
                            <Tab label="Student" component={Link} to="/student" />
                            <Tab label="Teacher" component={Link} to="/teacher" />
                            <Tab label="Admin" component={Link} to="/admin" />
                        </Tabs>
                    </Paper>
                </header>
                <Switch>
                    <Route exact path="/" component={Routes} />
                    {/*<Route path="/main" component={Routes} />*/}
                    <Route path="/student" render={() => (
                        this.state.loggedIn &&  role==='s' ? (
                            <StudentPage  />
                        ) : (
                            <Redirect to="/"/>
                        )
                    )}/>
                    <Route path="/teacher" render={() => (
                        this.state.loggedIn &&  role==='t' ? (
                            <TeacherPage  />
                        ) : (
                            <Redirect to="/"/>
                        )
                    )} />
                    <Route path="/admin" render={() => (
                        this.state.loggedIn &&  role==='a' ? (
                            <AdminPage  />
                        ) : (
                            <Redirect to="/"/>
                        )
                    )} />
                </Switch>
                <footer>
                    <h1>footer</h1>
                </footer>
            </div>
        );
    }
}

export default withStyles(styles)(App);
