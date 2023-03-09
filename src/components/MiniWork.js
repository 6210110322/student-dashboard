import React from "react";
import { distanceFromNow } from "../utility";

const MiniWork = ({ works }) => {
  return (
    <div>
          <table class="table table-borderless">
            <tbody>
            {works?.map((item) => (
              <tr key={item.id}>
                <td width="40%">{distanceFromNow(item.dueDate)}</td>
                <td width="60%">{item.detail}</td>
              </tr>
              ))}
            </tbody>
          </table>
    </div>
  );
};

export default MiniWork;