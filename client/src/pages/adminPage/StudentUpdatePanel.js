import React, { Component } from 'react';
import ObjectTable from 'react-object-table'
// import './AddUser.css';
import axios from "axios";

class StudentUpdatePanel extends Component {
    constructor(props) {
        super(props);

        this.state = {
            ...this.state,
            objects: [],
            SubjectList: [],
            objectsMarks: [],

            response: "",
            responseSubject: "",
            responseMarks: "",

            lastStudentId: "",
            lastSubjectId: "",

            responseMarks2: "",
            objectsMarks2: [],
            lastMarksId: "",
        };
    }

    async componentWillMount(){
        this.getStudents();
    }

    getStudents = async () => {
        try {
            const students = await axios("/api/students/");
            this.setState({ objects: students.data.st });
        } catch (err) {
            console.log(err.message);
            this.setState({ response: err.message });
        }
    };

    // getOneStudent = async index  => {
    //     try {
    //         const students = await axios(`/api/students/${index}`);
    //         // this.setState({ objectsOne: students.data.student });
    //
    //         console.log(this.state.objectsOne);
    //         students.data.student.subjects.map(sst => {
    //             this.setState(state => {
    //                 const objectsOne = state.objectsOne.concat(sst.subjectName);
    //                 return {
    //                     objectsOne
    //                 };
    //             });
    //         });
    //         this.setState({ SubjectList : this.state.objectsOne });
    //
    //         console.log(this.state.SubjectList);
    //
    //     } catch (err) {
    //         console.log(err.message);
    //         this.setState({ response: err.message });
    //     }
    // };

    updateStudents = async( index, values ) => {
        try {
            const students = await axios.put(`/api/students/${index}`, {
                ...values
            });
            this.setState({response: students.data.message });
        } catch (err) {
            console.log(err.message);
            this.setState({ response: err.message });
        }
    };

    removeStudents = async id => {
        try {
            const students = await axios.delete(`/api/students/${id}`);
            this.setState({response: students.data.message });
        } catch (err) {
            console.log(err.message);
            this.setState({ response: err.message });
        }
    };

    addStudent = async () => {
        await axios.post('/api/students',{
            name: "new",
            surname: "new",
            login: "new",
            password: "new",
            groupN: "new",
            subjects: []
        }).catch((err)=>console.log(err))
    };

    //

    addStudentSubject = async( index, values ) => {
        try {
            const students = await axios.put(`/api/students/subj/${index}`, {
                ...values
            });
            this.setState({responseSubject: students.data.message });
        } catch (err) {
            console.log(err.message);
            this.setState({ responseSubject: err.message });
        }
    };

    removeSubject = async (id_Subject, id_Student) => {
        try {
            const students = await axios.delete(`/api/students/subj/${id_Student}/${id_Subject}`);
            this.setState({responseSubject: students.data.message });
        } catch (err) {
            console.log(err.message);
            this.setState({ responseSubject: err.message });
        }
    };

    updateSubject = async( id_Subject, id_Student, values ) => {console.log(id_Subject, id_Student, values);
        try {
            const students = await axios.put(`/api/students/subj/${id_Student}/${id_Subject}`, {
                ...values
            });
            this.setState({responseSubject: students.data.message });
        } catch (err) {
            console.log(err.message);
            this.setState({ responseSubject: err.message });
        }
    };

    //

    handleUpdate(id, values) {
        this.updateStudents(id, values);
        this.getStudents();
    }

    handleDelete(id){
        this.removeStudents(id);
        this.getStudents();
    }
    handleAdd(){
        this.addStudent();
        this.getStudents();
    }
    handleAddNewSubject(id){
        this.addStudentSubject(id,{
            subjectName:"New_Subject",
            marks: []
        });
        this.getStudents();
        this.setState({ lastStudentId : id });
        this.handleShowSubjects(id);
    }
    handleShowSubjects(index){
        // this.getOneStudent(index);

        this.setState({ SubjectList : [] });

        this.state.objects.map(object => {
            // console.log(sst.id);
            // console.log(sst.subjects);
            if(object.id === index){
                // console.log(object.subjects);
                object.subjects.map(subject => {
                    // console.log(subject._id);
                    // console.log(subject.subjectName);

                        this.setState(state => {
                        const SubjectList = state.SubjectList.concat(({id: subject._id,subjectName: subject.subjectName}));
                        return {
                            SubjectList
                        };
                    });

                });
            }
        });
        // this.setState({ SubjectList : this.state.objectsOne });

        // console.log(this.state.SubjectList);
        this.setState({ lastStudentId : index });
        // setTimeout(this.forceUpdate(), 500);
    }

    //

    handleUpdateSubjectName(id, values) {
        this.updateSubject(id, this.state.lastStudentId, values);
        this.getStudents();
        this.handleShowSubjects(this.state.lastStudentId);
    }
    handleDeleteSubject(id){
        this.removeSubject(id, this.state.lastStudentId);
        this.getStudents();
        this.handleShowSubjects(this.state.lastStudentId);
    }
    handleAddSubject(id, values) {
        this.addStudentSubject(this.state.lastStudentId,{
            subjectName:"New_Subject",
            marks: []
        });
        this.getStudents();
        this.handleShowSubjects(this.state.lastStudentId);
    }



