package com.incomm.cca.controller;

import com.incomm.cca.model.dictionary.DictionaryEntity;
import com.incomm.cca.service.DictionaryService;
import com.incomm.cca.service.cache.DictionaryCacheService;
import com.incomm.cscore.logging.CsCoreLogger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

/**
 * Controller for dictionaries.  A dictionary can be any table/entity.  These should serialize in to json with
 * at least value and displayValue properties.
 */
@RestController
@RequestMapping("/rest/dictionary")
public class DictionaryController extends RestResponseHandler {

    @Autowired
    private DictionaryCacheService dictionaryCacheService;
    @Autowired
    private DictionaryService dictionaryService;

    /**
     * Clear the hazelcast map and broadcast any clients to clear their local caches.
     *
     * @return
     */
    @PostMapping("/refresh")
    public ResponseEntity refresh() {
        try {
            dictionaryService.clear();
        } catch (Exception e) {
            CsCoreLogger.error("Failed to notify client of refreshed Dictionary")
                        .exception(e)
                        .build();
        }

        return noContent();
    }

    /**
     * Return all entries for the specified dictionary class.
     *
     * @param className
     * @return
     */
    @GetMapping(value = "/{entityClass}")
    public ResponseEntity findAll(@PathVariable("entityClass") String className) {
        try {
            List<? extends DictionaryEntity> list = (List<? extends DictionaryEntity>) dictionaryCacheService.getAll(Class.forName(className));
            if (list.isEmpty()) {
                list = (List) dictionaryService.findAll(Class.forName(className));
                list.forEach(item -> this.dictionaryCacheService.put(item.getId(), item));
            }
            return ok(
                list.stream()
                    .filter(dictionary -> dictionary.getIsActive())
                    .collect(Collectors.toList())
            );
        } catch (Exception e) {
            CsCoreLogger.error("DictionaryController Error findAll")
                        .exception(e)
                        .build();
            return badRequest("Bad Dictionary class name");
        }
    }

    /**
     * Return the matching dictionary given the dictionary class and id.
     *
     * @param className
     * @param id
     * @return
     */
    @GetMapping(value = "/{entityClass}/{id}")
    public ResponseEntity find(@PathVariable("entityClass") String className, @PathVariable("id") Long id) {
        try {
            DictionaryEntity item = (DictionaryEntity) dictionaryCacheService.get(Class.forName(className), id);
            if (item == null) {
                item = (DictionaryEntity) dictionaryService.find(Class.forName(className), id);
                this.dictionaryCacheService.put(item.getId(), item);
            }
            return ok(item);
        } catch (Exception e) {
            CsCoreLogger.error("DictionaryController Error find")
                        .exception(e)
                        .build();
            return badRequest("Bad Dictionary class name");
        }
    }
}
