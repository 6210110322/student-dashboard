import React, { useState, useEffect } from "react";
import { collection, onSnapshot, query, orderBy, getDocs, where } from "firebase/firestore";
import { db } from "../firebase";
import Calenda from "../components/Calenda";
import MondayClass from "../components/MondayClass";
import TuesdayClass from "../components/TuesdayClass";
import WednesdayClass from "../components/WednesdayClass";
import ThursdayClass from "../components/ThursdayClass";
import FridayClass from "../components/FridayClass";

const Dashboard = ({ user }) => {
  const userId = user?.uid;
  const [works, setWorks] = useState([]);
  const [classes, setClasses] = useState([]);
  const [mondayClasses, setMondayClasses] = useState([]);
  const [tuesdayClasses, setTuesdayClasses] = useState([]);
  const [wednesdayClasses, setWednesdayClasses] = useState([]);
  const [thursdayClasses, setThursdayClasses] = useState([]);
  const [fridayClasses, setFridayClasses] = useState([]);

  const getMondayClasses = async () => {
    const classesRef = collection(db, "classes")
    const dayQuery = query(classesRef, where("userId", "==", userId), where("day", "==", "1Monday"), orderBy("startTime"));
    const querySnapshot = await getDocs(dayQuery);
    let mondayClasses = [];
    querySnapshot.forEach((doc) => {
      mondayClasses.push({id: doc.id, ...doc.data()});
    })
    setMondayClasses(mondayClasses);
  }

  const getTuesdayClasses = async () => {
    const classesRef = collection(db, "classes")
    const dayQuery = query(classesRef, where("userId", "==", userId), where("day", "==", "2Tuesday"), orderBy("startTime"));
    const querySnapshot = await getDocs(dayQuery);
    let tuesdayClasses = [];
    querySnapshot.forEach((doc) => {
      tuesdayClasses.push({id: doc.id, ...doc.data()});
    })
    setTuesdayClasses(tuesdayClasses);
  }

  const getWednesdayClasses = async () => {
    const classesRef = collection(db, "classes")
    const dayQuery = query(classesRef, where("userId", "==", userId), where("day", "==", "3Wednesday"), orderBy("startTime"));
    const querySnapshot = await getDocs(dayQuery);
    let wednesdayClasses = [];
    querySnapshot.forEach((doc) => {
      wednesdayClasses.push({id: doc.id, ...doc.data()});
    })
    setWednesdayClasses(wednesdayClasses);
  }

  const getThursdayClasses = async () => {
    const classesRef = collection(db, "classes")
    const dayQuery = query(classesRef, where("userId", "==", userId), where("day", "==", "4Thursday"), orderBy("startTime"));
    const querySnapshot = await getDocs(dayQuery);
    let thursdayClasses = [];
    querySnapshot.forEach((doc) => {
      thursdayClasses.push({id: doc.id, ...doc.data()});
    })
    setThursdayClasses(thursdayClasses);
  }

  const getFridayClasses = async () => {
    const classesRef = collection(db, "classes")
    const dayQuery = query(classesRef, where("userId", "==", userId), where("day", "==", "5Friday"), orderBy("startTime"));
    const querySnapshot = await getDocs(dayQuery);
    let fridayClasses = [];
    querySnapshot.forEach((doc) => {
      fridayClasses.push({id: doc.id, ...doc.data()});
    })
    setFridayClasses(fridayClasses);
  }

  useEffect(() => {
    getMondayClasses();
    getTuesdayClasses();
    getWednesdayClasses();
    getThursdayClasses();
    getFridayClasses();
      const unsub = onSnapshot(
        collection(db, "classes"),
        (snapshot) => {
          let list = [];
          snapshot.docs.forEach((doc) => {
            list.push({ id: doc.id, ...doc.data() });
          });
          setClasses(list);
        },
        (error) => {
          console.log(error);
        }
      );
  
      return () => {
        unsub();
        getMondayClasses();
        getTuesdayClasses();
        getWednesdayClasses();
        getThursdayClasses();
        getFridayClasses();
      };
  }, []);
    
  useEffect(() => {
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
    };
  }, []);

  return (
    <div className="container-fluid pb-4 pt-4 padding">
      <div className="container padding">
        <div className="blog-heading text-start py-2 mb-4">Work & Class</div>
        <div className="row mx-0">
          <Calenda
            works={works}
            user={user}
          />
        </div>
        <div className="row pb-4 pt-4 padding">
        <div className="col-md-1">
        </div>
        <div className="col-md-2">
          <MondayClass
            classes={mondayClasses}
            user={user}
          />
        </div>
        <div className="col-md-2">
          <TuesdayClass
            classes={tuesdayClasses}
            user={user}
          />
        </div>
        <div className="col-md-2">
          <WednesdayClass
            classes={wednesdayClasses}
            user={user}
          />
        </div>
        <div className="col-md-2">
          <ThursdayClass
            classes={thursdayClasses}
            user={user}
          />
        </div>
        <div className="col-md-2">
          <FridayClass
            classes={fridayClasses}
            user={user}
          />
        </div>
      </div>
      </div>
    </div>
  );
};

export default Dashboard;