    //

    handleAddNewSubjectsMark(id){
        this.state.objects.map(object => {
            if(object.id === this.state.lastStudentId){
                object.subjects.map(subject => {
                    if(subject._id === id){
                        // console.log(id, subject.subjectName, object.groupN);
                        this.addMarks(this.state.lastStudentId, object.groupN, subject.subjectName, "");
                    }
                });
            }
        });
        this.setState({ lastSubjectId : id });
    }
    handleShowSubjectsMark(id){
        this.state.objects.map(object => {
            if(object.id === this.state.lastStudentId){
                object.subjects.map(subject => {
                    if(subject._id === id){
                        this.getOneMarks(this.state.lastStudentId, subject.subjectName);
                    }
                });
            }
        });
        this.setState({ lastSubjectId : id });
    }

    //

    getOneMarks = async (id, subjectName) => {
        try {
            const marks = await axios(`/api/marks/${id}/${subjectName}`);
            this.setState({ objectsMarks2: marks.data.specificMarks });
        } catch (err) {
            this.setState({ responseMarks: err.message });
        }
    };

    // getMarks = async () => {
    //     try {
    //         const marks = await axios("/api/marks/");
    //         this.setState({ objectsMarks2: marks.data.allMarks });
    //     } catch (err) {
    //         this.setState({ responseMarks: err.message });
    //     }
    // };

    updateMarks = async( index, values ) => {
        try {
            const marks = await axios.put(`/api/marks/${index}`, {
                ...values
            });
            this.setState({responseTMarks: marks.data.message });
        } catch (err) {
            this.setState({ responseMarks: err.message });
        }
    };

    removeMarks = async id => {
        try {
            const marks = await axios.delete(`/api/marks/${id}`);
            this.setState({responseMarks: marks.data.message });
        } catch (err) {
            console.log(err.message);
            this.setState({ responseMarks: err.message });
        }
    };

    addMarks = async (id, group, subjectName, text) => {
        await axios.post('/api/marks',{
            studentId: id,
            groupN: group,
            subjectName:  subjectName,
            text:text,
            marks: []
        }).catch((err)=>console.log(err))
    };

    addArrMarks = async( index, values ) => {
        try {
            const marks = await axios.put(`/api/marks/mark/${index}`, {
                ...values
            });
            this.setState({responseMarks2: marks.data.message });
        } catch (err) {
            console.log(err.message);
            this.setState({ responseMarks2: err.message });
        }
    };

    removeArrMarks = async (id_Mark, id_SubjectMark) => {
        try {
            const marks = await axios.delete(`/api/marks/mark/${id_SubjectMark}/${id_Mark}`);
            this.setState({responseMarks2: marks.data.message });
        } catch (err) {
            console.log(err.message);
            this.setState({ responseMarks2: err.message });
        }
    };

    updateArrMarks = async( id_Subject, id_Teacher, values ) => {
        try {
            const marks = await axios.put(`/api/marks/mark/${id_Teacher}/${id_Subject}`, {
                ...values
            });
            this.setState({responseMarks2: marks.data.message });
        } catch (err) {
            console.log(err.message);
            this.setState({ responseMarks2: err.message });
        }
    };

    handleUpdateMarks1(id, values) {
        this.updateMarks(id, values);
        // this.getMarks();
        this.handleShowSubjectsMark(this.state.lastSubjectId);
    }
    handleDeleteMarks1(id){
        this.removeMarks(id);
        // this.getMarks();
        this.handleShowSubjectsMark(this.state.lastSubjectId);
    }
    handleAddMarks1(id){
        this.state.objects.map(object => {
            if(object.id === this.state.lastStudentId){
                object.subjects.map(subject => {
                    if(subject._id === this.state.lastSubjectId){
                        this.addMarks(this.state.lastStudentId, object.groupN, subject.subjectName, "");
                        this.getOneMarks(this.state.lastStudentId, subject.subjectName);
                    }
                });
            }
        });
        // this.getMarks();
        this.setState({ lastMarkId : id });
    }


    handleAddNewMarks(id){
        this.addArrMarks(id,{
            // text: "new",
            markN: 0,
            present: true
        });
        this.handleShowSubjectsMark(this.state.lastSubjectId);
        this.setState({ lastMarksId : id });
        this.handleShowMarks(id);

    }
    handleShowMarks(index){
        this.setState({ objectsMarks : [] });

        this.state.objectsMarks2.map(object => {
            if(object.id === index){
                object.marks.map(subject => {

                    this.setState(state => {
                        const objectsMarks = state.objectsMarks.concat((
                            {
                                id: subject._id,
                                // text: subject.text,
                                markN: subject.markN.toString(),
                                present: subject.present.toString(),
                                createdt: subject.createdt.toString()
                            }
                        ));
                        return {
                            objectsMarks: objectsMarks
                        };
                    });
                });
            }
        });

        this.setState({ lastMarksId : index });
    }

