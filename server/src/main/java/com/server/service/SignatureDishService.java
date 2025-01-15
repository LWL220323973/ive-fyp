package com.server.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.server.mapper.SignatureDishMapper;
import com.server.model.SignatureDish;

@Service
public class SignatureDishService {

    @Autowired
    private SignatureDishMapper mapper;

    public List<SignatureDish> getSignatureDish(SignatureDish signatureDish) {
        return mapper.getSignatureDish(signatureDish);
    }
}