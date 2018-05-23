package org.apache.camel.workshop.inventory;


import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.stereotype.Component;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Component("inventory")
public class InventoryImpl implements Inventory {

    private Catalog catalog;

    private Map<String, Purchase> purchases;

    @PostConstruct
    public void init() throws IOException {
        catalog = new ObjectMapper()
                .readValue(getClass().getResourceAsStream("/catalog.json"), Catalog.class);

        purchases = new HashMap<>();
    }

    @Override
    public Catalog getCatalog() {
        return this.catalog;
    }

    @Override
    public void addToPurchase(String purchaseReferenceCode, String itemId, int amount) {
        synchronized (this) {
            if (amount <= 0) {
                throw new IllegalArgumentException("Amount must be positive: " + amount);
            }

            if (purchaseReferenceCode != null && isCanceled(purchaseReferenceCode)) {
                throw new IllegalStateException("Purchase reference code has been cancelled : " + purchaseReferenceCode);
            }

            Item item = this.catalog.getItems().get(itemId);
            if (item == null) {
                throw new IllegalArgumentException("Item " + itemId + " not found");
            }

            if (item.getStockUnits() < amount) {
                throw new IllegalStateException("Insufficent items for id: " + itemId);
            }

            item.setStockUnits(item.getStockUnits() - amount);

            if (purchaseReferenceCode != null) {
                Purchase refPurchase = this.purchases.computeIfAbsent(purchaseReferenceCode, Purchase::new);
                int oldAmount = refPurchase.getItems().getOrDefault(itemId, 0);
                refPurchase.getItems().put(itemId, oldAmount + amount);
            }
        }
    }

    @Override
    public List<Purchase> getPurchases() {
        synchronized (this) {
            return new ArrayList<>(this.purchases.values());
        }
    }

    @Override
    public void cancelPurchase(String purchaseReferenceCode) {
        synchronized (this) {
            boolean alreadyCanceled = isCanceled(purchaseReferenceCode);

            if (!alreadyCanceled) {

                if (this.purchases.get(purchaseReferenceCode) == null) {
                    Purchase canceled = new Purchase(purchaseReferenceCode);
                    canceled.setActive(false);
                    this.purchases.put(purchaseReferenceCode, canceled);
                } else {
                    Purchase purchase = this.purchases.get(purchaseReferenceCode);
                    purchase.setActive(false);
                    for (String itemId : purchase.getItems().keySet()) {
                        Item item = catalog.getItems().get(itemId);
                        // restore the stock units
                        item.setStockUnits(item.getStockUnits() + purchase.getItems().get(itemId));
                    }
                }
            }
        }
    }

    private boolean isCanceled(String purchaseReferenceCode) {
        return this.purchases.containsKey(purchaseReferenceCode) && !this.purchases.get(purchaseReferenceCode).isActive();
    }

}
