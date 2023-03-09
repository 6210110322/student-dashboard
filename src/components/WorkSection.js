import React from "react";
import { Link } from "react-router-dom";
import { dateFormat } from "../utility";
import { TiEdit } from 'react-icons/ti';
import { RiCloseCircleLine } from 'react-icons/ri';

const WorkSection = ({ works, user, handleDelete }) => {
  const userId = user?.uid;
  return (
    <div>
      <div className="blog-heading text-start py-2 mb-4">Work List</div> 
          <table class="table table-striped">
            <thead>
              <tr>
                <th scope="col" width="20%">Due Date</th>
                <th scope="col" width="20%">Subject</th>
                <th scope="col" width="15%">Type</th>
                <th scope="col" width="30%">Detail</th>
                <th scope="col" width="15%"></th>
              </tr>
            </thead>
            <tbody>
            {works?.map((item) => (
              <tr key={item.id}>
                <td>{dateFormat(item.dueDate)}</td>
                <td>{item.subject}</td>
                <td>{item.type}</td>
                <td>{item.detail}</td>
                <td><Link to={`/editwork/${item.id}`}><TiEdit /></Link>&nbsp;<Link onClick={() => handleDelete(item.id)}><RiCloseCircleLine /></Link></td>
              </tr>
              ))}
            </tbody>
          </table>
    </div>
  );
};

export default WorkSection;