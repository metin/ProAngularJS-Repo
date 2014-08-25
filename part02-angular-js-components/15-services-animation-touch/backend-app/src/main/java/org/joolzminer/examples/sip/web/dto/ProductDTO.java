package org.joolzminer.examples.sip.web.dto;

import java.io.Serializable;
import java.math.BigDecimal;

import org.springframework.core.style.ToStringCreator;

@SuppressWarnings("serial")
public class ProductDTO implements Serializable {
	private Long id;
	private String name;
	private String category;
	private BigDecimal price;
	
	
	public ProductDTO() {		
	}
	
	public ProductDTO(Long id, String name, String category, BigDecimal price) {
		this.id = id;
		this.name = name;
		this.category = category;
		this.price = price;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public BigDecimal getPrice() {
		return price;
	}

	public void setPrice(BigDecimal price) {
		this.price = price;
	}

	@Override
	public String toString() {
		return new ToStringCreator(this)
					.append("id", id)					
					.append("name", name)
					.append("category", category)
					.append("price", price)					
					.toString();					
	}
}
