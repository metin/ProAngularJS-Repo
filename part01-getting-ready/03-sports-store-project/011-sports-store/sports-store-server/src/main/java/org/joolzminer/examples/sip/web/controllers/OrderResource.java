package org.joolzminer.examples.sip.web.controllers;

import java.util.List;

import org.joolzminer.examples.sip.domain.Order;
import org.joolzminer.examples.sip.services.OrderService;
import org.joolzminer.examples.sip.web.dto.OrderConfirmationDTO;
import org.joolzminer.examples.sip.web.dto.OrderDTO;
import org.joolzminer.examples.sip.web.dto.utils.MapperHelper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/backendapp/orders")
public class OrderResource {
	
	private static final Logger LOGGER = LoggerFactory.getLogger(OrderResource.class);
	
	@Autowired
	private OrderService orderService;
	
	@Autowired
	private MapperHelper mapperHelper;
	
	@RequestMapping(method = RequestMethod.POST, produces = MediaType.APPLICATION_JSON_VALUE)
	public OrderConfirmationDTO processOrder(@RequestBody OrderDTO orderDTO) {
		LOGGER.debug("order received: {}", orderDTO);
		Order order = orderService.processCustomerOrder(mapperHelper.toOrder(orderDTO));
		
		return new OrderConfirmationDTO(order.getId());
	}
	
	@RequestMapping(method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public List<OrderDTO> getOrders() {
		return mapperHelper.fromOrders(orderService.getOrders());
	}
}


