package org.joolzminer.examples.sip.web.dto;

import java.io.Serializable;
import java.math.BigDecimal;

import org.springframework.core.style.ToStringCreator;

@SuppressWarnings("serial")
public class LineItemDTO implements Serializable {
	private int count;
	private Long id;
	private String name;
	private BigDecimal price;
	
	public LineItemDTO() {		
	}
	
	public LineItemDTO(int count, Long id, String name, BigDecimal price) {
		this.count = count;
		this.id = id;
		this.name = name;
		this.price = price;
	}

	public int getCount() {
		return count;
	}

	public void setCount(int count) {
		this.count = count;
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

	public BigDecimal getPrice() {
		return price;
	}

	public void setPrice(BigDecimal price) {
		this.price = price;
	}

	@Override
	public String toString() {
		return new ToStringCreator(this)
					.append("count", count)
					.append("id", id)
					.append("name", name)
					.append("price", price)
					.toString();
	}	
}
