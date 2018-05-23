package org.apache.camel.workshop.inventory;

import java.util.Map;

public class Catalog {

    private Map<String, Item> items;

    public Catalog() {
    }

    public Catalog(Map<String, Item> items) {
        this.items = items;
    }

    public Map<String, Item> getItems() {
        return items;
    }

    public void setItems(Map<String, Item> items) {
        this.items = items;
    }

    @Override
    public String toString() {
        return "Catalog{" +
                "items=" + items +
                '}';
    }
}
