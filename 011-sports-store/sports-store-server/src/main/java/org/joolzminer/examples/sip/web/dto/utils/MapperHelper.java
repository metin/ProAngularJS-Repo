package org.joolzminer.examples.sip.web.dto.utils;

import java.util.ArrayList;
import java.util.List;

import org.joolzminer.examples.sip.domain.LineItem;
import org.joolzminer.examples.sip.domain.Order;
import org.joolzminer.examples.sip.domain.Product;
import org.joolzminer.examples.sip.services.ProductService;
import org.joolzminer.examples.sip.web.dto.LineItemDTO;
import org.joolzminer.examples.sip.web.dto.OrderDTO;
import org.joolzminer.examples.sip.web.dto.ProductDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MapperHelper {

	@Autowired
	private ProductService productService;

	public ProductDTO fromProduct(Product product) {
		ProductDTO productDTO = new ProductDTO(product.getId(),
				product.getName(), product.getCategory().getName(),
				product.getDescription(), product.getPrice());
		return productDTO;
	}

	public List<ProductDTO> fromProducts(List<Product> products) {
		List<ProductDTO> productDTOs = new ArrayList<>();
		for (Product product : products) {
			productDTOs.add(fromProduct(product));
		}
		return productDTOs;
	}

	public Product toProduct(ProductDTO productDTO) {
		Product product = new Product(
				productService.getCategoryByName(productDTO.getCategory()),
				productDTO.getName(), productDTO.getDescription(),
				productDTO.getPrice());
		if (productDTO.getId() == null) {
			return product;	
		} else {
			return new Product(productDTO.getId(), product);
		}
	}

	public LineItem toLineItem(LineItemDTO lineItemDTO) {
		return new LineItem(productService.getProductById(lineItemDTO.getId()),
				lineItemDTO.getCount());
	}

	public LineItemDTO fromLineItem(LineItem lineItem) {
		return new LineItemDTO(lineItem.getCount(),
				lineItem.getId(), lineItem.getProduct().getName(),
				lineItem.getUnitPrice()); 
	}

	public Order toOrder(OrderDTO orderDTO) {
		Order order = new Order(orderDTO.getName(), orderDTO.getStreet(),
				orderDTO.getCity(), orderDTO.getState(), orderDTO.getZip(),
				orderDTO.getCountry(), orderDTO.isGift());
		for (LineItemDTO lineItemDTO : orderDTO.getLineItemDTOs()) {
			order.add(toLineItem(lineItemDTO));
		}
		return order;
	}

	public OrderDTO fromOrder(Order order) {
		List<LineItemDTO> lineItemDTOs = new ArrayList<>();
		for (LineItem lineItem : order.getLineItems()) {
			lineItemDTOs.add(fromLineItem(lineItem));
		}

		return new OrderDTO(order.getName(), order.getStreet(),
				order.getCity(), order.getState(), order.getZip(),
				order.getCountry(), lineItemDTOs);
	}
	
	public List<OrderDTO> fromOrders(List<Order> orders) {
		List<OrderDTO> orderDTOs = new ArrayList<>();
		for (Order order : orders) {
			orderDTOs.add(fromOrder(order));
		}
		return orderDTOs;
	}
}
