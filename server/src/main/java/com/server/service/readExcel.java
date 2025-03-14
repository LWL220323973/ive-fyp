package com.server.service;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.apache.poi.openxml4j.exceptions.InvalidFormatException;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.stereotype.Component;

import com.server.model.Admin;

import lombok.extern.slf4j.Slf4j;

@Slf4j
@Component
public class readExcel {

    public List<Admin> readAdminExcel(File file) {
        try {
            XSSFWorkbook wb = new XSSFWorkbook(file);
            return loopSheet(wb);
        } catch (IOException e) {
            log.error("IOException occurred while reading the Excel file", e);
        } catch (InvalidFormatException e) {
            log.error("InvalidFormatException occurred while reading the Excel file", e);
        }
        return null;
    }

    public static void main(String[] args) {
        File file = new File("server\\excel_template\\UserInfo.xlsx");
        readExcel read = new readExcel();
        read.readAdminExcel(file);
    }

    public List<Admin> loopSheet(XSSFWorkbook wb) {
        List<Admin> adminList = new ArrayList<>();
        XSSFSheet sheet = wb.getSheet("Add User");
        for (int i = 1; i <= 30; i++) {
            Admin admin = new Admin();
            if (sheet.getRow(i).getCell(1).getStringCellValue().trim().isEmpty()
                    || sheet.getRow(i).getCell(3).getStringCellValue().trim().isEmpty()
                    || sheet.getRow(i).getCell(4).getStringCellValue().trim().isEmpty()
                    || sheet.getRow(i).getCell(5).getStringCellValue().trim().isEmpty()) {
                log.info("Empty");
                return null;
            } else {
                if (sheet.getRow(i).getCell(1).getStringCellValue().trim().matches("^[a-zA-Z ]+$")) {
                    admin.setName_en(sheet.getRow(i).getCell(1).getStringCellValue());
                } else {
                    log.info("Name_en");
                    log.info(sheet.getRow(i).getCell(1).getStringCellValue().trim());
                    return null;
                }
                admin.setPhone_number(
                        sheet.getRow(i).getCell(3).getStringCellValue().trim().replace("'", "").replace(" ", ""));
                admin.setUserRole(sheet.getRow(i).getCell(5).getStringCellValue().toLowerCase());
                // Check email format
                if (sheet.getRow(i).getCell(4).getStringCellValue().trim()
                        .matches("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$")) {
                    admin.setEmail(sheet.getRow(i).getCell(4).getStringCellValue());
                } else {
                    log.info("Email");
                    return null;
                }

                if (!sheet.getRow(i).getCell(2).getStringCellValue().trim().isEmpty()) {
                    // Check only Chinese characters
                    if (sheet.getRow(i).getCell(2).getStringCellValue().trim().matches("[\\u4e00-\\u9fa5]+")) {
                        admin.setName_cn(sheet.getRow(i).getCell(2).getStringCellValue());
                    } else {
                        log.info("Name_cn");
                        return null;
                    }
                }
                adminList.add(admin);
            }
        }
        return adminList;
    }

}
