package com.incomm.cca.repository;

import com.incomm.cca.model.domain.Partner;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PartnerRepository extends JpaRepository<Partner, Long> {

    Partner findOneByNameAndPlatformIgnoreCase(String name, String platform);

    Partner findOneByTypeAndPlatformIgnoreCase(String type, String platform);

    @Query(value = "SELECT * FROM partner WHERE LOWER(ivr_dnis) LIKE %:dnis%", nativeQuery = true)
    Partner findOneByDnis(@Param("dnis") String dnis);

    @Query(value = "SELECT par.* " +
            "FROM partner par JOIN ( " +
            "  SELECT p.* " +
            "   FROM permission p " +
            "     LEFT JOIN cca_role_permission rp ON rp.permission_id = p.id " +
            "     LEFT JOIN cca_role_member rm ON rm.role_id = rp.role_id " +
            "     LEFT JOIN cca_role r ON r.id = rm.role_id " +
            "   WHERE rm.user_id = :userId " +
            "     AND p.active = 1 " +
            "     AND r.active = 1 " +
            "     AND p.system_name LIKE 'PARTNER_PERMISSION%' " +
            ") AS PERMISSIONS " +
            "ON PERMISSIONS.id = par.permission_id", nativeQuery = true)
    List<Partner> findAllGrantedToUser(@Param("userId") Long userId);

    @Query("from Partner p join fetch p.permission")
    List<Partner> findAll();
}
