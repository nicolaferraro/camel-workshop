package org.apache.camel.workshop.gatewayservice;

import java.util.Collection;

public class Item {

    private String id;

    private String name;

    private String image;

    private int quantity;

    private boolean recommended;

    public Item() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getImage() {
        return image;
    }

    public void setImage(String image) {
        this.image = image;
    }

    public int getQuantity() {
        return quantity;
    }

    public void setQuantity(int quantity) {
        this.quantity = quantity;
    }

    public boolean isRecommended() {
        return recommended;
    }

    public void setRecommended(boolean recommended) {
        this.recommended = recommended;
    }

    @Override
    public String toString() {
        return "Item{" +
                "id='" + id + '\'' +
                ", name='" + name + '\'' +
                ", image='" + image + '\'' +
                ", quantity=" + quantity +
                ", recommended=" + recommended +
                '}';
    }

    public static class Items {

        private Collection<Item> items;

        public Items() {
        }

        public Items(Collection<Item> items) {
            this.items = items;
        }

        public Collection<Item> getItems() {
            return items;
        }

        public void setItems(Collection<Item> items) {
            this.items = items;
        }

        @Override
        public String toString() {
            return "Items{" +
                    "items=" + items +
                    '}';
        }
    }
}
