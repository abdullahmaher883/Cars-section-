<?php
if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    // تحقق من وجود ملف
    if (isset($_FILES['file'])) {
        $file = $_FILES['file'];
        
        // تعيين المجلد الذي سيتم حفظ الملفات فيه
        $uploadDirectory = "uploads/";

        // تحقق من نوع الملف (صورة أو ملف عام)
        $fileType = pathinfo($file['name'], PATHINFO_EXTENSION);
        $fileName = time() . "_" . basename($file['name']);
        $uploadPath = $uploadDirectory . $fileName;

        // نقل الملف إلى المجلد المطلوب
        if (move_uploaded_file($file['tmp_name'], $uploadPath)) {
            echo json_encode(["status" => "success", "filePath" => $uploadPath]);
        } else {
            echo json_encode(["status" => "error", "message" => "فشل رفع الملف"]);
        }
    }
}
?>
