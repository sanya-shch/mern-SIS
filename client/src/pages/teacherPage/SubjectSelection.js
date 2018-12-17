import React, {Component} from 'react'
import axios from "axios";

import SubjectList from './SubjectList'

import './TeacherPage.css'

class SubjectSelection extends Component {

    constructor(props){
        super(props);
        this.state = {
            data: []
        }
    }

    componentDidMount(){
        this.getOneTeacher();
    }

    getOneTeacher = async ()  => {
        try {
            const teachers = await axios(`/api/teachers/${this.props.teacherId}`);
            teachers.data.user.subjects.map(subject => {
                this.setState(state => {
                    const data = state.data.concat(({id: subject._id, subjectName: subject.subjectName, groups: subject.groups}));
                    return {
                        data
                    };
                });
            });
        } catch (err) {
            console.log(err);
        }
    };

    handleClick = (value) => {this.props.updateData(value)};

    render() {
        return (
            <div>
                {/*<Title text={"Виберіть предмет"}/>*/}
                <h2 className="ta">Виберіть предмет та групу</h2>
                <SubjectList
                    subjects={this.state.data}
                    click={this.handleClick.bind(this)}
                />
            </div>
        )
    }
}

export default SubjectSelection;
