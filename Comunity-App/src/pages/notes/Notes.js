import React, { useEffect, useState } from "react";
import "./Notes.css";
import { useNavigate,useLocation } from "react-router-dom";
import { MdOutlineDeleteOutline } from "react-icons/md";
import UploadImage from "../../uploadImage";
import { useSelector } from "react-redux";
import axios from "../../axios";
import Courses from "./CourseNames.json"

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
    event.preventDefault();
    if(notesAction==="upload"){
      const upload=await axios.post("/uploadNotes",NotesDetail)
    }else if(notesAction=="get"){
      const notes=await axios.post("/getNotes",NotesDetail)
      setNotesData(notes.data)
    }
  }


  const courses = [];
  for (const key in courseObject) {
    courses.push(key);
  }

  const [branches,setBranches]=useState()
  const [semester,setSemester]=useState()
  const [subjects,setSubjects]=useState()
 
  useEffect(()=>{
 
    if(NotesDetail.courseName==="BTech"){
      let branch=[]
      for (const key in Courses) {
        branch.push(key);
      }
      setBranches(branch)
    }else{setBranches(courseObject[NotesDetail.courseName])}
  },[NotesDetail.courseName])

  useEffect(()=>{
 
    if(NotesDetail.branchName!=""){let semester=[]
      for (const key in Courses[NotesDetail.branchName]) {
        semester.push(key);
      }
      setSemester(semester)}
  },[NotesDetail.branchName])

  useEffect(()=>{
 
    if(NotesDetail.semester!=""){
      let subject=[]
       
      Courses[NotesDetail.branchName][NotesDetail.semester].map(key=>{
        subject.push(key);
      })
      setSubjects(subject)}
  },[NotesDetail.semester])

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
                  {branches&&branches.map((key) => {
                    return <option>{key}</option>;
                  })}
                </select>
              </div>
             
              <div className="form-group">
                <label htmlFor="semester">Semester</label>
                <select  name="semester" id="semester"  onChange={handleNotesDetail}  required>
                  <option disabled selected="selected"> </option>
                  {semester&&semester.map((key) => {
                    return <option>{key}</option>;
                  })}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <select   name="subject" id="subject"  onChange={handleNotesDetail}  required>
                  <option disabled selected="selected"> </option>
                  {subjects&&subjects.map((key) => {
                    return <option>{key}</option>;
                  })}
                </select>
                 
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
            <img  src="https://www.efilecabinet.com/wp-content/uploads/2019/05/upload-01.png" alt="" />
              <button  >Upload Notes</button>
            </div>
            
            
          </div>
          {NotesDetail.notesLink !== "" && (
              <div className="UploadedBox">
               
                <embed className="UploadedImage" src={NotesDetail.notesLink} type="" />
                <p>{Image}</p>
                <MdOutlineDeleteOutline
                  onClick={handleNotesDelete}
                  className="dleteImage"
                />
              </div>
            )} 
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
                <select id="course" name="branchName" onChange={handleNotesDetail}  required>
                  <option disabled selected="selected"> </option>
                  {branches&&branches.map((key) => {
                    return <option>{key}</option>;
                  })}
                </select>
              </div>
             
              <div className="form-group">
                <label htmlFor="semester">Semester</label>
                <select  name="semester" id="semester"  onChange={handleNotesDetail}  required>
                  <option disabled selected="selected"> </option>
                  {semester&&semester.map((key) => {
                    return <option>{key}</option>;
                  })}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="subject">Subject</label>
                <select   name="subject" id="subject"  onChange={handleNotesDetail}  required>
                  <option disabled selected="selected"> </option>
                  {subjects&&subjects.map((key) => {
                    return <option>{key}</option>;
                  })}
                </select>
                 
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
        {/* <img src={NoteImg} alt="" /> */}
        {/* <embed
          src={key.notesLink}
          className="modal-document-embed"
          style={{overflow:"hidden"}}
        /> */}
        {/* <object className="modal-document-embed"   data={key.notesLink}></object> */}
        <iframe src={key.notesLink} frameborder="0"  className="modal-document-embed" ></iframe>
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
