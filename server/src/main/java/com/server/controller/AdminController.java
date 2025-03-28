package com.server.controller;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.FileSystemResource;
import org.springframework.core.io.Resource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.server.model.Admin;
import com.server.service.AdminService;
import com.server.service.readExcel;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@RestController
public class AdminController {

    @Autowired
    private AdminService service;

    @Autowired
    private readExcel readExcel;

    @PostMapping("/api/admin/adminLogin")
    public boolean getAdmin(@RequestBody Admin admin) {
        return service.getAdmin(admin.getUsername(), admin.getPassword());
    }

    @PostMapping("/api/admin/findInAdmin")
    public List<Admin> findInAdmin(@RequestBody Admin admin) {
        return service.findInAdmin(admin);
    }

    @PostMapping("/api/admin/registerAdmin")
    public int registerAdmin(@RequestBody Admin admin) {
        return service.registerAdmin(admin);
    }

    @PostMapping("/api/admin/getLatestAdmin")
    public Admin getLatestAdmin() {
        return service.getLatestAdmin();
    }

    @PostMapping("/api/admin/updateAdmin")
    public int editAdmin(@RequestBody Admin admin) {
        return service.editAdmin(admin);
    }

    @PostMapping("/api/admin/checkPassword")
    public boolean checkPassword(@RequestBody Admin admin) {
        return service.checkOldPassword(admin);
    }

    // Download Excel Template
    @GetMapping("/api/admin/downloadExcel/UserInfo.xlsx")
    public ResponseEntity<Resource> downloadUserInfoTemplate() {
        String filePath = "excel_template/UserInfo.xlsx";
        Resource resource = new FileSystemResource(filePath);

        if (!resource.exists()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok()
                .header(HttpHeaders.CONTENT_DISPOSITION, "attachment; filename=UserInfo.xlsx")
                .body(resource);
    }

    // Upload Excel File
    @PostMapping("/api/admin/uploadExcel")
    public boolean uploadExcel(@RequestParam("file") MultipartFile file) {
        String uploadDir = System.getProperty("user.dir") + "\\excel_upload\\";
        File uploadDirFile = new File(uploadDir);
        if (!uploadDirFile.exists()) {
            uploadDirFile.mkdirs();
        }

        try {
            file.transferTo(new File(uploadDir + file.getOriginalFilename()));
            log.info("File uploaded successfully: " + file.getOriginalFilename());
            return true;
        } catch (IOException e) {
            log.error("File upload failed: " + file.getOriginalFilename());
            return false;
        }
    }

    // Cancel Upload Excel File
    @PostMapping("/api/admin/cancelUploadExcel")
    public void cancelUploadExcel() {
        String uploadDir = System.getProperty("user.dir") + "\\excel_upload\\";
        File[] files = new File(uploadDir).listFiles();
        for (File file : files) {
            if (file.isFile()) {
                log.info("File deleted successfully: " + file.getName());
                file.delete();
            }
        }
    }

    // Read Excel File
    @PostMapping("/api/admin/submitExcel")
    public Object submitExcel() {
        String uploadDir = System.getProperty("user.dir") + "\\excel_upload\\";
        File[] files = new File(uploadDir).listFiles();
        List<Admin> admins = new ArrayList<>();
        for (File file : files) {
            if (file.isFile()) {
                admins = readExcel.readAdminExcel(file);
                cancelUploadExcel();
            }
        }
        if (admins != null) {
            int count = 0;
            for (Admin admin : admins) {
                count += service.registerAdmin(admin);
                log.info("Admin registered successfully: " + admin.toString());
            }
            return count;
        } else {
            return false;
        }
    }

    @PostMapping("/api/admin/deleteAdmin")
    public int deleteAdmmin(@RequestBody Admin admin) {
        if (service.deleteAdminById(admin) == 1) {
            log.info("Admin(" + admin.getStaff_id() + ") deleted successfully");
            return 1;
        } else {
            return 0;
        }
    }
}