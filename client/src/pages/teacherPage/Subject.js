import React from 'react';

 const Subject = ({subject, click}) => {
    return (<p className="list-group-item" onClick={() => {click({id: subject.id, subjectName: subject.subjectName, groups: subject.groups})}}>{subject.subjectName} - {subject.groups}</p>);
};

export default Subject;
