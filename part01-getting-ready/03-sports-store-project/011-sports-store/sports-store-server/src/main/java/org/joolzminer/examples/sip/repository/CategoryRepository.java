package org.joolzminer.examples.sip.repository;

import org.joolzminer.examples.sip.domain.Category;
import org.springframework.data.repository.Repository;

public interface CategoryRepository extends Repository<Category, Long> {
	Category findByName(String name);
}
