import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const EditPost = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [thumbnail, setThumbnail] = useState('');

  const modules = {
    toolbar: [
      [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
      [{size: []}],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{'list': 'ordered'}, {'list': 'bullet'}, 
       {'indent': '-1'}, {'indent': '+1'}],
      ['link', 'image', 'video'],
      ['clean']
    ],
    clipboard: {
      // Match visual, not semantic
      matchVisual: false,
    }
  };

  const formats = [
    'header', 'font', 'size',
    'bold', 'italic', 'underline', 'strike', 'blockquote',
    'list', 'bullet', 'indent',
    'link', 'image', 'video'
  ];

  return (
    <section className='Create'>
      <div className='CreateContainer'>
        <h2>EDIT</h2>
      
        <form className='CreateForm'>
          <input type='text' placeholder='Title' value={title} onChange={e => setTitle(e.target.value)} autoFocus />
          <ReactQuill theme="snow" modules={modules} formats={formats} value={body} onChange={setBody} />
          <input type='file' onChange={e => setThumbnail(e.target.files[0])} accept='image/png, image/jpeg'/>
          <button type='submit' className='btnSubmit'>Update!</button>
        </form>
      </div>
    </section>
  );
}

export default EditPost;