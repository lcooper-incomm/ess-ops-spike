package com.incomm.cca.repository;

import com.incomm.cca.model.domain.Team;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface TeamRepository extends JpaRepository<Team, Long> {

    List<Team> findAllByMembersId(Long memberId);

    Team findOneBySystemName(String systemName);
}
