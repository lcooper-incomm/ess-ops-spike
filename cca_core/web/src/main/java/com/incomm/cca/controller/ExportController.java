package com.incomm.cca.controller;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.incomm.apls.model.requests.TransactionSearchReq;
import com.incomm.apls.model.support.Transaction;
import com.incomm.cca.exception.ExportException;
import com.incomm.cca.exception.SecurityViolationException;
import com.incomm.cca.model.domain.BulkExportRequest;
import com.incomm.cca.model.enums.ExportFormat;
import com.incomm.cca.model.enums.ManagedPermission;
import com.incomm.cca.model.enums.apls.AplsIdentifier;
import com.incomm.cca.service.ExportService;
import com.incomm.cca.service.SecurityService;
import com.incomm.cca.util.DateUtil;
import com.incomm.cca.util.ValidatedDateRange;
import com.incomm.cca.util.export.enums.HTMLDocumentComponent;
import com.incomm.cca.util.export.enums.HTMLDocumentOption;
import com.incomm.cscore.client.apls.constant.AplsPlatform;
import com.incomm.cscore.client.apls.model.transaction.TransactionHistoryRequestSupport;
import com.incomm.cscore.client.maples.model.response.transaction.TransactionsResponse;
import com.incomm.cscore.logging.CsCoreLogger;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashSet;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Set;

/**
 * Handles all export files.
 */
@RestController
@RequestMapping("/rest/export")
public class ExportController extends RestResponseHandler {

    private static final String INVALID_COMPONENT = "Components are invalid";
    private static final String INVALID_OPTIONS = "Options are invalid";
    private static final String IDENTIFIER_TYPE_ILLEGAL_ARGUMENT = "'identifierType' must be one of 'serialNumber', 'location'";
    private static final String IDENTIFIER_ILLEGAL_ARGUMENT = "'identifier' must be provided";
    private static final String INVALID_SELECTIONS = "Selections should be comma-delimited lists of transaction IDs";

    @Autowired
    private ExportService exportService;
    @Autowired
    private SecurityService securityService;

    @RequestMapping(method = RequestMethod.POST, value = "/maples-transactions", produces = {"application/pdf", "application/octet-stream"})
    public ResponseEntity exportMaplesTransactions(@RequestBody TransactionsResponse request,
                                                   @RequestParam("selectedOptions") String selectedOptionsString) {
        try {
            if (request == null || request.getTransactions() == null || request.getTransactions()
                                                                               .isEmpty()) {
                return badRequest("No transactions to export.");
            }

            Set<HTMLDocumentOption> selectedOptions = validateOptions(selectedOptionsString);
            ExportFormat format = getFormat(selectedOptions);

            if (format == null) {
                return badRequest("No format selected.");
            } else if (format.equals(ExportFormat.CSV) && !securityService.hasPermission(ManagedPermission.EXPORT_CSV)) {
                throw new SecurityViolationException();
            } else if (format.equals(ExportFormat.PDF) && !securityService.hasPermission(ManagedPermission.EXPORT_PDF)) {
                throw new SecurityViolationException();
            } else if (format.equals(ExportFormat.XLSX) && !securityService.hasPermission(ManagedPermission.EXPORT_XLSX)) {
                throw new SecurityViolationException();
            }

            byte[] bytes = exportService.exportMaplesTransactions(request.getTransactions(), selectedOptions, format);

            return exportOk(bytes, "attachment");
        } catch (ExportException e) {
            if (e.getStatus() == HttpStatus.INTERNAL_SERVER_ERROR) {
                CsCoreLogger.error(e.getMessage())
                            .exception(e)
                            .build();
            }
            return badRequest(e.getMessage());
        } catch (Exception e) {
            CsCoreLogger.error("Error exporting transaction history")
                        .exception(e)
                        .build();
            return internalServerError();
        }
    }

