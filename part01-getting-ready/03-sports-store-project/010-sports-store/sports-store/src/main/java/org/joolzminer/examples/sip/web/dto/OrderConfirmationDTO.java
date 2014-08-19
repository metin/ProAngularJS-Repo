package org.joolzminer.examples.sip.web.dto;

import java.io.Serializable;

import org.springframework.core.style.ToStringCreator;


@SuppressWarnings("serial")
public class OrderConfirmationDTO implements Serializable {
	private Long id;
	
	public OrderConfirmationDTO() {		
	}
	
	public OrderConfirmationDTO(Long id) {
		this.id = id;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	@Override
	public String toString() {
		return new ToStringCreator(this)
					.append("id", id)
					.toString();
	}
	
}
