package org.joolzminer.examples.sip.domain;

import java.math.BigDecimal;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;

import org.springframework.core.style.ToStringCreator;
import org.springframework.util.Assert;

@Entity(name = "lineitem")
public class LineItem extends AbstractEntity {
	@ManyToOne
	@JoinColumn(name = "product_id", nullable = false)
	private Product product;
	
	@Column(nullable = false, name="unit_price")
	private BigDecimal unitPrice;
	
	private int count;
	
	public LineItem() {		
	}
	
	public LineItem(Product product) {
		this(product, 1);
	}
	
	public LineItem(Product product, int count) {
		Assert.notNull(product, "The given Product cannot be null");
		Assert.isTrue(count > 0, "The count of Products to be bought must be greater than zero");
		
		this.product = product;
		this.count = count;
		this.unitPrice = product.getPrice();
	}

	public Product getProduct() {
		return product;
	}

	public BigDecimal getUnitPrice() {
		return unitPrice;
	}

	public int getCount() {
		return count;
	}
	
	public BigDecimal getTotal() {
		return unitPrice.multiply(BigDecimal.valueOf(count));
	}

	@Override
	public String toString() {
		return new ToStringCreator(this)
						.append("product", product)
						.append("price", unitPrice)
						.append("count", count)
						.append("total", getTotal())
						.toString();
	}		
}
