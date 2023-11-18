import React, { useState } from 'react';

type Data = {
  Username: string;
  email: string;
  age?: number
}

type FuncProps = {
  func: (data: Data) => void;
}

function Form({ func }: FuncProps): JSX.Element {
  const [formData, setFormData] = useState<Data>({ Username: '', email: '' });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  }

  const handleSubmit = () => {
    func(formData);
  }

  return (
    <div id='Form'>
      <input type="text" name="Username" value={formData.Username} onChange={handleInputChange} />
      <input type="text" name="email" value={formData.email} onChange={handleInputChange} />
      <button onClick={handleSubmit}>Submit</button>
    </div>
  );
}

export default Form;