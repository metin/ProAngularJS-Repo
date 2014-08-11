package org.joolzminer.examples.sip.services;

import java.util.List;

import org.joolzminer.examples.sip.domain.Order;
import org.joolzminer.examples.sip.repository.OrderRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Assert;

@Service
@Transactional(readOnly = true)
@PreAuthorize("denyAll")
public class OrderService {

	@SuppressWarnings("unused")
	private static final Logger LOGGER = LoggerFactory.getLogger(OrderService.class);
	
	@Autowired
	private OrderRepository orderRepository;
	

	@PreAuthorize("permitAll")
	@Transactional(readOnly = false)
	public Order processCustomerOrder(Order order) {
		Assert.notEmpty(order.getLineItems(), "The order cannot be empty");
		return orderRepository.save(order);
	}	
	
	@PreAuthorize("hasRole('PERM_READ_ORDERS')")
	public List<Order> getOrders() {
		return orderRepository.findAll();
	}
}
