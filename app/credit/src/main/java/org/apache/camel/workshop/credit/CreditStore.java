package org.apache.camel.workshop.credit;

import java.util.List;

public interface CreditStore {

    void add(Payment payment);

    void remove(String ref);

    List<Payment> list();

}
