package com.incomm.cca.service;

import com.incomm.cca.hazelcast.HazelcastManager;
import com.incomm.cca.hazelcast.event.RefreshDictionaryEvent;
import com.incomm.cca.model.dictionary.BankProductDictionary;
import com.incomm.cca.service.cache.DictionaryCacheService;
import com.incomm.cscore.logging.CsCoreLogger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.criteria.CriteriaBuilder;
import javax.persistence.criteria.CriteriaQuery;
import javax.persistence.criteria.Root;
import java.util.List;

@Service
public class DictionaryService {

    @PersistenceContext
    private EntityManager em;
    @Autowired
    private DictionaryCacheService dictionaryCacheService;
    @Autowired
    private SecurityService securityService;
    @Autowired
    private HazelcastManager hazelcastManager;

    /**
     * Clear the hazelcast map and broadcast any clients to clear their local caches.
     * This should be called when any dictionary is updated.
     *
     * @return
     */
    public void clear() {
        CsCoreLogger.debug("DictionaryService: clear").build();
        securityService.validateIsSystemAdministrator();

        dictionaryCacheService.clear(BankProductDictionary.class);
        hazelcastManager.broadcast(new RefreshDictionaryEvent("dictionary"));
    }

    /**
     * Find all active dictionary entries.
     *
     * @param entityClass
     * @param <E>
     * @return
     */
    public <E> List<E> findAll(Class<E> entityClass) {
        CsCoreLogger.debug("findAll: " + entityClass.getName()).build();
        CriteriaBuilder cb = em.getCriteriaBuilder();
        CriteriaQuery<E> cq = cb.createQuery(entityClass);
        Root<E> root = cq.from(entityClass);
        CriteriaQuery<E> all = cq.select(root);
        return em.createQuery(all).getResultList();
    }

    /**
     * Find a specific dictionary for the class and id.
     *
     * @param entityClass
     * @param id
     * @param <E>
     * @return
     */
    public <E> E find(Class<E> entityClass, Long id) {
        CsCoreLogger.debug("find: " + entityClass.getName() + ": " + id).build();
        return em.find(entityClass, id);
    }
}
