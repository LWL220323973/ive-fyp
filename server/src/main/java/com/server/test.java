package com.server;

import org.jasypt.util.text.AES256TextEncryptor;

public class test {
    public static void main(String[] args) {
        AES256TextEncryptor textEncryptor = new AES256TextEncryptor();
        textEncryptor.setPassword("ive_fyp_20242025_admin_password_encryption_password"+12345678);
        String passwordDecrypted = textEncryptor.encrypt("root_root");
        System.out.println(passwordDecrypted);
    }
}
