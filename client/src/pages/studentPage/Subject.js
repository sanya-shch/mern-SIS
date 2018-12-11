import React from 'react';

import '../../../node_modules/bootstrap/dist/css/bootstrap.css';

 const Subject = ({subject, click}) => {
    return (<p className="list-group-item" onClick={() => {click(subject.id)}}>{subject.subjectName}</p>);
};


export default Subject;