    //

    handleUpdateMarks(id, values) {
        this.updateArrMarks(id, this.state.lastMarksId, values);
        // this.getMarks();
        this.handleShowSubjectsMark(this.state.lastSubjectId);
        this.handleShowMarks(this.state.lastMarksId);
    }
    handleDeleteMarks(id){
        this.removeArrMarks(id, this.state.lastMarksId);
        // this.getMarks();
        this.handleShowSubjectsMark(this.state.lastSubjectId);
        this.handleShowMarks(this.state.lastMarksId);
    }
    handleAddMarks(id, values) {
        this.addArrMarks(this.state.lastMarksId,{
            // text: "new",
            markN: 0,
            present: true
        });
        // this.getMarks();
        // this.setState({ lastMarksId : id });
        this.handleShowSubjectsMark(this.state.lastSubjectId);
        this.handleShowMarks(this.state.lastMarksId);
    }

    //

    // Rerender = () => {
    //     this.forceUpdate()
    // }

    // handleDuplicate(id) {
    //     this.setState(prevState => {
    //         const stateChanges = {
    //             objects: prevState.objects,
    //         }
    //         var newId = 0;
    //         var original;
    //         prevState.objects.map((object) => {
    //             if (object.id === id) {
    //                 original = object;
    //             }
    //             if (object.id > newId) {
    //                 newId = object.id;
    //             }
    //         });
    //         newId++;
    //         if (original) {
    //             stateChanges.objects.push({
    //                 ...original,
    //                 id: newId,
    //             });
    //         }
    //         return stateChanges;
    //     });
    // }

    render() {
        return (
            <div >
                <div>
                    <p>Student</p>
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
                    <p>{this.state.response}</p>
                </div>
                {/*<SubjectNamePanel />*/}
                <div>
                    <p>Subjects</p>
                    <ObjectTable
                        columns={this.props.columnsSubject}
                        objects={this.state.SubjectList}
                        onUpdate={this.handleUpdateSubjectName.bind(this)}
                        actions={[
                            {label: 'delete', func: this.handleDeleteSubject.bind(this)},
                            {label: 'add new', func: this.handleAddSubject.bind(this)},
                            {label: 'add new marks', func: this.handleAddNewSubjectsMark.bind(this)},
                            {label: 'show marks', func: this.handleShowSubjectsMark.bind(this)}
                        ]}
                    />
                    {/*<input type="button" value="Click" onClick={this.Rerender}/>*/}
                    <p>{this.state.responseSubject}</p>
                </div>


                <div>
                    <p>Subjects Mark</p>
                    <ObjectTable
                        columns={this.props.columnsSubjectMarks}
                        objects={this.state.objectsMarks2}
                        onUpdate={this.handleUpdateMarks1.bind(this)}
                        actions={[
                            {label: 'delete', func: this.handleDeleteMarks1.bind(this)},
                            {label: 'add new', func: this.handleAddMarks1.bind(this)},
                            {label: 'add new mark', func: this.handleAddNewMarks.bind(this)},
                            {label: 'show mark', func: this.handleShowMarks.bind(this)}
                        ]}
                    />
                    <p>{this.state.responseMarks}</p>
                </div>
                <div>
                    <p>Marks</p>
                    <ObjectTable
                        columns={this.props.columnsMarks}
                        objects={this.state.objectsMarks}
                        onUpdate={this.handleUpdateMarks.bind(this)}
                        actions={[
                            {label: 'delete', func: this.handleDeleteMarks.bind(this)},
                            {label: 'add new', func: this.handleAddMarks.bind(this)}
                        ]}
                    />
                    <p>{this.state.responseMarks2}</p>
                </div>
            </div>
        );
    }
}

StudentUpdatePanel.defaultProps = {
    columns: [
        {
            name: "Ім'я",
            key: 'name',
        },
        {
            name: 'Прізвище',
            key: 'surname',
        },
        {
            name: 'Логін',
            key: 'login',
        },
        {
            name: 'Пароль',
            key: 'password',
        },
        {
            name: 'Група',
            key: 'groupN',
        },
    ],
    columnsSubject: [
        {
            name: 'Предмети',
            key: 'subjectName',
        }
    ],
    columnsSubjectMarks: [
        {
            name: "studentId",
            key: 'studentId',
            editor: false,
        },
        {
            name: 'groupN',
            key: 'groupN',
            editor: false,
        },
        {
            name: 'subjectName',
            key: 'subjectName',
            editor: false,
        },
        {
            name: 'type',
            key: 'text',
        }
    ],
    columnsMarks: [
        {
            name: 'markN',
            key: 'markN',
        },
        {
            name: 'present',
            key: 'present',
        },
        {
            name: 'createdt',
            key: 'createdt',
        }
    ],
};

export default StudentUpdatePanel;
