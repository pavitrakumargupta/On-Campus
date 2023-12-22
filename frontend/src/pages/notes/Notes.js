import React, { useEffect, useState } from "react";
import "./Notes.css";
import GetNotesImage from "./img/getNotes.png";
import UploadNotesImage from "../../logos/upload-Notes.png";
import axios from "../../axios";
import Courses from "./CourseNames.json";

import { UploadImage, DeleteImage } from "../../uploadImage";
import verifyImageByUrl from "../../verifyImageByUrl";
import UploadSymbol from "../../logos/upload-Symbol.png";
import DownImage from "./img/downImg.png";
import { useSelector } from "react-redux";
const Note = () => {
  const user = useSelector((state) => state);
  const defautNotesDetail = {
    courseName: "",
    branchName: "",
    semester: "",
    subject: "",
    tittle: "",
    notesLink: "",
  };
  const [NotesDetail, setNotesDetail] = useState(defautNotesDetail);
  const [noetsCompo, setNotesCompo] = useState();

  const handleNotesDetail = (event) => {
    const { name, value } = event.target;
    const NotesDetailCopy = { ...NotesDetail };
    NotesDetailCopy[name] = value;
    setNotesDetail(NotesDetailCopy);
  };

  var courseObject = {
    BTech: [
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

    // "M Tech": [
    //   " Biotechnology",
    //   "Computer Science and Engineering",
    //   "Mechanical Engineering",
    //   "VLSI Design",
    // ],

    // "B Tech and M Tech integrated": ["Computer Science and Engineering"],

    // "B Pharm": ["B Pharm (PCI Approved)"],

    // "D Pharm": ["D Pharm"],

    // "M Pharm": ["Pharmaceutical Chemistry", "Pharmaceutics", "Pharmacology"],

    // "MBA": ["MBA"],

    // "MCA": ["MCA"],
  };

  const [branches, setBranches] = useState();
  const [semester, setSemester] = useState();
  const [subjects, setSubjects] = useState();

  const courses = [];
  for (const key in courseObject) {
    courses.push(key);
  }

  useEffect(() => {
    if (NotesDetail.courseName === "BTech") {
      let branch = [];
      for (const key in Courses) {
        branch.push(key);
      }
      setBranches(branch);
    } else {
      setBranches(courseObject[NotesDetail.courseName]);
    }
  }, [NotesDetail.courseName]);

  useEffect(() => {
    if (NotesDetail.branchName != "") {
      let semester = [];
      for (const key in Courses[NotesDetail.branchName]) {
        semester.push(key);
      }
      setSemester(semester);
    }
  }, [NotesDetail.branchName]);

  useEffect(() => {
    if (NotesDetail.semester != "") {
      let subject = [];

      Courses[NotesDetail.branchName][NotesDetail.semester].map((key) => {
        subject.push(key);
      });
      setSubjects(subject);
    }
  }, [NotesDetail.semester]);

  const uploadNotes = () => {
    const uploadButtonHandler = (field) => {
      let elem = document.getElementById("fileUpload");
      if (elem) elem.click();
    };

    const onUpload = async (event) => {
      const ImagDetails = await UploadImage(
        event.target.files[0],
        "notes",
        "upload"
      );
      setNotesDetail((prevValue) => ({ ...prevValue, notesLink: ImagDetails }));
    };
    const onDelete = async () => {
      const deleteImage = await DeleteImage(NotesDetail.notesLink);
      setNotesDetail((prevValue) => ({ ...prevValue, notesLink: "" }));
    };

    const uploadPreview = () => {
      const { isImage, decodedFilename } = verifyImageByUrl(
        NotesDetail.notesLink
      );
      return (
        <div className="uploadPreview">
          <i onClick={onDelete} class="fa-solid fa-trash"></i>
          <span>{decodedFilename}</span>
          {isImage ? (
            <img
              className="docPreview"
              src={NotesDetail.notesLink}
              alt="Image Preview"
            />
          ) : (
            <iframe
              src={`https://docs.google.com/viewer?url=${encodeURIComponent(
                NotesDetail.notesLink
              )}&embedded=true`}
              className="docPreview"
              frameborder="0"
            />
          )}
        </div>
      );
    };

    return (
      <div className="UploadCard card">
        <h2>upload Notes</h2>
        <select onChange={handleNotesDetail} name="courseName" id="">
          <option selected disabled value="">
            Select Course Name
          </option>
          {courses.map((key) => {
            return <option>{key}</option>;
          })}
        </select>
        <select onChange={handleNotesDetail} name="branchName" id="">
          <option selected disabled value="">
            Select Branch Name
          </option>
          {branches &&
            branches.map((key) => {
              return <option>{key}</option>;
            })}
        </select>
        <select onChange={handleNotesDetail} name="semester" id="">
          <option selected disabled value="">
            Select Semester
          </option>
          {semester &&
            semester.map((key) => {
              return <option>{key}</option>;
            })}
        </select>
        <select onChange={handleNotesDetail} name="subject" id="">
          <option selected disabled value="">
            Select Subject Name
          </option>
          {subjects &&
            subjects.map((key) => {
              return <option>{key}</option>;
            })}
        </select>
        <input name="tittle" placeholder="Enter Tittle Of Name" type="text" />
        <input
          id="fileUpload"
          type="file"
          onChange={onUpload}
          multiple="single"
        />

        <img onClick={uploadButtonHandler} src={UploadSymbol} alt="" />
        {NotesDetail.notesLink !== "" && uploadPreview()}
        <button onClick={handleSubmit}>Upload</button>
      </div>
    );
  };

  const getNotes = () => {
    return (
      <div className="UploadCard card">
        <h2>Get Notes</h2>
        <select onChange={handleNotesDetail} name="courseName" id="">
          <option selected disabled value="">
            Select Course Name
          </option>
          {courses.map((key) => {
            return <option>{key}</option>;
          })}
        </select>
        <select onChange={handleNotesDetail} name="branchName" id="">
          <option selected disabled value="">
            Select Branch Name
          </option>
          {branches &&
            branches.map((key) => {
              return <option>{key}</option>;
            })}
        </select>
        <select onChange={handleNotesDetail} name="semester" id="">
          <option selected disabled value="">
            Select Semester
          </option>
          {semester &&
            semester.map((key) => {
              return <option>{key}</option>;
            })}
        </select>
        <select onChange={handleNotesDetail} name="subject" id="">
          <option selected disabled value="">
            Select Subject Name
          </option>
          {subjects &&
            subjects.map((key) => {
              return <option>{key}</option>;
            })}
        </select>
        <button onClick={handleSubmit}>Get Notes</button>
      </div>
    );
  };
  const [notesData, setNotesData] = useState();

  const handleSubmit = async (event) => {
    event.preventDefault();
    const config = {
      headers: {
        Authorization: `Bearer ${user.details.token}`,
      },
    };
    try {
      if (noetsCompo === "UploadNotes") {
        const upload = await axios.post(
          "/Notes/uploadNotes",
          NotesDetail,
          config
        );
      } else if (noetsCompo == "getNotes") {
        const notes = await axios.post("/Notes/getNotes", NotesDetail, config);
        setNotesData(notes.data);
        setBranches();
        setSemester();
        setSubjects();
        scrollToNotes();
      }
      setNotesDetail(defautNotesDetail);
    } catch (error) {
      error.response.status == 401 && (window.location.href = "/login");
      scrollToNotes();
    }
  };

  const scrollToNotes = () => {
    const targetDiv = document.getElementById("notes");

    if (targetDiv) {
      targetDiv.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="notesPage">
      <background className="background"></background>
      <img src={DownImage} alt="" />
      {noetsCompo === "getNotes" ? (
        <div className="noteCardBox">{getNotes()}</div>
      ) : (
        <div
          onClick={() => setNotesCompo("getNotes")}
          className="startCard getCard"
        >
          <h2>Get Notes</h2>
          <img src={GetNotesImage} alt="" />
        </div>
      )}

      {noetsCompo === "getNotes" && notesData && (
        <div className="notes">
          <div>
            <div>
              <h2>Notes :-</h2>
              <p>{notesData.length} - results</p>
            </div>

            {notesData
              .slice()
              .reverse()
              .map((key) => {
                const { isImage } = verifyImageByUrl(key.notesLink);
                return (
                  <div className="note">
                    {isImage ? (
                      <img
                        className="docPreview"
                        src={key.notesLink}
                        alt="Image Preview"
                      />
                    ) : (
                      <iframe
                        src={`https://docs.google.com/viewer?url=${encodeURIComponent(
                          key.notesLink
                        )}&embedded=true`}
                        frameborder="0"
                      />
                    )}
                    <div>
                      <h4>{key.tittle}</h4>
                      <p>
                        - {key.subject} {key.semester} Semester
                      </p>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      )}
      {noetsCompo === "UploadNotes" ? (
        <div className="noteCardBox">{uploadNotes()}</div>
      ) : (
        <div
          onClick={() => setNotesCompo("UploadNotes")}
          className="startCard uploadCard"
        >
          <h2>Upload Notes</h2>
          <img src={UploadNotesImage} alt="" />
        </div>
      )}
    </div>
  );
};

export default Note;
