package org.apache.camel.workshop.paymentservice;

import org.springframework.stereotype.Component;

import java.util.HashMap;
import java.util.Map;

@Component
public class Bank {

    private Map<String, Integer> accounts = new HashMap<>();

    private Map<String, PaymentData> refToPaymentData = new HashMap<>();

    public synchronized void pay(String ref, String userId, int amount) {
        if (refToPaymentData.containsKey(ref)) {
            throw new IllegalStateException("Order already acquired");
        }

        Integer current = accounts.get(userId);
        if (current == null) {
            current = 100; // BASE value
        }

        if (current - amount < 0) {
            throw new IllegalStateException("Insufficient credit!");
        }

        int newCredit = current - amount;
        accounts.put(userId, newCredit);
        refToPaymentData.put(ref, new PaymentData(userId, amount));
    }

    public synchronized void cancel(String ref) {
        if (refToPaymentData.containsKey(ref) && refToPaymentData.get(ref).user != null) {
            PaymentData payment = refToPaymentData.get(ref);
            int current = accounts.get(payment.user);
            accounts.put(payment.user, current - payment.amount);
            // reset for subsequent cancellations
            refToPaymentData.put(ref, new PaymentData(payment.user, 0));
        } else {
            // prevents subsequent creation of the payment
            refToPaymentData.put(ref, new PaymentData(null, 0));
        }
    }

    static class PaymentData {
        String user;
        int amount;

        PaymentData(String user, int amount) {
            this.user = user;
            this.amount = amount;
        }
    }

}
