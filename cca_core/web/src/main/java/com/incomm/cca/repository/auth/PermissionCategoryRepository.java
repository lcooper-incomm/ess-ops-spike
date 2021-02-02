package com.incomm.cca.repository.auth;

import com.incomm.cca.model.domain.auth.PermissionCategory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PermissionCategoryRepository extends JpaRepository<PermissionCategory, Long> {

    @Query("select distinct pc from PermissionCategory pc full join fetch pc.permissions order by pc.displayName")
    List<PermissionCategory> findAllWithFetch();

    @Query("from PermissionCategory pc where pc.systemName = :systemName or pc.displayName = :displayName")
    PermissionCategory findOneBySystemNameOrDisplayName(@Param("systemName") String systemName, @Param("displayName") String displayName);

    PermissionCategory findOneByDisplayName(String displayName);

    PermissionCategory findOneBySystemName(String systemName);

    @Query("from PermissionCategory pc where pc.systemName = 'UNCATEGORIZED'")
    PermissionCategory findUncategorized();

}
