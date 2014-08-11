package org.joolzminer.examples.sip.services;

import java.util.List;

import org.joolzminer.examples.sip.domain.Category;
import org.joolzminer.examples.sip.domain.Product;
import org.joolzminer.examples.sip.repository.CategoryRepository;
import org.joolzminer.examples.sip.repository.ProductRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@PreAuthorize("denyAll")
public class ProductService {

	@SuppressWarnings("unused")
	private static final Logger LOGGER = LoggerFactory.getLogger(ProductService.class);
	
	@Autowired
	private ProductRepository productRepository;
	
	@Autowired
	private CategoryRepository categoryRepository;

	@PreAuthorize("permitAll")
	public List<Product> getProducts() {
		return productRepository.findAll();
	}
	
	@PreAuthorize("permitAll")
	public Product getProductById(Long id) {
		return productRepository.findOne(id);
	}
	
	@PreAuthorize("permitAll")
	public Category getCategoryByName(String categoryName) {
		return categoryRepository.findByName(categoryName);
	}
	
	@PreAuthorize("hasAnyRole('PERM_DELETE_PRODUCTS', 'PERM_ADMIN_PRODUCTS')")
	@Transactional(readOnly = false)
	public void deleteProduct(Long id) {
		productRepository.delete(id);
	}
	
	@PreAuthorize("hasAnyRole('PERM_CREATE_PRODUCTS', 'PERM_ADMIN_PRODUCTS')")
	@Transactional(readOnly = false)
	public Product createProduct(Product product) {
		return productRepository.save(product);
	}
	
	@PreAuthorize("hasAnyRole('PERM_UPDATE_PRODUCTS', 'PERM_ADMIN_PRODUCTS')")
	@Transactional(readOnly = false)
	public void updateProduct(Product product) {
		productRepository.save(product);
	}
}
