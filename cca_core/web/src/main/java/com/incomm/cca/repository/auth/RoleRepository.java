package com.incomm.cca.repository.auth;

import com.incomm.cca.model.domain.auth.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface RoleRepository extends JpaRepository<Role, Long> {

    @Query("select distinct r from Role r left join r.permissions p where r.group.id = :groupId order by r.displayName")
    List<Role> findAllByGroup(@Param("groupId") Long groupId);

    @Query("select distinct r from Role r left join r.permissions p where p.id = :permissionId order by r.displayName")
    List<Role> findAllByPermission(@Param("permissionId") Long permissionId);

    @Query("select distinct r from Role r left join r.permissions p left join r.admins ra left join r.group.owners go where p.id = :permissionId and (ra.id = :userId or go.id = :userId) order by r.displayName")
    List<Role> findAllByPermissionForRoleAdmin(@Param("permissionId") Long permissionId, @Param("userId") Long userId);

    @Query("select distinct r from Role r left join r.group.permissions gp left join r.group.owners go left join r.admins ra where gp.id = :permissionId and (ra.id = :userId or go.id = :userId) order by r.displayName")
    List<Role> findAllAssignableByPermissionForRoleAdmin(@Param("permissionId") Long permissionId, @Param("userId") Long userId);

    @Query("from Role r where r.systemName = :systemName or r.displayName = :displayName")
    Role findOneBySystemNameOrDisplayName(@Param("systemName") String systemName, @Param("displayName") String displayName);

    Role findOneByDisplayName(String displayName);

    Role findOneBySystemName(String systemName);

    @Query(value = "" +
            "SELECT DISTINCT r.* " +
            "FROM cca_role r " +
            "JOIN cca_role_admin cra ON cra.role_id = r.id " +
            "WHERE cra.user_id = :userId AND r.active = 1", nativeQuery = true)
    List<Role> findAllByRoleAdmin(@Param("userId") Long userId);

    @Query(value = "" +
            "SELECT DISTINCT r.* " +
            "FROM cca_role r " +
            "JOIN cca_group g ON g.id = r.group_id " +
            "JOIN cca_group_owner cgo ON cgo.group_id = g.id " +
            "WHERE cgo.user_id = :userId " +
            "AND g.active = 1", nativeQuery = true)
    List<Role> findAllByGroupOwner(@Param("userId") Long userId);

    @Query(value = "" +
            "SELECT r.* " +
            "FROM cca_role r " +
            "JOIN cca_role_member crm ON crm.role_id = r.id " +
            "WHERE crm.user_id = :userId " +
            "AND r.active = 1", nativeQuery = true)
    List<Role> findAllByRoleMember(@Param("userId") Long userId);
}
