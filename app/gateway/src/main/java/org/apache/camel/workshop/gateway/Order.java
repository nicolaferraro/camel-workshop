package org.apache.camel.workshop.gateway;

import javax.validation.Valid;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.LinkedList;
import java.util.List;

public class Order {

    @NotNull
    private String reference;

    @NotNull
    private String user;

    @NotNull
    @Size(min = 1)
    @Valid
    private List<OrderItem> items = new LinkedList<>();

    private int price;

    public Order() {
    }

    public List<OrderItem> getItems() {
        return items;
    }

    public void setItems(List<OrderItem> items) {
        this.items = items;
    }


    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public String getReference() {
        return reference;
    }

    public void setReference(String reference) {
        this.reference = reference;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    @Override
    public String toString() {
        return "Order{" +
                "reference='" + reference + '\'' +
                ", user='" + user + '\'' +
                ", items=" + items +
                ", price=" + price +
                '}';
    }

    public static class OrderItem {

        @NotNull
        private String id;

        @Min(1)
        @Max(100)
        private int amount;

        public OrderItem() {
        }

        public OrderItem(String itemId, int amount) {
            this.id = itemId;
            this.amount = amount;
        }

        public String getId() {
            return id;
        }

        public void setId(String id) {
            this.id = id;
        }

        public int getAmount() {
            return amount;
        }

        public void setAmount(int amount) {
            this.amount = amount;
        }

        @Override
        public String toString() {
            return "OrderItem{" +
                    "id='" + id + '\'' +
                    ", amount=" + amount +
                    '}';
        }
    }

}