    /**
     * The vast number of query params here was not done by choice. In order to trigger a download in the browser, you must use a GET method.
     * As soon as a file server can be stood up, and files can be persisted, this will change to a POST with a nice request object, and we'll
     * add another GET method to actually download a particular file from the file server.
     */
    @GetMapping(value = "/{identifierType}/{identifier}", produces = {"application/pdf", "application/octet-stream"})
    public ResponseEntity export(
            @PathVariable("identifierType") String identifierType,
            @PathVariable("identifier") String identifier,
            @RequestParam(value = "startDate", defaultValue = "") String startDateValue,
            @RequestParam(value = "endDate", defaultValue = "") String endDateValue,
            @RequestParam(value = "currentPages", defaultValue = "0") Integer currentPages,
            @RequestParam(value = "archivePages", defaultValue = "0") Integer archivePages,
            @RequestParam(value = "sortOrder", defaultValue = "DESC") TransactionHistoryRequestSupport.SortOrder sortOrder,
            @RequestParam(value = "platform", defaultValue = "INCOMM") String platform,
            @RequestParam(value = "currentSelections", defaultValue = "") String currentSelectionsString,
            @RequestParam(value = "archiveSelections", defaultValue = "") String archiveSelectionsString,
            @RequestParam("selectedComponents") String selectedComponentsString,
            @RequestParam("selectedOptions") String selectedOptionsString,
            @RequestParam(value = "isBillable", defaultValue = "false") Boolean isBillable,
            @RequestParam(value = "transactionFilter", required = false) String transactionFilter,
            @RequestParam(value = "accountType", required = false) String accountType,
            @RequestParam(value = "token", required = false) String token,
            @RequestParam(value = "panLastFour", required = false) String panLastFour) {

        try {
            //Handle the vast amount of validation we need to do here
            AplsIdentifier aplsIdentifier = validateIdentifierType(identifierType);
            identifier = validateIdentifier(identifier);
            Set<HTMLDocumentComponent> selectedComponents = validateComponents(selectedComponentsString);
            Set<HTMLDocumentOption> selectedOptions = validateOptions(selectedOptionsString);
            ValidatedDateRange dateRange = validateDateRange(startDateValue, endDateValue);
            AplsPlatform aplsPlatform = AplsPlatform.convert(platform);
            TransactionSearchReq currentSelections = validateSelections(currentSelectionsString);
            TransactionSearchReq archiveSelections = validateSelections(archiveSelectionsString);

            ExportFormat format = getFormat(selectedOptions);

            byte[] bytes = null;
            if (currentSelections == null && archiveSelections == null) {
                bytes = exportService.export(aplsIdentifier, identifier, dateRange, currentPages, archivePages, sortOrder, aplsPlatform, isBillable, selectedComponents, selectedOptions, format, transactionFilter, accountType, token, panLastFour);
            } else {
                bytes = exportService.export(aplsIdentifier, identifier, dateRange, currentSelections, archiveSelections, sortOrder, aplsPlatform, selectedComponents, selectedOptions, format, transactionFilter, accountType, token, panLastFour);
            }

            return exportOk(bytes, exportService.getContentDisposition(format));
        } catch (ExportException e) {
            if (e.getStatus() == HttpStatus.INTERNAL_SERVER_ERROR) {
                CsCoreLogger.error(e.getMessage())
                            .exception(e)
                            .build();
            }
            return badRequest(e.getMessage());
        } catch (Exception e) {
            CsCoreLogger.error("Error exporting transaction history")
                        .exception(e)
                        .build();
            return internalServerError();
        }
    }

    @PostMapping(value = "/bulk")
    public ResponseEntity bulkExport(@RequestBody BulkExportRequest request) {
        exportService.bulkExport(request);
        return ok();
    }

