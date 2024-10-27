async function generatePath() {
    const formData = {
        name: document.getElementById('name').value,
        age: document.getElementById('age').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        skills: document.getElementById('skills').value,
        interests: document.getElementById('interests').value,
        academicBackground: document.getElementById('academicBackground').value,
        additionalBackground: document.getElementById('additionalBackground').value,
        goals: document.getElementById('goals').value
    };

    try {
        const response = await fetch('http://127.0.0.1:5000/generate-path', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }

        const data = await response.json();
        // Split by newline and join with <br> for HTML line breaks
        const formattedPaths = data.paths.replace(/\n/g, '<br>');
        document.getElementById('result').innerHTML = `<h2>Generated Paths:</h2><pre>${formattedPaths}</pre>`;
        document.getElementById('download-pdf').style.display = 'block'; // Show download button
    } catch (error) {
        console.error('Error:', error);
        alert('There was an error generating your paths. Please try again.');
    }
}

async function downloadPDF() {
    const response = await fetch('http://127.0.0.1:5000/download-pdf', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });

    if (!response.ok) {
        alert('Failed to download the PDF. Please try again.');
        return;
    }

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.style.display = 'none';
    a.href = url;
    a.download = 'learning_path.pdf';
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
}
