import React, {Component} from 'react';

import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import { Link } from 'react-router-dom'

class NavTabs extends Component {
    state = {
        value: 0,
    };

    handleChange = (event, value) => {
        this.setState({ value });
    };

    render() {
        const { value } = this.state;
        return (
            <Paper>
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
        );
    }
}

export default NavTabs;
