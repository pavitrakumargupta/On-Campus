import React, { useEffect, useState } from "react";
import "./Notes.css";
import { useNavigate,useLocation } from "react-router-dom";
import { MdOutlineDeleteOutline } from "react-icons/md";
import UploadImage from "../../uploadImage";
import { useSelector } from "react-redux";
import axios from "../../axios";
import NoteImg from "./img/notes.png"

const Notes = () => {

  const user = useSelector((state) => state);

  const navigate = useNavigate();
  const location = useLocation(); 
  useEffect(() => {
    if (user.details === "unset") {
      localStorage.setItem(
        "lastUrl",
        JSON.stringify({ url: location.pathname })
      );
      navigate("/");
    }
  }, []);


  const uploadImage =
    "https://cdn.pixabay.com/photo/2016/01/03/00/43/upload-1118929_960_720.png";

  var courseObject = {
    "BTech": [
      "Information Technology",
      "Computer Science and Engineering",
      "Mechanical Engineering",
      "Electronics and Communication Engineering",
      "Computer Science and Business System",
      "Data Science",
      "Artificial Intelligence",
      "Machine Learning",
      "Information Technology",
    ],

    "M Tech": [
      " Biotechnology",
      "Computer Science and Engineering",
      "Mechanical Engineering",
      "VLSI Design",
    ],

    "B Tech and M Tech integrated": ["Computer Science and Engineering"],

    "B Pharm": ["B Pharm (PCI Approved)"],

    "D Pharm": ["D Pharm"],

    "M Pharm": ["Pharmaceutical Chemistry", "Pharmaceutics", "Pharmacology"],

    "MBA": ["MBA"],

    "MCA": ["MCA"],
  };

  

  const courses = [];
  for (const key in courseObject) {
    courses.push(key);
  }

  const defautNotesDetail= {
    courseName:"",
    branchName:"",
    semester:"",
    subject:"",
    tittle:"",
    notesLink:"",
    userId:user.details.userId
  }

  const [NotesDetail,setNotesDetail]=useState(defautNotesDetail)

  const [notesAction, setNotesAction] = useState();
  useEffect(()=>{
    setBranch([])
    setNotesDetail(defautNotesDetail)
  },[notesAction])

  const [CourseName,setCourseName]=useState("")

  const [branch,setBranch]=useState([])

  useEffect(()=>{
    setBranch(courseObject[NotesDetail.courseName])
  },[NotesDetail.courseName])

 

  const [imagePath, setimagePath] = useState("");
  const [Image, setImage] = useState("");

  const handleNotesUpload = async (event) => {
    const ImagDetails = await UploadImage(event.target.files[0],"notes", "upload");
    setImage(event.target.files[0].name);
    setimagePath(ImagDetails.pathname); 
    let NotesDetailCopy = { ...NotesDetail };
    NotesDetailCopy.notesLink = ImagDetails.url;
    setNotesDetail(NotesDetailCopy)
  };
  const handleNotesDelete = async () => {
    const deleteImage = await UploadImage(imagePath, "delete");
    setImage("");
    setimagePath("");
    let NewpostDetailsCopy = { ...NotesDetail };
    NewpostDetailsCopy.notesLink = "";
    setNotesDetail(NewpostDetailsCopy);
  };

  const handleNotesDetail=(event)=>{
    const {name,value}=event.target;
    const NotesDetailCopy={...NotesDetail};
    NotesDetailCopy[name]=value;
    setNotesDetail(NotesDetailCopy)
  }

  const [notesData,setNotesData]=useState()

  const handleSubmit=async (event)=>{
    if(notesAction==="upload"){
      const upload=await axios.post("/uploadNotes",NotesDetail)
    }else if(notesAction=="get"){
      event.preventDefault();
      const notes=await axios.post("/getNotes",NotesDetail)
      setNotesData(notes.data)
    }
  }


  return (
    <div className="notesPage">
      {notesAction !== "get" && (
        <div
          onClick={() => {
            setNotesAction("get");
          }}
          style={{padding: "50px",display:"flex",flexDirection:"column",gap:"2rem"}}
          className="card"
        >
          <h4   style={{margin: "auto",fontSize: "30px",color: " #1D005B",}} >Get Notes </h4>
          <img style={{borderRadius:"150px",height:"10rem",width:"10rem",margin: "auto"}} src="https://clickup.com/blog/wp-content/uploads/2020/01/note-taking.png" alt="" />
        </div>
      )}
      {notesAction !== "upload" && (
        <div
          onClick={() => {
            setNotesAction("upload");
          }}
          style={{padding: "50px",display:"flex",flexDirection:"column",gap:"2rem"}}
          className="card"
        >
          <h4   style={{margin: "auto",fontSize: "30px",color: " #1D005B",}} >Upload Notes </h4>
          <img style={{borderRadius:"50px",height:"10rem",width:"10rem",margin: "auto"}} src="https://cdn-icons-png.flaticon.com/512/338/338864.png" alt="" />
     </div>
      )}
      {notesAction === "upload" && (
        <div className="card">
          <div className="card-header">Upload Notes</div>
          <div className="card-body">
            <form onSubmit={handleSubmit}>
            <div className="form-group">
                <label htmlFor="branch">Courses</label>
                <select  id="course" name="courseName" onChange={handleNotesDetail} required>
                  <option disabled selected="selected"> </option>
                  {courses.map((key) => {
                    return <option>{key}</option>;
                  })}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="branch">Branch</label>
                <select id="course" name="branchName" onChange={handleNotesDetail}  required>
                  <option disabled selected="selected"> </option>
                  {branch&&branch.map((key) => {
                    return <option>{key}</option>;
                  })}
                </select>
              </div>
             
              <div className="form-group">
                <label htmlFor="semester">Semester</label>
                <input name="semester" required type="text" onChange={handleNotesDetail} pattern="[1-8]" id="semester" />
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input name="subject" type="text" onChange={handleNotesDetail} id="subject" />
              </div>
              <div className="form-group">
                <label htmlFor="title">Title</label>
                <input name="tittle" type="text" onChange={handleNotesDetail} id="title" />
              </div>
              <div  className="form-group">
                <label htmlFor="file">File</label>
                
          <div className="imageSection">
          <input className="imageInput"  required type="file" accept="application/pdf" onChange={handleNotesUpload} id="file" />
            <div className="imageUpload" >
            <img  src="https://icon-library.com/images/upload-icon/upload-icon-14.jpg" alt="" />
              <button  >Upload Notes</button>
            </div>
            
            {NotesDetail.notesLink !== "" && (
              <div className="UploadedBox">
                <img
                  className="UploadedImage"
                  src={NotesDetail.coverImageLink}
                />
                <p>{Image}</p>
                <MdOutlineDeleteOutline
                  onClick={handleNotesDelete}
                  className="dleteImage"
                />
              </div>
            )}
          </div>
              </div>
              <button type="submit" className="btn">Upload</button>
            </form>
          </div>
        </div>
      )}

      {notesAction === "get" && (
        <div className="card">
          <div className="card-header">Get Notes</div>
          <div className="card-body">
            <form  >
            <div className="form-group">
                <label htmlFor="branch">Courses</label>
                <select id="course" name="courseName" onChange={handleNotesDetail} required>
                  <option disabled selected="selected"> </option>
                  {courses.map((key) => {
                    return <option>{key}</option>;
                  })}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="branch">Branch</label>
                <select   name="branchName" onChange={handleNotesDetail}  required>
                  <option disabled selected="selected"> </option>
                  {branch&&branch.map((key) => {
                    return <option>{key}</option>;
                  })}
                </select>
              </div>

              <div className="form-group">
                <label htmlFor="semester">Semester</label>
                <input name="semester" pattern="[1-8]" type="number" onChange={handleNotesDetail} id="semester" required />
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <input name="subject" type="text" id="subject" onChange={handleNotesDetail} />
              </div>
              <div className="form-group">
                <label htmlFor="title">Title *(optional) </label>
                <input name="tittle" type="text" id="title" onChange={handleNotesDetail} />
              </div>
              <button  onClick={handleSubmit} className="btn">Get</button>
            </form>
          </div>
        </div>
      )}
    {
      notesAction === "get" &&notesData&&<div className="notes">
      <div>
        <h2>Notes :-</h2>
        <p>{notesData.length} - results</p>
      </div>
     
    {notesData.map(key=>(
       <a href={key.notesLink} target="_blank" className="note">
        <img src={NoteImg} alt="" />
          <div>
          <h4>{key.tittle}</h4>
          <p>- {key.subject} {key.semester} Semester</p>
          </div>
          
       </a>
    ))}
    </div>
    }
      
      

    </div>
  );
};

export default Notes;
