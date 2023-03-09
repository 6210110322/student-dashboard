import React from 'react'
import { Link } from "react-router-dom";

const Home = ({ user }) => {
  const userId = user?.uid;
  return (
    <div className="container-fluid pb-4 pt-4 padding">
        <h2>Student Dashboard for Organizing Online Learning</h2>
        <h4>แดชบอร์ดสำหรับนักศึกษาในการจัดการเรียนรู้ออนไลน์</h4>
        <img alt='' src='https://media.istockphoto.com/id/1217284422/vector/student-in-digital-homeschool-online-class-program-cartoon.jpg?s=170667a&w=0&k=20&c=6ZVmhlij2uNH4xx2aPW0DVw7u2VXfl5JfbJA7S5QDfA=' width="360" height="270" style={{ padding: 20 }}></img>
        <div>
          <p>♥ แสดงปฏิทิน → วันกำหนดส่งงาน & วันสอบ ♥</p>
          <p>♦ แสดงภาพรวม → งานใกล้วันกำหนดส่ง & ตารางเรียน ♦</p>
          <p>♣ จัดการ → ภาระงาน-การบ้าน → To-Do List ♣</p>
          <p>♠ เพิ่ม / แก้ไข / ลบ → การเรียน & ภาระงาน ♠</p>
        </div>
        
        {user?.uid ? (<button className="btn btn-primary" type="submit">
                <Link to={`/dashboard`} style={{ textDecoration: "none", color: "white"}}>Go to your dashboard!</Link>
        </button>) : (<button className="btn btn-primary" type="submit">
                <Link to={`/auth`} style={{ textDecoration: "none", color: "white"}}>Login to use the website!</Link>
        </button>)}
    </div>
  )
}

export default Home