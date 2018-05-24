package org.apache.camel.workshop.gateway;

import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

public class Payment {

    @NotNull
    private String reference;

    @NotNull
    private String user;

    @NotNull
    @Min(0)
    private Integer amount;

    private boolean active = true;

    public Payment() {
    }

    public String getReference() {
        return reference;
    }

    public void setReference(String reference) {
        this.reference = reference;
    }

    public String getUser() {
        return user;
    }

    public void setUser(String user) {
        this.user = user;
    }

    public Integer getAmount() {
        return amount;
    }

    public void setAmount(Integer amount) {
        this.amount = amount;
    }

    public boolean isActive() {
        return active;
    }

    public void setActive(boolean active) {
        this.active = active;
    }

    @Override
    public String toString() {
        return "Payment{" +
                "reference='" + reference + '\'' +
                ", user='" + user + '\'' +
                ", amount=" + amount +
                ", active=" + active +
                '}';
    }
}
