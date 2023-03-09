import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, onSnapshot, query, orderBy, getDocs, where, limit } from "firebase/firestore";
import { db } from "../firebase";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import "react-big-calendar/lib/css/react-big-calendar.css";
import format from "date-fns/format";
import getDay from "date-fns/getDay";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import { statusWorksleft, worksleft } from "../utility";
import MiniWork from "./MiniWork";

const locales = {
  "en-US": require("date-fns/locale/en-US"),
};
const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const Calenda = ({ user }) => {
  const userId = user?.uid;
  const [works, setWorks] = useState([]);
  const [userWorks, setUserWorks] = useState([]);
  const [sortWorks, setSortWorks] = useState([]);
  const [amountHomeworks, setAmountHomeworks] = useState(null);

    const getUserWorks = async () => {
      const worksRef = collection(db, "works")
      const sortQuery = query(worksRef, where("userId", "==", userId), where("status", "==", "To-Do"),);
      const querySnapshot = await getDocs(sortQuery);
      let userWorks = [];
      querySnapshot.forEach((doc) => {
        userWorks.push({id: doc.id, ...doc.data()});
      })
      setUserWorks(userWorks);
    }

    const getSortWorks = async () => {
      const worksRef = collection(db, "works")
      const sortQuery = query(worksRef, where("userId", "==", userId), where("type", "==", "Homework"), where("status", "==", "To-Do"), orderBy("dueDate"), limit(3));
      const querySnapshot = await getDocs(sortQuery);
      let sortWorks = [];
      querySnapshot.forEach((doc) => {
        sortWorks.push({id: doc.id, ...doc.data()});
      })
      setSortWorks(sortWorks);
      setAmountHomeworks(sortWorks.length);
    }

  useEffect(() => {
    getUserWorks();
    getSortWorks();
    const unsub = onSnapshot(
      collection(db, "works"),
      (snapshot) => {
        let list = [];
        snapshot.docs.forEach((doc) => {
          list.push({ id: doc.id, ...doc.data() });
        });
        setWorks(list);
      },
      (error) => {
        console.log(error);
      }
    );

    return () => {
      unsub();
      getUserWorks();
      getSortWorks();
    };
  }, []);

  return (
    <div className="row row-cols-2">
      <div className="col-md-9">
        <Calendar localizer={localizer} events={userWorks} 
        titleAccessor="detail" startAccessor="dueDate" endAccessor="dueDate" allDayAccessor={() => { return true }} style={{ height: 500 }} />
      </div>
      <div className="col-md-3">
        <h2 style={{ marginTop: '50%', padding: 10, color: '#fff', backgroundColor: statusWorksleft(amountHomeworks) }}>{worksleft(amountHomeworks)}</h2>
        <div>
        <MiniWork
            works={sortWorks}
            user={user}
          />
          <button className="btn btn-primary" type="submit">
                <Link to={`/todo`} style={{ textDecoration: "none", color: "white"}}>More &gt;</Link>
        </button>
        </div>
      </div>
    </div>
  );
};

export default Calenda;