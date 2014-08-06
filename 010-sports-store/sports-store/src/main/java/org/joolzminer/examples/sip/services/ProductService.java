package org.joolzminer.examples.sip.services;

import java.util.List;

import org.joolzminer.examples.sip.domain.Category;
import org.joolzminer.examples.sip.domain.Product;
import org.joolzminer.examples.sip.repository.CategoryRepository;
import org.joolzminer.examples.sip.repository.ProductRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
//@PreAuthorize("denyAll") // for now
public class ProductService {

	@SuppressWarnings("unused")
	private static final Logger LOGGER = LoggerFactory.getLogger(ProductService.class);
	
	@Autowired
	private ProductRepository productRepository;
	
	@Autowired
	private CategoryRepository categoryRepository;

//	@PreAuthorize("hasRole('PERM_READ_FORUMS')")
	public List<Product> getProducts() {
		return productRepository.findAll();
	}
	
	public Product getProductById(Long id) {
		return productRepository.findOne(id);
	}
	
	public Category getCategoryByName(String categoryName) {
		return categoryRepository.findByName(categoryName);
	}
	
}
