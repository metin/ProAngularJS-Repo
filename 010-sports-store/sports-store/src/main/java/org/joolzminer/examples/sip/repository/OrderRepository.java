package org.joolzminer.examples.sip.repository;

import org.joolzminer.examples.sip.domain.Order;
import org.springframework.data.repository.Repository;

public interface OrderRepository extends Repository<Order, Long> {
	Order save(Order order);
}
