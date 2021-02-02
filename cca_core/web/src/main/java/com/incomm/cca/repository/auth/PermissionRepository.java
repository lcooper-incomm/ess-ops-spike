package com.incomm.cca.repository.auth;

import com.incomm.cca.model.domain.auth.Permission;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PermissionRepository extends JpaRepository<Permission, Long> {

    @Query("from Permission p join fetch p.category c where p.active = true")
    List<Permission> findAllByActiveTrue();

    @Query("from Permission p join fetch p.category c where c.id = :categoryId")
    List<Permission> findAllByCategoryId(@Param("categoryId") Long categoryId);

    @Query("select p from Permission p left join p.groups g where g.id = :groupId order by p.displayName")
    List<Permission> findAllByGroup(@Param("groupId") Long groupId);

    @Query("select p from Permission p left join p.roles r where r.id = :roleId order by p.displayName")
    List<Permission> findAllByRole(@Param("roleId") Long roleId);

    @Query("from Permission p where p.systemName = :systemName or p.displayName = :displayName")
    Permission findOneBySystemNameOrDisplayName(@Param("systemName") String systemName, @Param("displayName") String displayName);

    Permission findOneByDisplayName(String displayName);

    Permission findOneBySystemName(String systemName);

    @Query(value = "SELECT TOP 1 results.* " +
            "FROM (" +
            "SELECT p.* " +
            "FROM permission p " +
            "  LEFT JOIN cca_role_permission rp on rp.permission_id = p.id " +
            "  LEFT JOIN cca_role_member rm on rm.role_id = rp.role_id " +
            "  LEFT JOIN cca_role r on r.id = rm.role_id " +
            "WHERE rm.user_id = :userId " +
            "      AND p.active = 1 " +
            "      AND r.active = 1 " +
            "      AND p.system_name = :permissionName" +
            ") AS results " +
            "ORDER BY display_name ASC", nativeQuery = true)
    Permission findActivePermissionForUser(@Param("permissionName") String permissionName, @Param("userId") Long userId);

    @Query(value = "SELECT TOP 1 results.* " +
            "FROM (" +
            "SELECT p.* " +
            "FROM permission p " +
            "  LEFT JOIN cca_role_permission rp on rp.permission_id = p.id " +
            "  LEFT JOIN cca_role_member rm on rm.role_id = rp.role_id " +
            "  LEFT JOIN cca_role r on r.id = rm.role_id " +
            "WHERE rm.user_id = :userId " +
            "      AND p.active = 1 " +
            "      AND r.active = 1 " +
            "      AND p.system_name LIKE 'ADJUST_BALANCE_LEVEL_%'" +
            ") AS results " +
            "ORDER BY system_name DESC ", nativeQuery = true)
    Permission findHighestBalanceAdjustmentPermissionForUser(@Param("userId") Long userId);

    @Query(value = "" +
            "SELECT DISTINCT p.* " +
            "FROM permission p " +
            "  JOIN cca_role_permission crp ON crp.permission_id = p.id " +
            "  JOIN cca_role_member crm ON crm.role_id = crp.role_id " +
            "  JOIN cca_role r ON r.id = crm.role_id " +
            "WHERE crm.user_id = :userId " +
            "   AND r.active = 1 " +
            "   AND p.active = 1", nativeQuery = true)
    List<Permission> findAllFromRolesForUser(@Param("userId") Long userId);
}
