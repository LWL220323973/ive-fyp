package com.server.controller;

import java.io.File;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.URLDecoder;
import java.net.URLEncoder;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;

import org.springframework.core.io.Resource;
import org.springframework.core.io.UrlResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
@RequestMapping("/api/admin/photoAdmin")
@CrossOrigin
public class PhotoController_Admin {

    // 定義圖片存儲目錄
    private final String PHOTO_DIR = System.getProperty("user.dir") + "/src/main/resources/static/photo/";

    // 根據文件名獲取圖片的 API
    @GetMapping("/{imageName}")
    public ResponseEntity<Resource> getImageByName(@PathVariable String imageName) {
        try {
            // 手動解碼文件名
            String decodedImageName = URLDecoder.decode(imageName, StandardCharsets.UTF_8.name());
            log.info("Decoded image name: {}", decodedImageName);

            Path filePath = Paths.get(PHOTO_DIR).resolve(decodedImageName).normalize();
            log.info("Fetching image from path: {}", filePath);

            Resource resource = new UrlResource(filePath.toUri());
            if (resource.exists() && resource.isReadable()) {
                String contentType = Files.probeContentType(filePath);
                if (contentType == null) {
                    contentType = "application/octet-stream";
                }

                // 對文件名進行 URL 編碼
                String encodedFileName = URLEncoder.encode(resource.getFilename(), StandardCharsets.UTF_8.name())
                        .replace("+", "%20"); // 將空格替換為 %20

                return ResponseEntity.ok()
                        .contentType(MediaType.parseMediaType(contentType))
                        .header(HttpHeaders.CONTENT_DISPOSITION, "inline; filename*=UTF-8''" + encodedFileName)
                        .body(resource);
            } else {
                log.warn("Image not found or not readable: {}", decodedImageName);
                return ResponseEntity.status(HttpStatus.NOT_FOUND).build();
            }
        } catch (MalformedURLException e) {
            log.error("Malformed URL for image: {}", imageName, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        } catch (IOException e) {
            log.error("Error reading image: {}", imageName, e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).build();
        }
    }

    //Upload image
    @PostMapping("/uploadPhoto")
    public ResponseEntity<String> uploadImage(@RequestParam("file") MultipartFile file) {
        String uploadDir = PHOTO_DIR;

        try {
            String originalFilename = file.getOriginalFilename();
            if (originalFilename == null || originalFilename.isEmpty()) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body("Invalid file name");
            }

            File destinationFile = new File(uploadDir + originalFilename);
            file.transferTo(destinationFile);

            log.info("File uploaded successfully: " + originalFilename);
            // 返回圖片的相對路徑
            return ResponseEntity.ok(originalFilename);
        } catch (IOException e) {
            log.error("File upload failed: " + file.getOriginalFilename(), e);
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("File upload failed");
        }
    }

    // Cancel Upload Image
    @PostMapping("/cancelUploadPhoto")
    public void cancelUploadPhoto(@RequestBody String file) {
        File uploadDirFile = new File(PHOTO_DIR);
        if (uploadDirFile.exists() && uploadDirFile.isDirectory()) {
            File[] files = uploadDirFile.listFiles();
            if (files != null) {
                for (File f : files) {
                    // 對文件名進行 URL 解碼，確保處理中文字符
                    String decodedFileName = URLDecoder.decode(file, StandardCharsets.UTF_8);
                    if (f.getName().equals(decodedFileName.replaceAll("\\.(jpg|png).*", ".$1"))) {
                        if (f.delete()) {
                            log.info("File deleted successfully: " + f.getName());
                        } else {
                            log.warn("Failed to delete file: " + f.getName());
                        }
                        break;
                    }
                }
            }
        }
    }
}
