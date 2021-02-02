package com.incomm.cca.repository.session;

import com.incomm.cca.model.domain.session.Document;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DocumentRepository extends JpaRepository<Document, Long> {

}
