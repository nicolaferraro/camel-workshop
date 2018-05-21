package org.apache.camel.workshop.inventoryservice;


import com.fasterxml.jackson.core.type.TypeReference;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.util.*;

@Component
public class Inventory {

    private Map<String, Item> items;

    private Map<String, Map<String, Integer>> purchases;

    private Set<String> canceledPurchases;

    @PostConstruct
    public void init() throws IOException {
        items = new ObjectMapper()
                .readValue(
                        getClass().getResourceAsStream("/inventory.json"), new TypeReference<Map<String, Item>>() {}
                );

        purchases = new HashMap<>();
        canceledPurchases = new HashSet<>();
    }

    public Item.Items getItems() {
        return new Item.Items(items.values());
    }

    public void buy(String purchaseReferenceCode, String itemId, int qty) {
        synchronized (this) {
            if (qty <= 0) {
                throw new IllegalArgumentException("Quantity must be positive: " + qty);
            }

            if (purchaseReferenceCode != null && canceledPurchases.contains(purchaseReferenceCode)) {
                throw new IllegalStateException("Purchase reference code has been cancelled : " + purchaseReferenceCode);
            }

            Item item = this.items.get(itemId);
            if (item == null) {
                throw new IllegalArgumentException("Item " + itemId + " not found");
            }

            if (item.getQuantity() < qty) {
                throw new IllegalStateException("Insufficent items for id: " + itemId);
            }

            item.setQuantity(item.getQuantity() - qty);

            if (purchaseReferenceCode != null) {
                Map<String, Integer> refPurchases = this.purchases.computeIfAbsent(purchaseReferenceCode, ref -> new HashMap<>());
                int oldAmount = refPurchases.getOrDefault(itemId, 0);
                refPurchases.put(itemId, oldAmount + qty);
            }
        }
    }

    public void cancel(String purchaseReferenceCode) {
        synchronized (this) {
            boolean alreadyCanceled = canceledPurchases.contains(purchaseReferenceCode);

            if (!alreadyCanceled) {
                canceledPurchases.add(purchaseReferenceCode);
                Map<String, Integer> refPurchases = purchases.get(purchaseReferenceCode);
                if (refPurchases != null) {
                    for (String itemId : refPurchases.keySet()) {
                        Item item = items.get(itemId);
                        // restore the quantity
                        item.setQuantity(item.getQuantity() + refPurchases.get(itemId));
                    }
                }
            }
        }
    }

}
