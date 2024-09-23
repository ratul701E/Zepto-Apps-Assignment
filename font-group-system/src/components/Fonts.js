import React, { useEffect } from 'react';

function Fonts({ fonts, onRemove }) {
  useEffect(() => {
    fonts.forEach((font) => {
      const fontUrl = process.env.REACT_APP_API_ENDPOINT + `get-font-file.php?filename=${font.name}`;
      const fontNameWithoutExtension = font.name.split('.').slice(0, -1).join('.');

      const existingStyle = document.getElementById(`font-${fontNameWithoutExtension}`);
      if (existingStyle) {
        existingStyle.remove();
      }

      const style = document.createElement('style');
      style.id = `font-${fontNameWithoutExtension}`;
      style.innerHTML = `
        @font-face {
          font-family: '${fontNameWithoutExtension}-${font.id}';
          src: url('${fontUrl}') format('truetype');
        }
      `;
      document.head.appendChild(style);
    });
  }, [fonts]);

  return (
    <table className="table">
      <thead>
        <tr>
          <th>Name</th>
          <th>Preview</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {fonts.map((font) => {
          const fontNameWithoutExtension = font.name.split('.').slice(0, -1).join('.');

          return (
            <tr key={font.id}>
              <td>{fontNameWithoutExtension}</td>
              <td style={{ fontFamily: `${fontNameWithoutExtension}-${font.id}`, fontSize: '20px' }}>
                This is a preview in {fontNameWithoutExtension}
              </td>
              <td>
                <button onClick={() => onRemove(font.id)} className="btn btn-danger">
                  Remove
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default Fonts;
