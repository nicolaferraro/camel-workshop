package org.apache.camel.workshop.gatewayservice;

import javax.validation.Valid;
import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.util.LinkedList;
import java.util.List;
import java.util.stream.IntStream;

public class Cart {

    @NotNull
    @Size(min = 1)
    @Valid
    private List<CartItem> items = new LinkedList<>();

    private int price;

    public Cart() {
    }

    public List<CartItem> getItems() {
        return items;
    }

    public void setItems(List<CartItem> items) {
        this.items = items;
    }


    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    @Override
    public String toString() {
        return "Cart{" +
                "items=" + items +
                ", price=" + price +
                '}';
    }

    public static class CartItem {

        private String id;

        @Min(1)
        @Max(100)
        private int amount;

        public CartItem() {
        }

        public CartItem(String itemId, int amount) {
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
            return "CartItem{" +
                    "id='" + id + '\'' +
                    ", amount=" + amount +
                    '}';
        }
    }

}
