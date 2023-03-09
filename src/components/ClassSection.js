import React from "react";
import { Link } from "react-router-dom";
import { linkFormat, dayFormat } from "../utility";
import { TiEdit } from 'react-icons/ti';
import { RiCloseCircleLine } from 'react-icons/ri';

const ClassSection = ({ classes, user, handleDelete }) => {
  const userId = user?.uid;
  return (
    <div>
      <div className="blog-heading text-start py-2 mb-4">Class List</div> 
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col" width="15%">Subject Code</th>
                <th scope="col" width="20%">Subject Name</th>
                <th scope="col" width="10%">Room</th>
                <th scope="col" width="10%">Link</th>
                <th scope="col" width="10%">Day</th>
                <th scope="col" width="10%">Start Time</th>
                <th scope="col" width="10%">End Time</th>
                <th scope="col" width="15%"></th>
              </tr>
            </thead>
            <tbody>
            {classes?.map((item) => (
              <tr key={item.id}>
                <td>{item.subjectCode}</td>
                <td>{item.subjectName}</td>
                <td>{item.room}</td>
                <td>{linkFormat(item.link)}</td>
                <td>{dayFormat(item.day)}</td>
                <td>{item.startTime}</td>
                <td>{item.endTime}</td>
                <td><Link to={`/editclass/${item.id}`}><TiEdit /></Link>&nbsp;<Link onClick={() => handleDelete(item.id)}><RiCloseCircleLine /></Link></td>
                {/* {user?.uid && item.userId === user.uid && (<td><Link to={`/edit/${item.id}`}><TiEdit /></Link>&nbsp;<Link onClick={() => handleDelete(item.id)}><RiCloseCircleLine /></Link></td>)} */}
              </tr>
              ))}
            </tbody>
          </table>
    </div>
  );
};

export default ClassSection;