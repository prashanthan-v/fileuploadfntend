import React from 'react';
import { ApolloProvider, InMemoryCache, ApolloClient } from '@apollo/client';
import { gql, useMutation } from '@apollo/client';

const client = new ApolloClient({
  uri: 'http://localhost:8000/graphql/',  // Point to your GraphQL endpoint
  cache: new InMemoryCache(),
});

const SAVE_FILE_MUTATION = gql`
  mutation SaveFile($name: String!, $file: String!) {
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

const FileUpload = () => {
  const [file, setFile] = React.useState(null);
  const [name, setName] = React.useState('');

  const [saveFile, { data, loading, error }] = useMutation(SAVE_FILE_MUTATION);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      const reader = new FileReader();
      reader.readAsDataURL(selectedFile);
      reader.onloadend = () => {
        setFile(reader.result.split(',')[1]);  // Get Base64 data (strip the prefix data:image/*;base64,)
      };
    }
  };

  const handleUpload = () => {
    if (file && name) {
      saveFile({
        variables: { name, file },
      }).then((res) => {
        console.log('Upload Success:', res);
      }).catch((err) => {
        console.error('Upload Error:', err);
      });
    } else {
      alert('Please provide a file and name!');
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter file name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} disabled={loading}>Upload</button>
      {loading && <p>Uploading...</p>}
      {error && <p>Error: {error.message}</p>}
      {data && data.saveFile.success && <p>File uploaded successfully!</p>}
    </div>
  );
};

const App = () => {
  return (
    <ApolloProvider client={client}>
      <FileUpload />
    </ApolloProvider>
  );
};

export default App;
