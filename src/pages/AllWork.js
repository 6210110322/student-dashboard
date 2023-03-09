import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, deleteDoc, doc, onSnapshot, query, where, orderBy, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "react-toastify";
import WorkSection from "../components/WorkSection";

const AllWork = ({ user }) => {
  const userId = user?.uid;
  const [works, setWorks] = useState([]);
  const [sortWorks, setSortWorks] = useState([]);

    const getSortWorks = async () => {
      const worksRef = collection(db, "works")
      const sortQuery = query(worksRef, where("userId", "==", userId), orderBy("dueDate"));
      const querySnapshot = await getDocs(sortQuery);
      let sortWorks = [];
      querySnapshot.forEach((doc) => {
        sortWorks.push({id: doc.id, ...doc.data()});
      })
      setSortWorks(sortWorks);
    }
    
  useEffect(() => {
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
      getSortWorks();
    };
  }, []);

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure wanted to delete that work?")) {
      try {
        await deleteDoc(doc(db, "works", id));
        toast.success("Work deleted successfully!");
      } catch (err) {
        console.log(err);
      }
    }
    window.location.reload(false);
  };

  return (
    <div className="container-fluid pb-4 pt-4 padding">
      <div className="container padding">
        <div className="col-md-12">
        <WorkSection
            works={sortWorks}
            user={user}
            handleDelete={handleDelete}
          />
        </div>
        <div className="col-12 py-3 text-center">
            <button className="btn btn-add" type="submit">
                <Link to={`/work`} style={{ textDecoration: "none", color: "white"}}>Add Work</Link>
            </button>
        </div>
      </div>
    </div>
  )
}

export default AllWork