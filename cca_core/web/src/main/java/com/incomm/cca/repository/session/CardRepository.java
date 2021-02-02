package com.incomm.cca.repository.session;

import com.incomm.cca.model.domain.session.Card;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CardRepository extends JpaRepository<Card, Long> {

    Card findOneByCardsComponentIdAndCardSetAndCardType(Long id, Integer cardSet, String cardType);
}
