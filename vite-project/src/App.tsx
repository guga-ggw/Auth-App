import './index.scss';
import React, { useState } from 'react';
import Form from './Form';

type Data = {
  Username: string;
  email: string;
}

function App() {
  const [info, setInfo] = useState<Data | undefined>();

  const handleSubmit = (formData: Data) => {
    setInfo(formData);
  }

  console.log(info)

  return (
    <div id='Back'>
      <Form func={handleSubmit} />
      {info && (
        <div>
          <p>Username: {info.Username}</p>
          <p>Email: {info.email}</p>
        </div>
      )}
    </div>
  );
}

export default App;

