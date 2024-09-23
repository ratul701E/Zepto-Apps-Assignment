import React from 'react'

function FileUpload({fetchFonts, setNotificationSeverity, setNotification}) {
    const handleFileUpload = async (file) => {
        const validExtensions = ['ttf'];
        const fileExtension = file.name.split('.').pop().toLowerCase();

        if (file && validExtensions.includes(fileExtension)) {
            const formData = new FormData();
            formData.append('fontFile', file);

            await fetch(process.env.REACT_APP_API_ENDPOINT + 'upload-font.php', {
                method: 'POST',
                body: formData,
            })
            .then(res => {
                if(res.status == 200) {
                    setNotification("New Font " + file.name + " uploaded");
                    setNotificationSeverity('success');
                }
                else {
                    setNotification("Failed to add font");
                    setNotificationSeverity('error');
                }
            })
            .catch(err => {
                setNotification("Failed to add font");
                setNotificationSeverity('error');
            });

            fetchFonts();
        } else {
            setNotification('Please upload a TTF file. Uploaded file type: ' + file.type);
        }
    };

    const handleDrop = (e) => {
        e.preventDefault();
        const files = Array.from(e.dataTransfer.files);
        if (files.length > 0) {
            handleFileUpload(files[0]);
        }
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    const triggerFileInput = () => {
        document.getElementById('fileInput').click();
    };

    return (
        <div>
            <h2 className="mb-4">Upload Font</h2>

            <div
                className="dropzone p-3 mb-4 border border-primary text-center"
                onDragOver={handleDragOver}
                onDrop={handleDrop}
                onClick={triggerFileInput}
                style={{ cursor: 'pointer' }}
            >
                <img
                    src="upload.png"
                    alt="Upload Font"
                    height={70}
                    width={100}
                />
                <p className="mt-2">Drag & Drop your TTF file here, or click to select</p>
            </div>

            <input
                type="file"
                accept=".ttf"
                id="fileInput"
                className="file-input"
                hidden={true}
                onChange={(e) => handleFileUpload(e.target.files[0])}
            />

        </div>
    )
}

export default FileUpload