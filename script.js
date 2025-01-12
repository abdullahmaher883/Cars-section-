document.getElementById('messageForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const username = document.getElementById('username').value;
    const message = document.getElementById('message').value;
    const imageFile = document.getElementById('imageInput').files[0];
    const fileFile = document.getElementById('fileInput').files[0];

    // إرسال النص
    if (username && message) {
        const chatBox = document.getElementById('chatBox');
        
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        messageElement.innerHTML = `<strong>${username}:</strong> <p>${message}</p>`;
        
        chatBox.appendChild(messageElement);

        document.getElementById('message').value = '';
    }

    // رفع الصورة
    if (imageFile) {
        const formData = new FormData();
        formData.append("file", imageFile);
        
        fetch('upload.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                const chatBox = document.getElementById('chatBox');
                const messageElement = document.createElement('div');
                messageElement.classList.add('message');
                messageElement.innerHTML = `<strong>${username}:</strong> <img src="${data.filePath}" alt="صورة" style="max-width: 100%; max-height: 300px; border-radius: 5px;">`;
                chatBox.appendChild(messageElement);
            } else {
                alert(data.message);
            }
        })
        .catch(error => {
            alert("خطأ في رفع الصورة");
        });

        document.getElementById('imageInput').value = '';
    }

    // رفع الملف
    if (fileFile) {
        const formData = new FormData();
        formData.append("file", fileFile);
        
        fetch('upload.php', {
            method: 'POST',
            body: formData
        })
        .then(response => response.json())
        .then(data => {
            if (data.status === "success") {
                const chatBox = document.getElementById('chatBox');
                const messageElement = document.createElement('div');
                messageElement.classList.add('message');
                messageElement.innerHTML = `<strong>${username}:</strong> <a href="${data.filePath}" download>تحميل الملف المرفوع</a>`;
                chatBox.appendChild(messageElement);
            } else {
                alert(data.message);
            }
        })
        .catch(error => {
            alert("خطأ في رفع الملف");
        });

        document.getElementById('fileInput').value = '';
    }
});

// تحميل الرسائل عند تحميل الصفحة
window.onload = function() {
    const messages = JSON.parse(localStorage.getItem('messages')) || [];
    const chatBox = document.getElementById('chatBox');
    messages.forEach(msg => {
        const messageElement = document.createElement('div');
        messageElement.classList.add('message');
        
        if (msg.message) {
            messageElement.innerHTML = `<strong>${msg.username}:</strong> <p>${msg.message}</p>`;
        }

        if (msg.image) {
            messageElement.innerHTML = `<strong>${msg.username}:</strong> <img src="${msg.image}" alt="صورة" style="max-width: 100%; max-height: 300px; border-radius: 5px;">`;
        }

        if (msg.file) {
            messageElement.innerHTML = `<strong>${msg.username}:</strong> <a href="${msg.file}" download>تحميل الملف المرفوع</a>`;
        }

        chatBox.appendChild(messageElement);
    });
};

// جعل زر إرسال الصورة يعمل
document.getElementById('imageButton').addEventListener('click', function() {
    document.getElementById('imageInput').click();
});

// جعل زر رفع الملف يعمل
document.getElementById('fileButton').addEventListener('click', function() {
    document.getElementById('fileInput').click();
});
