import React, { Component } from 'react';
import ObjectTable from 'react-object-table'
import axios from "axios";

class TeacherUpdatePanel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ...this.state,
            objects: [],
            responseTeachers: "",
            responseSubjects: "",
            SubjectList: [],
            lastTeacherId: ""
        };
    }

    async componentWillMount(){
        this.getTeachers();
    }

    getTeachers = async () => {
        try {
            const teachers = await axios("/api/teachers/");
            this.setState({ objects: teachers.data.allTeachers });
        } catch (err) {
            this.setState({ responseTeachers: err.message });
        }
    };

    updateTeachers = async( index, values ) => {
        try {
            const teachers = await axios.put(`/api/teachers/${index}`, {
                ...values
            });
            this.setState({responseTeachers: teachers.data.message });
        } catch (err) {
            this.setState({ responseTeachers: err.message });
        }
    }

    removeTeachers = async id => {
        try {
            const teachers = await axios.delete(`/api/teachers/${id}`);
            this.setState({responseTeachers: teachers.data.message });
        } catch (err) {
            console.log(err.message);
            this.setState({ responseTeachers: err.message });
        }
    }

    addTeachers = async () => {
        await axios.post('/api/teachers',{
            name: "new",
            surname: "new",
            // login: "new",
            // password: "new",
            subjects: []
        }).catch((err)=>console.log(err))
    }

    addTeacherSubject = async( index, values ) => {
        try {
            const teachers = await axios.put(`/api/teachers/subj/${index}`, {
                ...values
            });
            this.setState({responseSubjects: teachers.data.message });
        } catch (err) {
            console.log(err.message);
            this.setState({ responseSubjects: err.message });
        }
    }

    removeSubject = async (id_Subject, id_Teacher) => {
        try {
            const teachers = await axios.delete(`/api/teachers/subj/${id_Teacher}/${id_Subject}`);
            this.setState({responseSubjects: teachers.data.message });
        } catch (err) {
            console.log(err.message);
            this.setState({ responseSubjects: err.message });
        }
    }

    updateSubject = async( id_Subject, id_Teacher, values ) => {
        try {
            const teachers = await axios.put(`/api/teachers/subj/${id_Teacher}/${id_Subject}`, {
                ...values
            });
            this.setState({responseSubjects: teachers.data.message });
        } catch (err) {
            console.log(err.message);
            this.setState({ responseSubjects: err.message });
        }
    }

    handleUpdate(id, values) {
        this.updateTeachers(id, values);
        this.getTeachers();
    }

    handleDelete(id){
        this.removeTeachers(id);
        this.getTeachers();
    }
    handleAdd(){
        this.addTeachers();
        this.getTeachers();
    }

    handleAddNewSubject(id){
        this.addTeacherSubject(id,{
            subjectName:"New_Subject",
            groups: "New_Group"
        });
        this.getTeachers();
        this.setState({ lastTeacherId : id });
        this.handleShowSubjects(id);

    }
    handleShowSubjects(index){
        this.setState({ SubjectList : [] });

        this.state.objects.map(object => {
            if(object.id === index){
                object.subjects.map(subject => {

                    this.setState(state => {
                        const SubjectList = state.SubjectList.concat((
                                {
                                    id: subject._id,
                                    subjectName: subject.subjectName,
                                    groups:subject.groups
                                }
                            ));
                        return {
                            SubjectList: SubjectList
                        };
                    });
                });
            }
        });

        this.setState({ lastTeacherId : index });
    }

    //

    handleUpdateSubject(id, values) {
        this.updateSubject(id, this.state.lastTeacherId, values);
        this.getTeachers();
        this.handleShowSubjects(this.state.lastTeacherId);
    }
    handleDeleteSubject(id){
        this.removeSubject(id, this.state.lastTeacherId);
        this.getTeachers();
        this.handleShowSubjects(this.state.lastTeacherId);
    }
    handleAddSubject(id, values) {
        this.addTeacherSubject(this.state.lastTeacherId,{
            subjectName:"New_Subject",
            groups: "New_Group"
        });
        this.getTeachers();
        this.handleShowSubjects(this.state.lastTeacherId);
    }

    render() {
        return (
            <div >
                <div>
                    <p>Teachers</p>
                    <ObjectTable
                        columns={this.props.columns}
                        objects={this.state.objects}
                        onUpdate={this.handleUpdate.bind(this)}
                        actions={[
                            {label: 'delete', func: this.handleDelete.bind(this)},
                            {label: 'add new', func: this.handleAdd.bind(this)},
                            {label: 'add new subjects', func: this.handleAddNewSubject.bind(this)},
                            {label: 'show subjects', func: this.handleShowSubjects.bind(this)}
                        ]}
                    />
                    <p>{this.state.responseTeachers}</p>
                </div>
                <div>
                    <p>Subjects</p>
                    <ObjectTable
                        columns={this.props.columnsSubject}
                        objects={this.state.SubjectList}
                        onUpdate={this.handleUpdateSubject.bind(this)}
                        actions={[
                            {label: 'delete', func: this.handleDeleteSubject.bind(this)},
                            {label: 'add new', func: this.handleAddSubject.bind(this)}
                        ]}
                    />
                    <p>{this.state.responseSubjects}</p>
                </div>
            </div>
        );
    }
}


TeacherUpdatePanel.defaultProps = {
    columns: [
        {
            name: "Ім'я",
            key: 'name',
        },
        {
            name: 'Прізвище',
            key: 'surname',
        }
        // ,
        // {
        //     name: 'Логін',
        //     key: 'login',
        // },
        // {
        //     name: 'Пароль',
        //     key: 'password',
        // }
    ],
    columnsSubject: [
        {
            name: 'Предмет',
            key: 'subjectName',
        },
        {
            name: 'Група',
            key: 'groups',
        }
    ],
};

export default TeacherUpdatePanel;