    /**
     * Only certain identifierTypes can be used for Export at this time.
     */
    private AplsIdentifier validateIdentifierType(String identifierType) {
        try {
            AplsIdentifier aplsIdentifier = AplsIdentifier.valueOf(identifierType.toUpperCase());
            switch (aplsIdentifier) {
                case LOCATION:
                case PIN:
                case SERIALNUMBER:
                case VAN:
                case CUSTOMERID:
                    return aplsIdentifier;
                case LOCATIONID:
                    return AplsIdentifier.LOCATION;
                default:
                    throw new IllegalArgumentException();
            }
        } catch (IllegalArgumentException e) {
            throw new ExportException(IDENTIFIER_TYPE_ILLEGAL_ARGUMENT, HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * TODO Consider passing the AplsIdentifier in here, and performing more appropriate validation on a case-by-case basis.
     */
    private String validateIdentifier(String identifier) {
        if (StringUtils.isBlank(identifier)) {
            throw new ExportException(IDENTIFIER_ILLEGAL_ARGUMENT, HttpStatus.BAD_REQUEST);
        }
        return identifier;
    }

    /**
     * Ensures that all components specified in the componentsString are valid.
     * TODO Consider passing the AplsIdentifier in, and validating that the requested components can possibly be generated for that AplsIdentifier.
     */
    private Set<HTMLDocumentComponent> validateComponents(String componentsString) {
        try {
            Set<HTMLDocumentComponent> selectedComponents = new LinkedHashSet<>();
            String[] components = componentsString.split(",");
            for (String component : components) {
                selectedComponents.add(HTMLDocumentComponent.valueOf(component.toUpperCase()));
            }
            return selectedComponents;
        } catch (NullPointerException | IllegalArgumentException e) {
            throw new ExportException(INVALID_COMPONENT, HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Ensures that all options specified in the optionsString are valid. Options can only contain one each of Layout or Format options, for example...
     */
    private Set<HTMLDocumentOption> validateOptions(String optionsString) {
        try {
            Set<HTMLDocumentOption> selectedOptions = new HashSet<>();
            String[] options = optionsString.split(",");
            for (String option : options) {
                selectedOptions.add(HTMLDocumentOption.valueOf(option.toUpperCase()));
            }

            //Can only contain one layout option
            if (selectedOptions.contains(HTMLDocumentOption.LAYOUT_LANDSCAPE) && selectedOptions.contains(HTMLDocumentOption.LAYOUT_PORTRAIT)) {
                throw new IllegalArgumentException();
            }
            //Default to portrait if no layout option provided
            else if (!selectedOptions.contains(HTMLDocumentOption.LAYOUT_LANDSCAPE)) {
                selectedOptions.add(HTMLDocumentOption.LAYOUT_PORTRAIT);
            }

            //Can only contain one format option
            int count = 0;
            for (HTMLDocumentOption option : selectedOptions) {
                if (option == HTMLDocumentOption.FORMAT_PDF || option == HTMLDocumentOption.FORMAT_CSV || option == HTMLDocumentOption.FORMAT_XLSX) {
                    count++;
                }
            }
            if (count > 1) {
                throw new IllegalArgumentException();
            }
            //Default to pdf if no format option provided
            else if (!selectedOptions.contains(HTMLDocumentOption.FORMAT_PDF) && !selectedOptions.contains(HTMLDocumentOption.FORMAT_CSV) && !selectedOptions.contains(HTMLDocumentOption.FORMAT_XLSX)) {
                selectedOptions.add(HTMLDocumentOption.FORMAT_PDF);
            }
            return selectedOptions;
        } catch (NullPointerException | IllegalArgumentException e) {
            throw new ExportException(INVALID_OPTIONS, HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Uses the same date range validation as used for history requests, but wrapped in order to contextually handle exceptions.
     */
    private ValidatedDateRange validateDateRange(String startDate, String endDate) {
        try {
            return new ValidatedDateRange(startDate, endDate);
        } catch (DateUtil.DateValidationException e) {
            throw new ExportException(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    /**
     * Parses the JSON array of transaction request objects into usable form.
     */
    private TransactionSearchReq validateSelections(String selectionsString) {
        if (StringUtils.isNotBlank(selectionsString)) {
            try {
                TransactionSearchReq requestDto = new TransactionSearchReq();

                ObjectMapper objectMapper = new ObjectMapper();
                JsonNode arrayNode = objectMapper.readTree(selectionsString);
                List<Transaction> dtos = new ArrayList<>();
                for (JsonNode jsonNode : arrayNode) {
                    Transaction transaction = new Transaction();
                    transaction.setNLogId(jsonNode.get("nLogId")
                                                  .textValue());
                    transaction.setNNodeType(jsonNode.get("nNodeType")
                                                     .textValue());
                    transaction.setNRootNode(jsonNode.get("nRootNode")
                                                     .textValue());
                    dtos.add(transaction);
                }
                requestDto.setTransactions(dtos);
                return requestDto;
            } catch (IOException e) {
                throw new ExportException(INVALID_SELECTIONS, HttpStatus.BAD_REQUEST);
            }
        }
        return null;
    }

    /**
     * Ensures that the format option is valid. Validation for only a single format option is handled in validateOptions().
     */
    private ExportFormat getFormat(Set<HTMLDocumentOption> selectedOptions) {
        if (selectedOptions.contains(HTMLDocumentOption.FORMAT_PDF)) {
            return ExportFormat.PDF;
        } else if (selectedOptions.contains(HTMLDocumentOption.FORMAT_CSV)) {
            return ExportFormat.CSV;
        } else if (selectedOptions.contains(HTMLDocumentOption.FORMAT_XLSX)) {
            return ExportFormat.XLSX;
        }
        throw new ExportException(INVALID_OPTIONS, HttpStatus.BAD_REQUEST);
    }
}
