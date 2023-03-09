import React from "react";
import { subjectFormat } from "../utility";

const FridayClass = ({ classes, user }) => {
  const userId = user?.uid;
  return (
    <div>
      <div style={{ fontSize: '24px', color: "white", backgroundColor: '#22AAEB'}}>FRI</div> 
      <div style={{ borderStyle: 'solid', borderColor: '#22AAEB'}}>
        <table class="table table-borderless">
          <tbody>
            {classes?.map((item) => (
            <tr key={item.id}>
              <td width="40%">{item.startTime}</td>
              <td width="60%" align="left" title={item.room}>{subjectFormat(item.link, item.subjectCode)}</td>
            </tr>
            ))}
          </tbody>
        </table>
      </div> 
    </div>
  );
};

export default FridayClass;