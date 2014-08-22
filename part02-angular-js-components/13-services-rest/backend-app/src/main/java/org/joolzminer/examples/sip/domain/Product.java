package org.joolzminer.examples.sip.domain;

import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import org.springframework.core.style.ToStringCreator;
import org.springframework.util.Assert;

@Entity
public class Product extends AbstractEntity {

	@Column(nullable = false)
	private String category;
		
	@Column(nullable = false, unique = true)
	private String name;
	
	@Column(nullable = false)
	private BigDecimal price;
	
	protected Product() {		
	}
	
	public Product(String category, String name, BigDecimal price) {
		Assert.notNull(category, "Category cannot be null");
		Assert.hasText(name, "Name cannot be null or empty");
		Assert.isTrue(BigDecimal.ZERO.compareTo(price) < 0, "Product Price must be greater than zero");
		
		this.category = category;
		this.name = name;
		this.price = price;
	}

	public Product(Long id, Product product) {
		this(product.category, product.name, product.price);
		this.setId(id);
	}
	
	public String getCategory() {
		return category;
	}

	public String getName() {
		return name;
	}

	public BigDecimal getPrice() {
		return price;
	}

	@Override
	public String toString() {
		return new ToStringCreator(this)
				.append("category", category)
				.append("name", name)
				.append("price", price)
				.toString();
	}	
}
