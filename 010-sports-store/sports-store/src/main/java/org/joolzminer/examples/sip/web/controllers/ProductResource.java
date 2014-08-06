package org.joolzminer.examples.sip.web.controllers;

import java.util.List;

import org.joolzminer.examples.sip.services.ProductService;
import org.joolzminer.examples.sip.web.dto.ProductDTO;
import org.joolzminer.examples.sip.web.dto.utils.MapperHelper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/backendapp/products")
public class ProductResource {
	
	@SuppressWarnings("unused")
	private static final Logger LOGGER = LoggerFactory.getLogger(ProductResource.class);
	
	@Autowired
	private ProductService productService;
	
	@Autowired
	private MapperHelper mapperHelper;
	
	@RequestMapping(method = RequestMethod.GET, produces = "application/json")
	public List<ProductDTO> processOrder() {
		return mapperHelper.fromProducts(productService.getProducts());
	}
}


