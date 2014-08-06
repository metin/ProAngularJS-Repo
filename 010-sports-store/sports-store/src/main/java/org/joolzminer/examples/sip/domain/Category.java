package org.joolzminer.examples.sip.domain;

import javax.persistence.Column;
import javax.persistence.Entity;

import org.springframework.core.style.ToStringCreator;
import org.springframework.util.Assert;

@Entity
public class Category extends AbstractEntity {
	
	@Column(nullable = false, unique = true)
	private String name;
	
	@Column(nullable = false)
	private String description;
	
	protected Category() {		
	}
	
	public Category(String name, String description) {
		Assert.hasText(name, "name must not be null or empty");
		Assert.hasText(description, "description must not be null or empty");
		this.name = name;
		this.description = description;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	@Override
	public String toString() {
		return new ToStringCreator(this)
						.append("id", this.getId())
						.append("name", name)
						.append("description", description)
						.toString();
	}	
}
