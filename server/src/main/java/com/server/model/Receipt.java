package com.server.model;

import java.sql.Timestamp;

public class Receipt {
    
    private int id;
    private Timestamp createdAt;
    private boolean isRequestServiceCharge;
    
    public Receipt() {
    }
    
    public Receipt(int id, Timestamp createdAt, boolean isRequestServiceCharge) {
        this.id = id;
        this.createdAt = createdAt;
        this.isRequestServiceCharge = isRequestServiceCharge;
    }
    
    public int getId() {
        return id;
    }
    
    public void setId(int id) {
        this.id = id;
    }
    
    public Timestamp getCreatedAt() {
        return createdAt;
    }
    
    public void setCreatedAt(Timestamp createdAt) {
        this.createdAt = createdAt;
    }
    
    public boolean isRequestServiceCharge() {
        return isRequestServiceCharge;
    }
    
    public void setRequestServiceCharge(boolean isRequestServiceCharge) {
        this.isRequestServiceCharge = isRequestServiceCharge;
    }
    
    @Override
    public String toString() {
        return "Receipt{" +
                "id=" + id +
                ", createdAt=" + createdAt +
                ", isRequestServiceCharge=" + isRequestServiceCharge +
                '}';
    }
}
