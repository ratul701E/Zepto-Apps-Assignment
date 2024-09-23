import React, { useEffect, useState } from 'react';

function FontGroupForm({ fonts, fetchFontGroups, toggleForm, setNotificationSeverity, setNotification, rows, setRows, groupTitle, setGroupTitle, groupID }) {
  const [formError, setFormError] = useState('');
  const [isUpdate, setIsUpdate] = useState(false)

  useEffect(() => {
    if (rows.length > 1) setIsUpdate(true)
  }, [])

  const handleAddRow = () => {
    setRows([...rows, { name: '', font: '', size: 0, price: 0 }]);
    console.log(isUpdate)
  };

  const handleRemoveRow = (index) => {
    const newRows = [...rows];
    newRows.splice(index, 1);
    setRows(newRows);
  };

  const handleInputChange = (index, field, value) => {
    const newRows = [...rows];
    newRows[index][field] = value;
    setRows(newRows);
  };

  const clearForm = () => {
    fetchFontGroups();
    toggleForm();
    setFormError('');
    setGroupTitle('');
    setRows([{ name: '', font: '', size: 0, price: 0 }]);
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    const selectedFonts = rows.filter(row => row.font);
    if (selectedFonts.length < 2) {
      setFormError('You must select at least two fonts.');
    } else {
      setFormError('');
      const formData = new FormData();
      formData.append('group_title', groupTitle);
      formData.append('group_id', groupID);
      formData.append('rows', JSON.stringify(rows));
      console.log(JSON.stringify(rows));

      let url = process.env.REACT_APP_API_ENDPOINT + 'create-group.php';
      if (isUpdate) url = process.env.REACT_APP_API_ENDPOINT + 'update-group.php';

      await fetch(url, {
        method: 'POST',
        body: formData,
      }).then(res => {
        if (res.status == 200) {
          setNotification("Saved successfully")
          setNotificationSeverity('success');
          clearForm();
        }
        else {
          setNotification("Failed to Save group")
          setNotificationSeverity('error');
        }

      }).catch(err => {
        setNotification("Failed to Save group")
        setNotificationSeverity('error');
      });
    }
  };


  return (
    <div className="font-group-form">
      <h3>Create Font Group</h3>
      <p>You have to select at least two fonts</p>

      <form onSubmit={handleSubmit}>
        <div className="form-group mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Group Title"
            value={groupTitle}
            onChange={(e) => setGroupTitle(e.target.value)}
            required
          />
        </div>

        {rows.map((row, index) => (
          <div key={index} className="form-row d-flex align-items-center">
            <div className="col">
              <input
                type="text"
                className="form-control"
                placeholder="Font Name"
                value={row.name}
                onChange={(e) => handleInputChange(index, 'name', e.target.value)}
                required
              />
            </div>

            <div className="col">
              <select
                className="form-control"
                value={row.font}
                onChange={(e) => handleInputChange(index, 'font', e.target.value)}
                required
              >
                <option value="">Select a Font</option>
                {fonts.map((font) => (
                  <option key={font.id} value={font.id}>{font.name}</option>
                ))}
              </select>
            </div>

            <div className="col">
              <input
                type="number"
                className="form-control"
                placeholder="Size"
                value={row.size}
                onChange={(e) => handleInputChange(index, 'size', e.target.value)}
                min="1"
                required
              />
            </div>

            <div className="col">
              <input
                type="number"
                className="form-control"
                placeholder="Price"
                value={row.price}
                onChange={(e) => handleInputChange(index, 'price', e.target.value)}
                min="0"
                required
              />
            </div>

            {rows.length > 1 && (
              <div className="col-auto">
                <button
                  type="button"
                  className="btn btn-danger"
                  onClick={() => handleRemoveRow(index)}
                >
                  X
                </button>
              </div>
            )}
          </div>
        ))}

        <div className="button-row">
          <button type="button" className="btn btn-primary" onClick={handleAddRow}>
            + Add Row
          </button>
          <button type="submit" className="btn btn-success">
            Save
          </button>
        </div>

        {formError && <p className="text-danger mt-3">{formError}</p>}
      </form>
    </div>
  );
}

export default FontGroupForm;
