package org.joolzminer.examples.sip.web.dto;

import java.io.Serializable;
import java.math.BigDecimal;

import org.springframework.core.style.ToStringCreator;

@SuppressWarnings("serial")
public class ProductDTO implements Serializable {
	private Long id;
	private String name;
	private String category;
	private String description;
	private BigDecimal price;
	
	
	public ProductDTO() {		
	}
	
	public ProductDTO(Long id, String name, String category, String description, BigDecimal price) {
		this.id = id;
		this.name = name;
		this.category = category;
		this.description = description;
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

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
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
					.append("description", description)
					.append("category", category)
					.append("price", price)					
					.toString();					
	}
}
