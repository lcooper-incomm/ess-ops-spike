package com.incomm.cca.repository.session;

import com.incomm.cca.model.domain.session.WorkspaceSession;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface WorkspaceSessionRepository extends JpaRepository<WorkspaceSession, Long> {

	@EntityGraph(attributePaths = {"selections", "callComponent", "queue", "user"})
	Page<WorkspaceSession> findTop50ByUserIdAndStatusNotInOrderByIdDesc(Long userId, List<String> statuses, Pageable pageable);
}
