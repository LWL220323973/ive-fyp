package com.server.mapper;

import java.util.List;
import org.apache.ibatis.annotations.Mapper;
import com.server.model.SignatureDish;

@Mapper
public interface SignatureDishMapper {
    List<SignatureDish> getSignatureDish(SignatureDish signatureDish);
}