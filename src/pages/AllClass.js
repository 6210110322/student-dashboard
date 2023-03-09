import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { collection, deleteDoc, doc, getDocs, onSnapshot, query, where, orderBy } from "firebase/firestore";
import { db } from "../firebase";
import { toast } from "react-toastify";
import ClassSection from "../components/ClassSection";

const AllClass = ({ user }) => {
  const userId = user?.uid;
  const [classes, setClasses] = useState([]);
  const [sortClasses, setSortClasses] = useState([]);

    const getSortClasses = async () => {
      const classesRef = collection(db, "classes")
      const sortQuery = query(classesRef, where("userId", "==", userId), orderBy("day"), orderBy("startTime"));
      const querySnapshot = await getDocs(sortQuery);
      let sortClasses = [];
      querySnapshot.forEach((doc) => {
        sortClasses.push({id: doc.id, ...doc.data()});
      })
      setSortClasses(sortClasses);
    }
    
    useEffect(() => {
      getSortClasses();
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
          getSortClasses();
        };
    }, []);

    const handleDelete = async (id) => {
      if (window.confirm("Are you sure wanted to delete that class?")) {
        try {
          await deleteDoc(doc(db, "classes", id));
          toast.success("Class deleted successfully!");
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
          <ClassSection
            classes={sortClasses}
            user={user}
            handleDelete={handleDelete}
          />
        </div>
        <div className="col-12 py-3 text-center">
            <button className="btn btn-add" type="submit">
                <Link to={`/class`} style={{ textDecoration: "none", color: "white"}}>Add Class</Link>
            </button>
        </div>
      </div>
    </div>
  )
}

export default AllClass