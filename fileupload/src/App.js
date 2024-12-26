import React, { useState } from "react";
import { gql, useMutation } from "@apollo/client";

function App() {

//   const UPLOAD_FILE = gql`
//   mutation SaveFile($name: String!, $file: Upload!) {
//   saveFile(name: $name, file: $file) {
//     success
//     file {
//       id
//       name
//       file
//     }
//   }
// }

// `;

const UPLOAD_FILE = gql`
    mutation SaveFile($name: String!, $file: Upload!) {
        saveFile(name: $name, file: $file) {
            success
            file {
                id
                name
                file
            }
        }
    }
`;

  const [file, setFile] = useState(null);
  const [name, setName] = useState("");
  const [uploadFile] = useMutation(UPLOAD_FILE);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    try {
      const response = await uploadFile({
        variables: { file, name },
      });
      console.log("Upload response:", response.data);
    } catch (error) {
      console.error("Error uploading file:", error);
    }
  };
  return (
   <>
   <div>
      <input
        type="text"
        placeholder="Enter file name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload}>Upload File</button>
    </div>
   </>
  );
}

export default App;
