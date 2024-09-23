import React, { useState, useEffect } from 'react';
import './App.css';
import Fonts from './components/Fonts';
import Groups from './components/Groups';
import FontGroupForm from './components/FontGroupForm';
import FileUpload from './components/FileUpload';

function App() {
  const [fonts, setFonts] = useState([]);
  const [fontGroups, setFontGroups] = useState([]);
  const [showNewGroupForm, setShowNewGroupForm] = useState(false);
  const [notificationFontUpload, setNotificationFontUpload] = useState('')
  const [notificationGroupCreate, setNotificationGroupCreate] = useState('')
  const [notificationSeverity, setNotificationSeverity] = useState('info')
  const [rows, setRows] = useState([{ name: '', font: '', size: 0, price: 0 }]);
  const [groupTitle, setGroupTitle] = useState('');
  const [groupID, setGroupID] = useState(0);

  useEffect(() => {
    fetchFonts();
    fetchFontGroups();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setNotificationFontUpload('');
    }, 3000);
  }, [notificationFontUpload])

  useEffect(() => {
    setTimeout(() => {
      setNotificationGroupCreate('');
    }, 3000);
  }, [notificationGroupCreate])


  const fetchFonts = async () => {
    const response = await fetch(process.env.REACT_APP_API_ENDPOINT + 'get-fonts.php').catch(err => {
      alert("Something is wrong")
    });
    const data = await response.json();
    setFonts(data);
  };

  const fetchFontGroups = async () => {
    const response = await fetch(process.env.REACT_APP_API_ENDPOINT + 'get-groups.php').catch(err => {
      alert("Something is wrong")
    });
    const data = await response.json();
    setFontGroups(data);
  };

  const removeFont = async (id) => {
    const formData = new FormData();
    formData.append('id', id);
    await fetch(process.env.REACT_APP_API_ENDPOINT + 'remove-font.php', {
      method: 'POST',
      body: formData,
    })
      .then(res => {
        if (res.status == 200) {
          setNotificationFontUpload("Font removed successfully");
          setNotificationSeverity('warning');
        }
        else {
          setNotificationFontUpload("Failed to remove");
          setNotificationSeverity('error');
        }
      })
      .catch(err => {
        setNotificationSeverity('error');
      });

    fetchFonts();
  }

  const toggleForm = () => {
    setShowNewGroupForm(!showNewGroupForm);
  };

  const getAlertClass = () => {
    switch (notificationSeverity) {
      case 'info':
        return 'alert alert-info';
      case 'success':
        return 'alert alert-success';
      case 'warning':
        return 'alert alert-warning';
      case 'error':
        return 'alert alert-danger';
      default:
        return 'alert alert-info';
    }
  };

  return (
    <div className="container mt-4">

      <FileUpload
        fetchFonts={fetchFonts}
        setNotification={setNotificationFontUpload}
        setNotificationSeverity={setNotificationSeverity}

      />

      <div className="mb-5">
        <h3 className="mb-3">Uploaded Fonts ({fonts.length})</h3>
        {
          notificationFontUpload.length > 0 &&
          <div id="msg" class={getAlertClass()}>
            {notificationFontUpload}
          </div>
        }
        <Fonts fonts={fonts} onRemove={removeFont} />
      </div>

      <div className="mb-5">
        <h3 className="mb-3">Font Groups ({fontGroups.length})</h3>
        <button
          className="btn btn-primary mb-3"
          onClick={() => {
            toggleForm();
            setRows([{ name: '', font: '', size: 0, price: 0 }])
          }}
        >
          {showNewGroupForm ? 'Cancel' : 'Add New Group'}
        </button>

        {
          notificationGroupCreate.length > 0 &&
          <div id="msg" class={getAlertClass()}>
            {notificationGroupCreate}
          </div>
        }

        {showNewGroupForm &&
          <div className="new-group-form mb-4">
            <FontGroupForm
              fonts={fonts}
              fetchFontGroups={fetchFontGroups}
              toggleForm={toggleForm}
              setNotification={setNotificationGroupCreate}
              rows={rows}
              setRows={setRows}
              groupTitle={groupTitle}
              setGroupTitle={setGroupTitle}
              groupID={groupID}
              setNotificationSeverity={setNotificationSeverity}
            />
          </div>
        }
        <Groups
          groups={fontGroups}
          fetchFontGroups={fetchFontGroups}
          setNotification={setNotificationGroupCreate}
          setRows={setRows}
          toggleForm={toggleForm}
          setGroupTitle={setGroupTitle}
          setGroupID={setGroupID}
          setNotificationSeverity={setNotificationSeverity}
        />
      </div>
    </div>
  );
}

export default App;
