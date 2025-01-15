package com.server.controller;

import com.server.model.SignatureDish;
import com.server.service.SignatureDishService;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class SignatureDishController {

    @Autowired
    private SignatureDishService service;

    @PostMapping("/api/menu/getSignatureDish")
    public List<SignatureDish> getSignatureDish(@RequestBody SignatureDish signatureDish) {
        return service.getSignatureDish(signatureDish);
    }
}