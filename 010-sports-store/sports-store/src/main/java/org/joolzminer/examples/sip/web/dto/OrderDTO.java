package org.joolzminer.examples.sip.web.dto;

import java.io.Serializable;
import java.util.Collections;
import java.util.List;

import org.springframework.core.style.ToStringCreator;

import com.fasterxml.jackson.annotation.JsonProperty;

@SuppressWarnings("serial")
public class OrderDTO implements Serializable {
	private String name;
	private String street;
	private String city;
	private String state;
	private String zip;
	private String country;
	@JsonProperty("giftwrap") private boolean isGift;
	@JsonProperty("products") private List<LineItemDTO> lineItemDTOs;
	
	
	public OrderDTO() {		
	}
	
	public OrderDTO(String name, String street, String city, String state, String zip, String country, List<LineItemDTO> lineItemDTOs) {
		this.name = name;
		this.street = street;
		this.city = city;
		this.state = state;
		this.zip = zip;
		this.country = country;
		this.lineItemDTOs = lineItemDTOs;
	}

	public String getName() {
		return name;
	}

	public String getStreet() {
		return street;
	}

	public String getCity() {
		return city;
	}
	
	public String getState() {
		return state;
	}

	public String getZip() {
		return zip;
	}

	public String getCountry() {
		return country;
	}
	
	public boolean isGift() {
		return isGift;
	}

	public void setGift(boolean isGift) {
		this.isGift = isGift;
	}

	public List<LineItemDTO> getLineItemDTOs() {
		return Collections.unmodifiableList(lineItemDTOs);
	}

	@Override
	public String toString() {
		return new ToStringCreator(this)
					.append("name", name)
					.append("street", street)
					.append("city", city)
					.append("state", state)
					.append("zip", zip)
					.append("country", country)
					.append("isGift", isGift)
					.append("lineItemDTOs", lineItemDTOs)
					.toString();					
	}	
}
