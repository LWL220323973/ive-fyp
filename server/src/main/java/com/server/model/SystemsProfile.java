package com.server.model;

import lombok.Data;

@Data
public class SystemsProfile {
    private int id;
    private String restaurantName;
    private boolean isOrderingDisabled;
    private boolean isServiceChargeRequired;
}