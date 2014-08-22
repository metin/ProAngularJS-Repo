package org.joolzminer.examples.sip.web.controllers;

import java.util.List;

import org.joolzminer.examples.sip.services.ProductService;
import org.joolzminer.examples.sip.web.dto.ProductDTO;
import org.joolzminer.examples.sip.web.dto.utils.MapperHelper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/server/rest/products")
public class ProductResource {
	
	@SuppressWarnings("unused")
	private static final Logger LOGGER = LoggerFactory.getLogger(ProductResource.class);
	
	@Autowired
	private ProductService productService;
	
	@Autowired
	private MapperHelper mapperHelper;
	
	@RequestMapping(method = RequestMethod.GET, produces = MediaType.APPLICATION_JSON_VALUE)
	public List<ProductDTO> getProducts() {
		return mapperHelper.fromProducts(productService.getProducts());
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
	public void deleteProduct(@PathVariable("id") Long id) {
		productService.deleteProduct(id);
	}
	
	@RequestMapping(method = RequestMethod.POST)
	public ProductDTO createProduct(@RequestBody ProductDTO productDTO) {
		return mapperHelper.fromProduct(productService.createProduct(mapperHelper.toProduct(productDTO)));
	}
	
	@RequestMapping(value = "/{id}", method = RequestMethod.PUT, produces = MediaType.APPLICATION_JSON_VALUE)
	public ProductDTO updateProduct(@PathVariable("id") Long id, @RequestBody ProductDTO productDTO) {
		return mapperHelper.fromProduct(productService.updateProduct(mapperHelper.toProduct(productDTO)));
	}
}


