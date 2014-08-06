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
												product.getName(), 
												product.getCategory().getName(),
												product.getDescription(), 
												product.getPrice());
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
		Product product = new Product(productService.getCategoryByName(productDTO.getCategory()), 
				productDTO.getName(), productDTO.getDescription(), productDTO.getPrice());
		return product;
	}
	
	public LineItem toLineItem(LineItemDTO lineItemDTO) {
		return new LineItem(productService.getProductById(lineItemDTO.getId()), lineItemDTO.getCount());
	}

	public Order toOrder(OrderDTO orderDTO) {
		Order order = new Order(orderDTO.getName(), orderDTO.getStreet(), orderDTO.getCity(), orderDTO.getState(), orderDTO.getZip(), orderDTO.getCountry(), orderDTO.isGift());
		for (LineItemDTO lineItemDTO : orderDTO.getLineItemDTOs()) {
			order.add(toLineItem(lineItemDTO));
		}
		return order;
	}
}
