import React, {Component} from 'react'

import UserPanel from './UserPanel'

import StudentAddPanel from './StudentAddPanel'
import StudentUpdatePanel from './StudentUpdatePanel'

import TeacherAddPanel from './TeacherAddPanel'
import TeacherUpdatePanel from './TeacherUpdatePanel'

import './AdminPage.css'

class AdminPage extends Component {
    render() {
        return (
            <div className="boby_block">
                <div>
                    <h1>Users</h1>
                    <UserPanel />
                </div>

                <hr />
                <hr />
                <hr />

                <div>
                    <h1>Add student</h1>
                    <StudentAddPanel />
                    <hr />
                    <StudentUpdatePanel />
                </div>

                <hr />
                <hr />
                <hr />

                <div>
                    <h1>Add teachers</h1>
                    <TeacherAddPanel />
                    <hr />
                    <TeacherUpdatePanel />
                </div>
            </div>
        )
    }
}

export default AdminPage;