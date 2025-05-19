import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Swal from 'sweetalert2';
import { NotificationManager } from 'react-notifications';
import { FormikProvider, useFormik } from 'formik';

const ListofImages = ({flag}) => {
  const [data, setData] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [currentId, setCurrentId] = useState(null);

  const formik = useFormik({
    initialValues: {
      name: '',
      file: '',
    },
    onSubmit:(values) => {
    },
  });

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      setData([])
      const res = await axios.get('http://localhost:1299/kavya/images');
      setData(res.data);
    } catch (err) {
      console.error('Error fetching data:', err);
    }
  };
   useEffect(()=>{},[data])
  const handleDelete = async (id) => {
    const confirm = await Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to delete this image?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
    });

    if (confirm.isConfirmed) {
      try {
        await axios.get(`http://localhost:1299/kavya/deleteimage/${id}`);
        Swal.fire('Deleted!', 'Image has been deleted.', 'success').then(fetchData);
      } catch (err) {
        Swal.fire('Error!', 'Could not delete item.', 'error');
      }
    }
  };

  const handleAdd = () => {
    setModalOpen(true);
    setEditMode(false);
    formik.resetForm();
    setCurrentId(null);
  };

  const handleEdit = (item) => {
    formik.setValues({
      name: item.name || '',
      file: item.file || '',
    });
    setModalOpen(true);
    setEditMode(true);
    setCurrentId(item.id);
  };

  return (
    <div>
      <FormikProvider value={formik}>
        <form onSubmit={formik.handleSubmit}>
          <h2 align="center">Monitoring Images</h2>
          {flag==='A'&&
          <div style={{ textAlign: 'center', marginBottom: '10px' }}>
            <button type="button" onClick={handleAdd}>Add Image</button>
          </div>}

          <table border="1px" align="center" cellPadding="10">
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                {flag==='A'&& <th>Actions</th>}
              </tr>
            </thead>
            <tbody>
              {data!==undefined&&data!==null&&data.length>1&&data?.map((item, index) => (
                <tr key={index}>
                  <td>
                    <img
                      src={`http://localhost:1299/kavya/image/${item?.id}?t=${new Date().getTime()}`}
                      alt={item?.name}
                      height="100px"
                      width="100px"
                    />
                  </td>
                  <td>{item?.name}</td>
                  {flag==='A'&& <td>
                    <button type="button" onClick={() => handleEdit(item)}>Update</button>{' '}
                    <button type="button" onClick={() => handleDelete(item.id)}>Delete</button>
                  </td>}
                </tr>
              ))}
            </tbody>
          </table>

          {modalOpen && (
            <div style={modalStyle}>
              <h3>{editMode ? 'Update Image' : 'Add Image'}</h3>
              <label><b>Upload Image:</b></label><br />
              <input
                type="file"
                id="file"
                name="file"
                onChange={(event) => fileupload(event, 'file', formik,editMode?'http://localhost:1299/kavya/update/'+currentId:'http://localhost:1299/kavya/upload')}
              /><br /><br />
              {/* <button type="submit">{editMode ? 'Update' : 'Add'}</button>{' '} */}
              <button type="button" onClick={() => { setModalOpen(false); setEditMode(false); fetchData();}}>Close</button>
            </div>
          )}
        </form>
      </FormikProvider>
    </div>
  );
};

const modalStyle = {
  position: 'fixed',
  top: '25%',
  left: '35%',
  background: '#fff',
  padding: '20px',
  border: '2px solid #444',
  borderRadius: '10px',
  zIndex: 1000,
  width: '300px'
};

export default ListofImages;

// Upload file to backend and store returned name
export function fileupload(event, fieldName, formik,url) {
  const allowedExtensions = ['jpeg', 'jpg', 'png'];
  const uploadedFile = event.currentTarget.files[0];
  const uploadedFileExtension = uploadedFile.name.split('.').pop().toLowerCase();
  const isTooLarge = checkUploadFileSize(event, 1000); // 1MB

  if (allowedExtensions.includes(uploadedFileExtension) && !isTooLarge) {
    const formData = new FormData();
    formData.append('file', uploadedFile);

    axios.post(url, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    }).then(response => {
      if (response?.data) {
        NotificationManager.success(response.data + ' Uploaded Successfully');
        formik.setFieldValue(fieldName, response.data); // save file name/path
      }
    });
  } else {
    if (isTooLarge) {
      Swal.fire("File must be less than 1 MB", "warning");
    } else {
      Swal.fire("Only jpeg, jpg, png formats are allowed", "warning");
    }
    formik.setFieldValue(fieldName, '');
    document.getElementById(fieldName).value = '';
  }
}

export function checkUploadFileSize(event, maxfileSizeKB) {
  const fileSizeKB = Math.round(event.currentTarget.files[0].size / 1024);
  return fileSizeKB > maxfileSizeKB;
}
