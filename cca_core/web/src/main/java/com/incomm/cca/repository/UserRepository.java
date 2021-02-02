package com.incomm.cca.repository;

import com.incomm.cca.model.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {

    @Query("from User u where u.username != 'cca_admin' and u.username != 'system_default_user' order by u.username asc")
    List<User> findAllOrderByUsername();

    User findOneByUsername(String username);

    @Query("select u from User u left join u.groups g where g.id = :groupId and u.username != 'cca_admin' and u.username != 'system_default_user' order by u.username asc")
    List<User> findAllByGroup(@Param("groupId") Long groupId);

    @Query("select u from User u left join u.adminOfRoles r where r.id = :roleId  and u.username != 'cca_admin' and u.username != 'system_default_user' order by u.username asc")
    List<User> findAllRoleAdmins(@Param("roleId") Long roleId);

    @Query("select u from User u left join u.memberOfRoles r where r.id = :roleId and u.username != 'cca_admin' and u.username != 'system_default_user' order by u.username asc")
    List<User> findAllRoleMembers(@Param("roleId") Long roleId);

    @Query("select u from User u where u.username != 'cca_admin' and u.username != 'system_default_user' and (u.username like concat('%', concat(:searchText, '%')) or lower(u.displayName) like concat('%', concat(:searchText, '%')))")
    List<User> search(@Param("searchText") String searchText);

    List<User> findAllByIsMigratedFalseOrderByIdDesc();

    @Query("select u from User u where datediff(day, last_login_date, getDate()) > :idleDays and active = 1")
    List<User> findAllIdleUsers(@Param("idleDays") Long idleDays);

    @Query("select u from User u where datediff(day, last_login_date, getDate()) = :idleDays - :warningDays and active = 1")
    List<User> findAllSoonToBeIdleUsers(@Param("idleDays") Long idleDays, @Param("warningDays") Long warningDays);
}
