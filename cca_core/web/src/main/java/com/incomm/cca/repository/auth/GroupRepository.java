package com.incomm.cca.repository.auth;

import com.incomm.cca.model.domain.auth.Group;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface GroupRepository extends JpaRepository<Group, Long> {

    @Query("from Group g where g.systemName = 'SYSTEM_ADMINISTRATION'")
    Group findSystemAdministration();

    @Query("from Group g where g.systemName = :systemName or g.displayName = :displayName")
    Group findOneBySystemNameOrDisplayName(@Param("systemName") String systemName, @Param("displayName") String displayName);

    @Query("select distinct g from Group g left join g.permissions p where p.id = :permissionId order by g.displayName")
    List<Group> findAllByPermission(@Param("permissionId") Long permissionId);

    Group findOneByDisplayName(String displayName);

    @Query(value = "" +
            "SELECT g.* " +
            "FROM cca_group g " +
            "JOIN cca_group_owner cgo ON cgo.group_id = g.id " +
            "WHERE cgo.user_id = :userId " +
            "AND g.active = 1", nativeQuery = true)
    List<Group> findAllByUser(@Param("userId") Long userId);

    @Query("from Group g join fetch g.roles r join fetch r.permissions p where g.active = true and r.active = true and p.active = true")
    List<Group> findAllActive();

    @Query("from Group g left join fetch g.owners o left join fetch g.roles r left join fetch g.permissions p left join fetch p.category c where g.id = :groupId")
    Group findOneWithFetch(@Param("groupId") Long id);
}
