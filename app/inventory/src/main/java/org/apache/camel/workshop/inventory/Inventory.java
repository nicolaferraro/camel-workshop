package org.apache.camel.workshop.inventory;

import java.util.List;

public interface Inventory {

    Catalog getCatalog();

    void addToPurchase(String purchaseReferenceCode, String itemId, int amount);

    List<Purchase> getPurchases();

    void cancelPurchase(String purchaseReferenceCode);

}
