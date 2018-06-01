package org.apache.camel.workshop.credit;

import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

@Component("creditStore")
public class CreditStoreImpl implements CreditStore {

    private static final int BASE_CREDIT = 30;

    private Map<String, Integer> accounts = new TreeMap<>();

    private Map<String, Payment> payments = new TreeMap<>();

    @Override
    public synchronized void add(Payment payment) {
        if (payments.containsKey(payment.getReference())) {
            throw new IllegalStateException("Order already acquired");
        }

        Integer current = accounts.get(payment.getUser());
        if (current == null) {
            current = BASE_CREDIT;
        }

        if (current - payment.getAmount() < 0) {
            payment.setActive(false);
            payments.put(payment.getReference(), payment);
            throw new IllegalStateException("Insufficient credit!");
        }

        payment.setActive(true);

        int newCredit = current - payment.getAmount();
        accounts.put(payment.getUser(), newCredit);
        payments.put(payment.getReference(), payment);
    }

    @Override
    public synchronized void remove(String ref) {
        if (payments.containsKey(ref) && payments.get(ref).isActive()) {
            Payment payment = payments.get(ref);
            int current = accounts.get(payment.getUser());
            accounts.put(payment.getUser(), current + payment.getAmount());
            // set inactive for subsequent cancellations
            payment.setActive(false);
        } else if (!payments.containsKey(ref)) {
            // prevents subsequent creation of the payment
            Payment dummy = new Payment();
            dummy.setReference(ref);
            dummy.setAmount(0);
            dummy.setActive(false);
            payments.put(ref, dummy);
        }
    }

    @Override
    public synchronized List<Payment> list() {
        return new ArrayList<>(this.payments.values());
    }

}
