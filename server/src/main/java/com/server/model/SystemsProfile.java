    package com.server.model;

public class SystemsProfile {
    private Integer id;
    private String restaurantNameZhHK;
    private String restaurantNameZhCN;
    private String restaurantNameUsEN;
    private Boolean isOrderingDisabled;
    private Boolean isServiceChargeRequired;
    private Boolean isFactoryEmployeeCheckRequired;

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getRestaurantNameZhHK() {
        return restaurantNameZhHK;
    }

    public void setRestaurantNameZhHK(String restaurantNameZhHK) {
        this.restaurantNameZhHK = restaurantNameZhHK;
    }

    public String getRestaurantNameZhCN() {
        return restaurantNameZhCN;
    }

    public void setRestaurantNameZhCN(String restaurantNameZhCN) {
        this.restaurantNameZhCN = restaurantNameZhCN;
    }

    public String getRestaurantNameUsEN() {
        return restaurantNameUsEN;
    }

    public void setRestaurantNameUsEN(String restaurantNameUsEN) {
        this.restaurantNameUsEN = restaurantNameUsEN;
    }

    public Boolean getIsOrderingDisabled() {
        return isOrderingDisabled;
    }

    public void setIsOrderingDisabled(Boolean isOrderingDisabled) {
        this.isOrderingDisabled = isOrderingDisabled;
    }

    public Boolean getIsServiceChargeRequired() {
        return isServiceChargeRequired;
    }

    public void setIsServiceChargeRequired(Boolean isServiceChargeRequired) {
        this.isServiceChargeRequired = isServiceChargeRequired;
    }

    public Boolean getIsFactoryEmployeeCheckRequired() {
        return isFactoryEmployeeCheckRequired;
    }

    public void setIsFactoryEmployeeCheckRequired(Boolean isFactoryEmployeeCheckRequired) {
        this.isFactoryEmployeeCheckRequired = isFactoryEmployeeCheckRequired;
    }
}