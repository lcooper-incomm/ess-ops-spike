package com.incomm.cca.repository.search;

import com.incomm.cca.model.domain.search.SearchType;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface SearchTypeRepository extends JpaRepository<SearchType, Long> {

    List<SearchType> findAllByOrderByNameAsc();
}
