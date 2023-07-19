package com.example.springapp.dto.response;

public class SellerDashboardResponse {
    private Long totalRevenue;
    private Integer totalNoProducts;
    private Integer soldProducts;
    private Integer unsoldProducts;
    private Integer outOfStockProducts;
    private Integer totalCustomers;

    public SellerDashboardResponse() {
    }

    public SellerDashboardResponse(Long totalRevenue, Integer totalNoProducts, Integer soldProducts, Integer unsoldProducts, Integer outOfStockProducts, Integer totalCustomers) {
        this.totalRevenue = totalRevenue;
        this.totalNoProducts = totalNoProducts;
        this.soldProducts = soldProducts;
        this.unsoldProducts = unsoldProducts;
        this.outOfStockProducts = outOfStockProducts;
        this.totalCustomers = totalCustomers;
    }

    public Long getTotalRevenue() {
        return totalRevenue;
    }

    public void setTotalRevenue(Long totalRevenue) {
        this.totalRevenue = totalRevenue;
    }

    public Integer getTotalNoProducts() {
        return totalNoProducts;
    }

    public void setTotalNoProducts(Integer totalNoProducts) {
        this.totalNoProducts = totalNoProducts;
    }

    public Integer getSoldProducts() {
        return soldProducts;
    }

    public void setSoldProducts(Integer soldProducts) {
        this.soldProducts = soldProducts;
    }

    public Integer getUnsoldProducts() {
        return unsoldProducts;
    }

    public void setUnsoldProducts(Integer unsoldProducts) {
        this.unsoldProducts = unsoldProducts;
    }

    public Integer getOutOfStockProducts() {
        return outOfStockProducts;
    }

    public void setOutOfStockProducts(Integer outOfStockProducts) {
        this.outOfStockProducts = outOfStockProducts;
    }

    public Integer getTotalCustomers() {
        return totalCustomers;
    }

    public void setTotalCustomers(Integer totalCustomers) {
        this.totalCustomers = totalCustomers;
    }
}
