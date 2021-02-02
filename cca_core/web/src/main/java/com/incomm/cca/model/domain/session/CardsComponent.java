package com.incomm.cca.model.domain.session;

import com.incomm.cscore.mvcutils.model.CrudEntity;

import javax.persistence.CascadeType;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "card_component")
public class CardsComponent implements Serializable, CrudEntity<Long> {

    private Long id;
    private Session session;
    private List<Card> cards = new ArrayList<>();

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    public Long getId() {
        return id;
    }

    public void setId(final Long id) {
        this.id = id;
    }

    @OneToOne(cascade = {CascadeType.MERGE})
    @JoinColumn(name = "session_id")
    public Session getSession() {
        return session;
    }

    public void setSession(final Session session) {
        this.session = session;
    }

    @OneToMany(mappedBy = "cardsComponent", cascade = {CascadeType.PERSIST, CascadeType.MERGE, CascadeType.REMOVE}, orphanRemoval = true)
    public List<Card> getCards() {
        return cards;
    }

    public void setCards(final List<Card> cards) {
        this.cards = cards;
    }

    @Override
    public void validate() throws IllegalArgumentException {
        if (this.session == null) {
            throw new IllegalArgumentException("CardsComponent must be associated to a Session");
        }
    }
}
