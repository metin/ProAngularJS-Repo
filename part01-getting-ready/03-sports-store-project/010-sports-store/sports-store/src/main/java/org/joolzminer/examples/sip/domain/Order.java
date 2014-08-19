package org.joolzminer.examples.sip.domain;

import java.math.BigDecimal;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import org.springframework.core.style.ToStringCreator;

@Entity
@Table(name = "custorder")
public class Order extends AbstractEntity {
	private String name;
	private String street;
	private String city;
	private String state;
	private String zip;
	private String country;
	
	@Column(name = "gift")
	private boolean isGift;
	
	@OneToMany(cascade = CascadeType.ALL, orphanRemoval = true)
	@JoinColumn(name = "order_id", nullable = false)
	private Set<LineItem> lineItems = new HashSet<>();
	
	protected Order() {		
	}
	
	public Order(String name, String street, String city, String state, String zip, String country, boolean isGift) {
		this.name = name;
		this.street = street;
		this.city = city;
		this.state = state;
		this.zip = zip;
		this.country = country;
		this.isGift = isGift;
	}
	
	public void add(LineItem lineItem) {
		lineItems.add(lineItem);
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

	public Set<LineItem> getLineItems() {
		return Collections.unmodifiableSet(lineItems);
	}
	
	public BigDecimal getTotal() {
		BigDecimal total = BigDecimal.ZERO;
		
		for (LineItem lineItem : lineItems) {
			total = total.add(lineItem.getTotal());
		}
		return total;
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
				.append("lineItems", lineItems)
				.toString();
	}	
}
