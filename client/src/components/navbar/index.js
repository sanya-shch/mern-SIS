import axios from 'axios'
import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Button from '@material-ui/core/Button';

import Modal from "react-responsive-modal";
import LoginForm from "../login/LoginForm";

// import ModalLogin from "../login";

const styles = {
    root: {
        flexGrow: 1,
    },
    grow: {
        flexGrow: 1,
    },
};

class NavBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            loggedIn: this.props.loggedIn,
            open: false
        };
        this.logout = this.logout.bind(this)
    }

    logout(event) {
        event.preventDefault();
        console.log('logging out');
        axios.post('/user/logout').then(response => {
            console.log(response.data);
            if (response.status === 200) {
                this.props.updateUser({
                    loggedIn: false,
                    username: null
                })
            }
        }).catch(error => {
            console.log('Logout error', error)
        })
    }

    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };

    updateData = (username, loggedIn) => {
        this.setState({ open: false , loggedIn:loggedIn});
        this.props.updateUser({
            loggedIn: this.state.loggedIn
        });console.log(444 ,username, loggedIn);
        // this.setState({loggedIn:loggedIn});
        console.log(555, this.state.loggedIn);
    };

    render() {
        // const loggedIn = this.state.loggedIn;
        const { classes } = this.props;
        const { open } = this.state;
        return (
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <Typography variant="h6" color="inherit" className={classes.grow}>
                            Кафедра Комп'ютерної інженерії
                        </Typography>
                        {this.state.loggedIn ? (
                            <div>
                                <IconButton
                                    aria-owns={'menu-appbar'}
                                    aria-haspopup="true"
                                    // onClick={this.handleMenu}
                                    color="inherit"
                                >
                                    <AccountCircle />
                                </IconButton>
                                <Menu
                                    id="menu-appbar"
                                    anchorOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    transformOrigin={{
                                        vertical: 'top',
                                        horizontal: 'right',
                                    }}
                                    onClose={this.handleClose}
                                >
                                    <MenuItem >Моя сторінка</MenuItem>
                                    <MenuItem onClick={this.logout}>Вихід</MenuItem>
                                </Menu>
                            </div>
                        ) : (
                            /*<ModalLogin updateDataUser={this.updateDataUser}/>*/
                            <div>
                                <Button color="inherit" onClick={this.onOpenModal}>Login</Button>
                                <Modal open={open} onClose={this.onCloseModal} center>
                                    <LoginForm updateData={this.updateData} />
                                </Modal>
                            </div>
                        )}
                    </Toolbar>
                </AppBar>
            </div>
        );
    }
}

export default withStyles(styles)(NavBar);
