package com.server;

import org.jasypt.util.text.AES256TextEncryptor;

public class Test {

    public static void main(String[] args) {
        AES256TextEncryptor textEncryptor = new AES256TextEncryptor();
        textEncryptor.setPassword("ive_fyp_20242025_admin_password_encryption_password");
        String passwordEncryption = textEncryptor.encrypt("root_root");
        System.out.println(passwordEncryption);
    }
}
