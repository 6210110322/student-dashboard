import React, { useState, useEffect } from 'react'
import { db } from '../firebase'
import { getDoc } from "firebase/firestore";
import { useNavigate, useParams } from 'react-router-dom'
import {
  addDoc,
  collection,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { dayFormat } from "../utility";
import { toast } from 'react-toastify';

const initialState = {
  subjectCode: "",
  subjectName: "",
  room: "",
  link: "",
  day: "",
  startTime: "",
  endTime: "",
};

const dayOption = [
  "1Monday",
  "2Tuesday",
  "3Wednesday",
  "4Thursday",
  "5Friday",
];

const Class = ({ user, setActive }) => {
  const [form, setForm] = useState(initialState);

  const { id } = useParams();

  const navigate = useNavigate();

  const { subjectCode, subjectName, room, link, day, startTime, endTime } = form;

  useEffect(() => {
    id && getClassDetail();
  }, [id]);

  const getClassDetail = async () => {
    const docRef = doc(db, "classes", id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      setForm({ ...snapshot.data() });
    }
    setActive(null);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onDayChange = (e) => {
    setForm({ ...form, day: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (subjectCode && subjectName && day && startTime && endTime) {
      if (!id) {
        try {
          await addDoc(collection(db, "classes"), {
            ...form,
            userId: user.uid,
          });
          toast.success("Class created successfully!");
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          await updateDoc(doc(db, "classes", id), {
            ...form,
            userId: user.uid,
          });
          toast.success("Class updated successfully!");
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      return toast.error("All fields are mandatory to fill!");
    }

    navigate("/allclass");
  };

  return (
    <div className="container-fluid mb-4">
      <div className="container">
        <div className="col-12">
          <div className="text-center heading py-2">
            {id ? "Update Class" : "Create Class"}
          </div>
        </div>
        <div className="row h-100 justify-content-center align-items-center">
          <div className="col-10 col-md-8 col-lg-6">
            <form className="row blog-form" onSubmit={handleSubmit}>
              <div className="col-4 py-3">
                <label for="endTime">Subject Code</label>
                <input
                  type="text"
                  className="form-control input-text-box"
                  // placeholder="Subject Code"
                  name="subjectCode"
                  value={subjectCode}
                  onChange={handleChange}
                />
              </div>
              <div className="col-8 py-3">
                <label for="endTime">Subject Name</label>
                <input
                  type="text"
                  className="form-control input-text-box"
                  // placeholder="Subject Name"
                  name="subjectName"
                  value={subjectName}
                  onChange={handleChange}
                />
              </div>
              <div className="col-6 py-3">
                <label for="endTime">Room</label>
                <input
                  type="text"
                  className="form-control input-text-box"
                  // placeholder="Room"
                  name="room"
                  value={room}
                  onChange={handleChange}
                />
              </div>
              <div className="col-6 py-3">
                <label for="endTime">Link</label>
                <input
                  type="text"
                  className="form-control input-text-box"
                  // placeholder="Link"
                  name="link"
                  value={link}
                  onChange={handleChange}
                />
              </div>
              <div className="col-12 py-3">
                <label for="day">Day</label>
                <select
                  value={day}
                  onChange={onDayChange}
                  className="catg-dropdown"
                >
                  <option>Please select day</option>
                  {dayOption.map((option, index) => (
                    <option value={option || ""} key={index}>
                      {dayFormat(option)}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-6 py-3">
                <label for="startTime">Start Time</label>
                <input
                  type="time"
                  className="form-control input-text-box"
                  placeholder="Start Time"
                  name="startTime"
                  value={startTime}
                  onChange={handleChange}
                />
              </div>
              <div className="col-6 py-3">
                <label for="endTime">End Time</label>
                <input
                  type="time"
                  className="form-control input-text-box"
                  placeholder="End Time"
                  name="endTime"
                  value={endTime}
                  onChange={handleChange}
                />
              </div>
              <div className="col-12 py-3 text-center">
                <button
                  className="btn btn-add"
                  type="submit"
                >
                  {id ? "Update" : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Class