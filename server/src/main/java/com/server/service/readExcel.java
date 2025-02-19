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

@Component
public class readExcel {

    public List<Admin> readAdminExcel(File file) {
        try {
            XSSFWorkbook wb = new XSSFWorkbook(file);
            return loopSheet(wb);
        } catch (IOException e) {
            e.printStackTrace();
        } catch (InvalidFormatException e) {
            e.printStackTrace();
        }
        return null;
    }

    public List<Admin> loopSheet(XSSFWorkbook wb) {
        List<Admin> adminList = new ArrayList<>();
        XSSFSheet sheet = wb.getSheet("Add User");
        for (int i = 1; i <= sheet.getLastRowNum(); i++) {
            Admin admin = new Admin();
            if (sheet.getRow(i).getCell(1).getStringCellValue().trim().isEmpty()
                    || sheet.getRow(i).getCell(3).getNumericCellValue() == 0
                    || sheet.getRow(i).getCell(4).getStringCellValue().trim().isEmpty()) {
                System.out.println("Empty");
                return null;
            } else {
                if (sheet.getRow(i).getCell(1).getStringCellValue().trim().matches("^[a-zA-Z ]+$")) {
                    admin.setName_en(sheet.getRow(i).getCell(1).getStringCellValue());
                } else {
                    System.out.println("Name_en");
                    System.out.println(sheet.getRow(i).getCell(1).getStringCellValue().trim());
                    return null;
                }
                admin.setPhone_number(
                        String.valueOf((int) sheet.getRow(i).getCell(3).getNumericCellValue()).replace(".0", ""));
                // Check email format
                if (sheet.getRow(i).getCell(4).getStringCellValue().trim()
                        .matches("^[A-Za-z0-9+_.-]+@[A-Za-z0-9.-]+$")) {
                    admin.setEmail(sheet.getRow(i).getCell(4).getStringCellValue());
                } else {
                    System.out.println("Email");
                    return null;
                }

                if (!sheet.getRow(i).getCell(2).getStringCellValue().trim().isEmpty()) {
                    // Check only Chinese characters
                    if (sheet.getRow(i).getCell(2).getStringCellValue().trim().matches("[\\u4e00-\\u9fa5]+")) {
                        admin.setName_cn(sheet.getRow(i).getCell(2).getStringCellValue());
                    } else {
                        System.out.println("Name_cn");
                        return null;
                    }
                }

                adminList.add(admin);
            }
        }
        return adminList;
    }

}
