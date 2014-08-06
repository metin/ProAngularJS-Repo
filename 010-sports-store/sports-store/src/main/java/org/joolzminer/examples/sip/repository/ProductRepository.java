package org.joolzminer.examples.sip.repository;

import java.util.List;

import org.joolzminer.examples.sip.domain.Product;
import org.springframework.data.repository.Repository;

public interface ProductRepository extends Repository<Product, Long> {
	List<Product> findAll();
	Product findOne(Long id); 
}
