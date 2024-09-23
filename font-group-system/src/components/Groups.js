function Groups({ groups, fetchFontGroups, setNotificationSeverity, setNotification, toggleForm, setRows, setGroupTitle, setGroupID}) {

  const removeGroup = async (id, name) => {
    const formData = new FormData();
    formData.append('id', id);
    await fetch(process.env.REACT_APP_API_ENDPOINT + 'remove-group.php', {
      method: 'POST',
      body: formData,
    })
      .then((res) => {
        setNotification(`Group name ${name} removed`);
        setNotificationSeverity('warning');
      })
      .catch((err) => {
        setNotification('Failed to remove group');
        setNotificationSeverity('error');
      });

    fetchFontGroups();
  };

  const updateGroup = (group) => {
    setGroupTitle(group.name)  
    setGroupID(group.id)
    const updatedRows = group.fonts.map((font) => ({
      name: font.name,
      font: font.id,
      size: font.size,
      price: font.price,
    }));

    setRows(updatedRows);
    toggleForm();
  };

  return (
    <div className="table-responsive">
      <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th>Name</th>
            <th>Listed Fonts</th>
            <th>Count</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {groups.map((group) => (
            <tr key={group.id}>
              <td>{group.name}</td>
              <td>{group.fonts.map((font) => font.name).join(', ')}</td>
              <td>{group.count}</td>
              <td>
                <button
                  onClick={() => updateGroup(group)}
                  className="btn btn-info btn-sm"
                >
                  Update
                </button>
                &nbsp;
                <button
                  onClick={() => removeGroup(group.id, group.name)}
                  className="btn btn-danger btn-sm"
                >
                  Remove
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Groups;
