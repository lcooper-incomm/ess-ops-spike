package com.incomm.cca.repository;

import com.incomm.cca.model.domain.Identifier;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface IdentifierRepository extends JpaRepository<Identifier, Long> {

    Identifier findOneByIdentifierTypeAndValueAndPlatform(String identifierType, String identifier, String platform);

    Identifier findOneByIdentifierTypeAndValueAndPlatformAndPartner(String identifierType, String identifier, String platform, String partner);

    @Query(value = "SELECT TOP 1 * " +
            "FROM identifier " +
            "WHERE identifier_type = 'LOCATIONID' " +
            "AND platform = 'INCOMM' " +
            "ORDER BY id DESC", nativeQuery = true)
    Identifier findNextLegacyLocationIdentifier();
}
