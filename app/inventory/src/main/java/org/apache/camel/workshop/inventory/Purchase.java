package org.apache.camel.workshop.inventory;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

public class Purchase {

    private String id;

    private Map<String, Integer> items = new ConcurrentHashMap<>();

    private boolean active = true;

    public Purchase() {
    }

    public Purchase(String id) {
        this.id = id;
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public Map<String, Integer> getItems() {
        return items;
    }

    public void setItems(Map<String, Integer> items) {
        this.items = items;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    @Override
    public String toString() {
        return "Purchase{" +
                "id='" + id + '\'' +
                ", items=" + items +
                ", active=" + active +
                '}';
    }
}
