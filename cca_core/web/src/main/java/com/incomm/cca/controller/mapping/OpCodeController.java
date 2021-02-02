package com.incomm.cca.controller.mapping;

import com.incomm.cca.controller.RestResponseHandler;
import com.incomm.cca.model.domain.mapping.OpCode;
import com.incomm.cca.model.view.mapping.OpCodeMappingView;
import com.incomm.cca.service.mapping.DataMappingService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/rest/opcode")
public class OpCodeController extends RestResponseHandler {

    @Autowired
    private DataMappingService opCodeService;

    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity findAll() {
        List<OpCode> opCodes = opCodeService.findAllOpCodes();
        return ok(opCodes.stream()
                         .map(OpCodeMappingView::new)
                         .collect(Collectors.toList()));
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity createOpCode(@RequestBody OpCode request) {
        OpCode opCode = opCodeService.createOpCode(request);
        return ok(new OpCodeMappingView(opCode));
    }

    @RequestMapping(value = "/{id}", method = RequestMethod.DELETE)
    @ResponseStatus(HttpStatus.NO_CONTENT)
    public void deleteOne(@PathVariable("id") Long id) {
        opCodeService.deleteOneOpCode(id);
    }

    @RequestMapping(method = RequestMethod.PUT, value = "/{id}")
    public ResponseEntity updateOpCode(@PathVariable("id") Long id, @RequestBody OpCode request) {
        OpCode opCode = opCodeService.updateOpCode(request);
        return ok(new OpCodeMappingView(opCode));
    }
}
