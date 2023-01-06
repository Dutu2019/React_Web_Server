import { useContext, useRef, useState } from "react";
import { UserContext } from "../../App";
import "./Files.css";

function Files() {
  const user = useContext(UserContext);
  const [file, setFile] = useState(null);

  const submitFile = () => {
    console.log(file);
    const form = new FormData();
    form.append("file", file[0]);

    fetch(`http://10.2.10.51/addFile`, {
      method: "POST",
      credentials: "include",
      body: form,
    });
  };

  return (
    <div className="files">
      <div className="title title1">Welcome {user.firstName},</div>
      <div className="title title2">Here are your Files</div>
      <label className="input">
        Select File
        <input
          type="file"
          onChange={(e) => {
            setFile(e.target.files);
          }}
        />
      </label>
      <button type="submit" onClick={submitFile}>
        Submit
      </button>
      <div className="Files"></div>
    </div>
  );
}

export default Files;
