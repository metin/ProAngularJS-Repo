package org.joolzminer.examples.sip.repository;

import java.util.List;

import org.joolzminer.examples.sip.domain.Order;
import org.springframework.data.repository.Repository;

public interface OrderRepository extends Repository<Order, Long> {
	Order save(Order order);
	List<Order> findAll();
}
