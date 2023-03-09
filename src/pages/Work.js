import React, { useState, useEffect } from 'react'
import { db } from '../firebase'
import { onSnapshot, query, where, orderBy, getDocs, getDoc } from "firebase/firestore";
import { useNavigate, useParams } from 'react-router-dom'
import {
  addDoc,
  collection,
  doc,
  updateDoc,
} from 'firebase/firestore';
import { toast } from 'react-toastify';

const initialState = {
  dueDate: "",
  subject: "",
  type: "",
  detail: "",
};

const typeOption = [
  "Homework",
  "Quiz",
  "Midterm",
  "Final",
];

const Work = ({ user, setActive }) => {
  const userId = user?.uid;
  const [form, setForm] = useState(initialState);
  const [subjectOption, setSubjectOption] = useState([]);
  const [sortSubjectOption, setSortSubjectOption] = useState([]);

  const { id } = useParams();

  const navigate = useNavigate();

  const { dueDate, subject, type, detail } = form;
  
  const getSortSubjectOption = async () => {
    const classesRef = collection(db, "classes")
    const sortQuery = query(classesRef, where("userId", "==", userId), orderBy("subjectCode"));
    const querySnapshot = await getDocs(sortQuery);
    let sortSubjectOption = [];
    querySnapshot.forEach((doc) => {
      sortSubjectOption.push({ value: doc.data().subjectCode,
        label: doc.data().subjectCode + ' ' + doc.data().subjectName });
    })
    setSortSubjectOption(sortSubjectOption);
  }

  useEffect(() => {
    getSortSubjectOption();
      const unsub = onSnapshot(
        collection(db, "classes"),
        (snapshot) => {
          let list = [];
          snapshot.docs.forEach((doc) => {
            list.push({ value: doc.data().subjectCode,
              label: doc.data().subjectCode + ' ' + doc.data().subjectName });
          });
          setSubjectOption(list);
        },
        (error) => {
          console.log(error);
        }
      );
  
      return () => {
        unsub();
        getSortSubjectOption();
      };
  }, []);

  useEffect(() => {
    id && getWorkDetail();
  }, [id]);

  const getWorkDetail = async () => {
    const docRef = doc(db, "works", id);
    const snapshot = await getDoc(docRef);
    if (snapshot.exists()) {
      setForm({ ...snapshot.data() });
    }
    setActive(null);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const onSubjectChange = (e) => {
    setForm({ ...form, subject: e.target.value });
  };

  const onTypeChange = (e) => {
    setForm({ ...form, type: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (dueDate && type && detail ) {
      if (!id) {
        try {
          await addDoc(collection(db, "works"), {
            ...form,
            status: "To-Do",
            userId: user.uid,
          });
          toast.success("Work created successfully!");
        } catch (err) {
          console.log(err);
        }
      } else {
        try {
          await updateDoc(doc(db, "works", id), {
            ...form,
            status: "To-Do",
            userId: user.uid,
          });
          toast.success("Work updated successfully!");
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      return toast.error("All fields are mandatory to fill!");
    }

    navigate("/allwork");
  };

  return (
    <div className="container-fluid mb-4">
      <div className="container">
        <div className="col-12">
          <div className="text-center heading py-2">
            {id ? "Update Work" : "Create Work"}
          </div>
        </div>
        <div className="row h-100 justify-content-center align-items-center">
          <div className="col-10 col-md-8 col-lg-6">
            <form className="row blog-form" onSubmit={handleSubmit}>
              <div className="col-12 py-3">
                <label for="dueDate">Due Date</label>
                <input
                  type="date"
                  className="form-control input-text-box"
                  placeholder="Due Date"
                  name="dueDate"
                  value={dueDate}
                  onChange={handleChange}
                />
              </div>
              <div className="col-4 py-3">
                <label for="subject">Subject</label>
                <select
                  value={subject}
                  onChange={onSubjectChange}
                  className="catg-dropdown"
                >
                  <option>-</option>
                  {sortSubjectOption.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-8 py-3">
                <label for="type">Type</label>
                <select
                  value={type}
                  onChange={onTypeChange}
                  className="catg-dropdown"
                >
                  <option>Please select type</option>
                  {typeOption.map((option, index) => (
                    <option value={option || ""} key={index}>
                      {option}
                    </option>
                  ))}
                </select>
              </div>
              <div className="col-12 py-3">
                <label for="dueDate">Detail</label>
                <textarea
                  className="form-control description-box"
                  // placeholder="Detail"
                  value={detail}
                  name="detail"
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

export default Work