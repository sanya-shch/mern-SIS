import React from 'react';

import Subject from './Subject';

const SubjectList = ({subjects, click}) => {
    const todoNode = subjects.map((subject) => {
        return (<Subject subject={subject} key={subject.id} click={click}/>)
    });
    return (<div className="list-group" style={{marginTop:'20px'}}>{todoNode}</div>);
};

export default SubjectList;
