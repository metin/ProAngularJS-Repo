package org.joolzminer.examples.sip.web.dto.utils;

import java.util.ArrayList;
import java.util.List;

import org.joolzminer.examples.sip.domain.Product;
import org.joolzminer.examples.sip.services.ProductService;
import org.joolzminer.examples.sip.web.dto.ProductDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class MapperHelper {

	@Autowired
	private ProductService productService;

	public ProductDTO fromProduct(Product product) {
		ProductDTO productDTO = new ProductDTO(product.getId(),
				product.getName(), product.getCategory(),
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
		Product product = new Product(
				productDTO.getCategory(),
				productDTO.getName(),
				productDTO.getPrice());
		if (productDTO.getId() == null) {
			return product;	
		} else {
			return new Product(productDTO.getId(), product);
		}
	}
}
