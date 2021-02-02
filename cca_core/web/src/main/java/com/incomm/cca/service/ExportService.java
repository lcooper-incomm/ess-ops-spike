package com.incomm.cca.service;

import com.incomm.apls.model.requests.AplsRequestLocation;
import com.incomm.apls.model.requests.TransactionSearchReq;
import com.incomm.apls.model.support.Transaction;
import com.incomm.cca.exception.EncryptionException;
import com.incomm.cca.exception.ExportException;
import com.incomm.cca.exception.NotFoundException;
import com.incomm.cca.exception.SecurityViolationException;
import com.incomm.cca.model.domain.BulkExportRequest;
import com.incomm.cca.model.domain.User;
import com.incomm.cca.model.enums.ExportFormat;
import com.incomm.cca.model.enums.ManagedPermission;
import com.incomm.cca.model.enums.apls.AplsIdentifier;
import com.incomm.cca.model.view.transaction.TransactionSearchRequestView;
import com.incomm.cca.service.apls.AplsCardService;
import com.incomm.cca.service.apls.AplsCustomerService;
import com.incomm.cca.service.apls.AplsNodeService;
import com.incomm.cca.service.apls.AplsTransactionService;
import com.incomm.cca.util.Base64ImgReplacedElementFactory;
import com.incomm.cca.util.BulkExportService;
import com.incomm.cca.util.GreencardPanEncryptionUtil;
import com.incomm.cca.util.ValidatedDateRange;
import com.incomm.cca.util.export.builders.csv.CsvRecordBuilder;
import com.incomm.cca.util.export.builders.csv.LocationHistoryCsvRecordBuilder;
import com.incomm.cca.util.export.builders.csv.ProductHistoryCsvRecordBuilder;
import com.incomm.cca.util.export.builders.csv.VMSTransactionHistoryCsvRecordBuilder;
import com.incomm.cca.util.export.builders.pdf.FooterElementBuilder;
import com.incomm.cca.util.export.builders.pdf.GreencardProductDetailsElementBuilder;
import com.incomm.cca.util.export.builders.pdf.GreencardProductHeaderElementBuilder;
import com.incomm.cca.util.export.builders.pdf.GreencardProductHistoryDetailsElementBuilder;
import com.incomm.cca.util.export.builders.pdf.HTMLDocumentBuilder;
import com.incomm.cca.util.export.builders.pdf.LocationDetailsElementBuilder;
import com.incomm.cca.util.export.builders.pdf.LocationHeaderElementBuilder;
import com.incomm.cca.util.export.builders.pdf.LocationHistoryDetailsElementBuilder;
import com.incomm.cca.util.export.builders.pdf.ProductDetailsElementBuilder;
import com.incomm.cca.util.export.builders.pdf.ProductHeaderElementBuilder;
import com.incomm.cca.util.export.builders.pdf.ProductHistoryDetailsElementBuilder;
import com.incomm.cca.util.export.builders.pdf.TerminalsElementBuilder;
import com.incomm.cca.util.export.builders.pdf.TransactionSummaryElementBuilder;
import com.incomm.cca.util.export.builders.table.TableDataBuilder;
import com.incomm.cca.util.export.builders.table.TransactionHistoryTableData;
import com.incomm.cca.util.export.builders.xlsx.sheetbuilders.AccountHistorySheetBuilder;
import com.incomm.cca.util.export.builders.xlsx.sheetbuilders.AccountHolderSheetBuilder;
import com.incomm.cca.util.export.builders.xlsx.sheetbuilders.CustomerSheetBuilder;
import com.incomm.cca.util.export.builders.xlsx.sheetbuilders.LocationSheetBuilder;
import com.incomm.cca.util.export.builders.xlsx.sheetbuilders.ProductSheetBuilder;
import com.incomm.cca.util.export.builders.xlsx.sheetbuilders.TerminalsSheetBuilder;
import com.incomm.cca.util.export.builders.xlsx.sheetbuilders.TransactionHistorySheetBuilder;
import com.incomm.cca.util.export.enums.HTMLDocumentComponent;
import com.incomm.cca.util.export.enums.HTMLDocumentOption;
import com.incomm.cscore.client.apls.constant.AplsPlatform;
import com.incomm.cscore.client.apls.model.card.EnhancedCard;
import com.incomm.cscore.client.apls.model.card.EnhancedCardAccountHistory;
import com.incomm.cscore.client.apls.model.card.EnhancedCards;
import com.incomm.cscore.client.apls.model.customer.EnhancedCustomer;
import com.incomm.cscore.client.apls.model.node.EnhancedHierarchies;
import com.incomm.cscore.client.apls.model.node.EnhancedHierarchy;
import com.incomm.cscore.client.apls.model.node.EnhancedLocation;
import com.incomm.cscore.client.apls.model.node.EnhancedLocations;
import com.incomm.cscore.client.apls.model.node.EnhancedTerminal;
import com.incomm.cscore.client.apls.model.shared.constant.CodeType;
import com.incomm.cscore.client.apls.model.transaction.EnhancedTransaction;
import com.incomm.cscore.client.apls.model.transaction.EnhancedTransactions;
import com.incomm.cscore.client.apls.model.transaction.TransactionHistoryRequestSupport;
import com.incomm.cscore.logging.CsCoreLogger;
import com.incomm.minion.model.scheduler.Job;
import com.incomm.minion.model.scheduler.Owner;
import org.apache.commons.csv.CSVFormat;
import org.apache.commons.csv.CSVPrinter;
import org.apache.commons.csv.QuoteMode;
import org.apache.commons.lang3.StringUtils;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.xhtmlrenderer.layout.SharedContext;
import org.xhtmlrenderer.pdf.ITextRenderer;

import java.io.ByteArrayOutputStream;
import java.io.StringWriter;
import java.nio.charset.StandardCharsets;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Set;

@Service
public class ExportService {

    private static final String ERROR_GET_LOCATION = "An error occurred retrieving the location for export";
    private static final String ERROR_GET_HIERARCHY = "An error occurred retrieving the hierarchy for export";
    private static final String ERROR_GET_TERMINALS = "An error occurred retrieving the terminals for export";
    private static final String ERROR_GET_PRODUCT = "An error occurred retrieving the product for export";
    private static final String ERROR_GET_CUSTOMER = "An error occurred retrieving the customer for export";
    private static final String ERROR_GET_TRANSACTIONS = "An error occurred retrieving the transactions for export";
    private static final String ERROR_UNSUPPORTED_IDENTIFIER_TYPE = "The identifierType is not currently supported for export";
    private static final String ERROR_UNSUPPORTED_FORMAT = "The file format is not currently supported for export";
    private static final String ERROR_GENERATING_EXPORT_FILE = "An error occurred generating the file for export";
    @Autowired
    private AplsCardService cardService;
    @Autowired
    private AplsNodeService nodeService;
    @Autowired
    private AplsTransactionService transactionService;
    @Autowired
    private AplsCustomerService customerService;
    @Autowired
    private UserService userService;
    @Autowired
    private SecurityService securityService;
    @Autowired
    private MinionService minionService;
    @Autowired
    private RequestService requestService;
    @Autowired
    private BulkExportService bulkExportService;

    public byte[] exportMaplesTransactions(List<com.incomm.cscore.client.maples.model.response.transaction.Transaction> transactions, Set<HTMLDocumentOption> options, ExportFormat format) {
        byte[] bytes = null;

        if (options.contains(HTMLDocumentOption.FORMAT_CSV)) {
            bytes = generateCsv(transactions, new TableDataBuilder(TransactionHistoryTableData.transactionHistoryData));
        } else if (options.contains(HTMLDocumentOption.FORMAT_XLSX)) {
            bytes = generateXlsx(transactions, new TableDataBuilder(TransactionHistoryTableData.transactionHistoryData));
        } else {
            throw new ExportException(ERROR_UNSUPPORTED_FORMAT, HttpStatus.BAD_REQUEST);
        }

        return bytes;
    }

    public void bulkExport(BulkExportRequest request) {
        try {
            if (!securityService.hasPermission(ManagedPermission.BULK_PRODUCT_EXPORT)) {
                throw new SecurityViolationException();
            }

            User user = request.getUser() != null ? request.getUser() : userService.currentPersistentUser();
            Owner owner = user.toMinionOwner();
            request.setOwner(owner);

            Job job = bulkExportService.convertToJob(request);
            job.setIpAddress(requestService.getIpAddress());
            job.setOwner(owner);

            request.setComment("CCA Initiated Request");

            minionService.scheduleJob(job);
        } catch (SecurityViolationException e) {
            CsCoreLogger.warn("Unauthorized attempt to request bulk export")
                        .json("request", request)
                        .build();
            throw e;
        } catch (Exception e) {
            CsCoreLogger.error("Failed to request bulk export")
                        .json("request", request)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    /**
     * Export method for date range.
     */
    public byte[] export(AplsIdentifier identifierType, String identifier, ValidatedDateRange dateRange, int currentPages, int archivePages, TransactionHistoryRequestSupport.SortOrder sortOrder, AplsPlatform platform, Boolean isBillable, Set<HTMLDocumentComponent> components, Set<HTMLDocumentOption> options, ExportFormat format, String transactionFilter, String accountType, String token, String selectedCardLastFour) {
        byte[] bytes = null;
        switch (identifierType) {
            case LOCATION:
                EnhancedLocation location = buildLocationForExport(identifier, components, options);
                if (location == null) {
                    throw new ExportException("No Location found!", HttpStatus.BAD_REQUEST);
                }
                //Only retrieve transactions if the user asked for the history detail component or is doing CSV export
                if (components.contains(HTMLDocumentComponent.LOCATION_HISTORY_DETAILS) || options.contains(HTMLDocumentOption.FORMAT_CSV)) {
                    location.setTransactions(buildTransactionsForExport(identifierType, identifier, dateRange, currentPages, archivePages, sortOrder, platform, isBillable, transactionFilter, accountType, token));
                }
                //Build export file based on options
                if (options.contains(HTMLDocumentOption.FORMAT_PDF)) {
                    bytes = generatePdf(location, dateRange, components, options);
                } else if (options.contains(HTMLDocumentOption.FORMAT_CSV)) {
                    bytes = generateCsv(location, format);
                } else if (options.contains(HTMLDocumentOption.FORMAT_XLSX)) {
                    bytes = generateXlsx(location);
                } else {
                    throw new ExportException(ERROR_UNSUPPORTED_FORMAT, HttpStatus.BAD_REQUEST);
                }
                break;
            case PIN:
            case SERIALNUMBER:
            case VAN:
                EnhancedCard card = buildProductForExport(identifierType, identifier, platform);
                //Only retrieve transactions if the user asked for the history detail component
                if (components.contains(HTMLDocumentComponent.PRODUCT_HISTORY_DETAILS) || options.contains(HTMLDocumentOption.FORMAT_CSV)) {
                    card.setTransactions(buildTransactionsForExport(identifierType, identifier, dateRange, currentPages, archivePages, sortOrder, platform, isBillable, transactionFilter, accountType, token));
                }
                //Build export file based on options
                if (options.contains(HTMLDocumentOption.FORMAT_PDF)) {
                    bytes = generatePdf(card, dateRange, components, options);
                } else if (options.contains(HTMLDocumentOption.FORMAT_CSV)) {
                    bytes = generateCsv(card, format);
                } else if (options.contains(HTMLDocumentOption.FORMAT_XLSX)) {
                    bytes = generateXlsx(card);
                } else {
                    throw new ExportException(ERROR_UNSUPPORTED_FORMAT, HttpStatus.BAD_REQUEST);
                }
                break;
            case CUSTOMERID:
                EnhancedCustomer customer = getCustomerForExport(identifier);
                if (customer == null) {
                    throw new ExportException("No Customer found!", HttpStatus.BAD_REQUEST);
                }
                List<EnhancedTransaction> transactions = buildTransactionsForExport(identifierType, identifier, dateRange, currentPages, archivePages, sortOrder, platform, isBillable, transactionFilter, accountType, token);
                //Build export file based on options
                if (options.contains(HTMLDocumentOption.FORMAT_PDF)) {
                    // TODO: generate customer PDF
                } else if (options.contains(HTMLDocumentOption.FORMAT_CSV)) {
                    bytes = generateCustomerCsv(customer, transactions, format);
                } else if (options.contains(HTMLDocumentOption.FORMAT_XLSX)) {
                    bytes = generateXlsx(customer, selectedCardLastFour, transactions);
                } else {
                    throw new ExportException(ERROR_UNSUPPORTED_FORMAT, HttpStatus.BAD_REQUEST);
                }
                break;
            default:
                throw new ExportException(ERROR_UNSUPPORTED_IDENTIFIER_TYPE, HttpStatus.BAD_REQUEST);
        }
        return bytes;
    }

    /**
     * Export method for cherry picking.
     */
    public byte[] export(AplsIdentifier identifierType, String identifier, ValidatedDateRange dateRange, TransactionSearchReq currentSelections, TransactionSearchReq archiveSelections, TransactionHistoryRequestSupport.SortOrder sortOrder, AplsPlatform platform, Set<HTMLDocumentComponent> components, Set<HTMLDocumentOption> options, ExportFormat format, String transactionFilter, String accountType, String token, String selectedCardLastFour) {
        byte[] bytes = null;
        switch (identifierType) {
            case LOCATION:
                EnhancedLocation location = buildLocationForExport(identifier, components, options);
                if (location == null) {
                    throw new ExportException("No Location found!", HttpStatus.BAD_REQUEST);
                }
                //Only retrieve transactions if the user asked for the history detail component
                if (components.contains(HTMLDocumentComponent.LOCATION_HISTORY_DETAILS) || options.contains(HTMLDocumentOption.FORMAT_CSV)) {
                    location.setTransactions(buildTransactionsForExport(identifierType, identifier, dateRange, currentSelections, archiveSelections, sortOrder, platform, transactionFilter, accountType, token));
                }
                //Build export file based on options
                if (options.contains(HTMLDocumentOption.FORMAT_PDF)) {
                    bytes = generatePdf(location, dateRange, components, options);
                } else if (options.contains(HTMLDocumentOption.FORMAT_CSV)) {
                    bytes = generateCsv(location, format);
                } else if (options.contains(HTMLDocumentOption.FORMAT_XLSX)) {
                    bytes = generateXlsx(location);
                } else {
                    throw new ExportException(ERROR_UNSUPPORTED_FORMAT, HttpStatus.BAD_REQUEST);
                }
                break;
            case PIN:
            case SERIALNUMBER:
            case VAN:
                EnhancedCard card = buildProductForExport(identifierType, identifier, platform);
                //Only retrieve transactions if the user asked for the history detail component
                if (components.contains(HTMLDocumentComponent.PRODUCT_HISTORY_DETAILS) || options.contains(HTMLDocumentOption.FORMAT_CSV)) {
                    card.setTransactions(buildTransactionsForExport(identifierType, identifier, dateRange, currentSelections, archiveSelections, sortOrder, platform, transactionFilter, accountType, token));
                }
                //Build export file based on options
                if (options.contains(HTMLDocumentOption.FORMAT_PDF)) {
                    bytes = generatePdf(card, dateRange, components, options);
                } else if (options.contains(HTMLDocumentOption.FORMAT_CSV)) {
                    bytes = generateCsv(card, format);
                } else if (options.contains(HTMLDocumentOption.FORMAT_XLSX)) {
                    bytes = generateXlsx(card);
                } else {
                    throw new ExportException(ERROR_UNSUPPORTED_FORMAT, HttpStatus.BAD_REQUEST);
                }
                break;
            case CUSTOMERID:
                EnhancedCustomer customer = getCustomerForExport(identifier);
                if (customer == null) {
                    throw new ExportException("No Customer found!", HttpStatus.BAD_REQUEST);
                }
                List<EnhancedTransaction> transactions = buildTransactionsForExport(identifierType, identifier, dateRange, currentSelections, archiveSelections, sortOrder, platform, transactionFilter, accountType, token);
                //Build export file based on options
                if (options.contains(HTMLDocumentOption.FORMAT_PDF)) {
                    // TODO: generate customer PDF
                } else if (options.contains(HTMLDocumentOption.FORMAT_CSV)) {
                    bytes = generateCustomerCsv(customer, transactions, format);
                } else if (options.contains(HTMLDocumentOption.FORMAT_XLSX)) {
                    bytes = generateXlsx(customer, selectedCardLastFour, transactions);
                } else {
                    throw new ExportException(ERROR_UNSUPPORTED_FORMAT, HttpStatus.BAD_REQUEST);
                }
                break;
            default:
                throw new ExportException(ERROR_UNSUPPORTED_IDENTIFIER_TYPE, HttpStatus.BAD_REQUEST);
        }
        return bytes;
    }

    /**
     * Retrieves location data as well as the location's hierarchy and terminals, when needed.
     */
    private EnhancedLocation buildLocationForExport(String identifier, Set<HTMLDocumentComponent> components, Set<HTMLDocumentOption> options) {
        EnhancedLocation location = getLocationForExport(identifier);
        if (location != null) {
            location.setHierarchy(getHierarchyForExport(identifier));
            //Only load terminals if the user requested the terminals component
            if (components.contains(HTMLDocumentComponent.TERMINAL_DETAILS) && !options.contains(HTMLDocumentOption.FORMAT_CSV)) {
                location.setTerminals(getTerminalsForExport(identifier));
            }
        }
        return location;
    }

    /**
     * Retrieves product data, as well as associated location and hierarchy data, when needed.
     */
    private EnhancedCard buildProductForExport(AplsIdentifier identifierType, String identifier, AplsPlatform platform) {
        EnhancedCard product = getProductForExport(identifierType, identifier, platform);

        if (platform == AplsPlatform.GREENCARD) {
            //For Greencard products, set the PAN to full unmasked PAN for those on the whitelist, last four digits only for others
            if (product.getIdentifiers() != null) {
                if (StringUtils.isNotBlank(product.getIdentifiers()
                                                  .getPan())) {
                    try {
                        String unmaskedPan = GreencardPanEncryptionUtil.decrypt(product.getIdentifiers()
                                                                                       .getPan());
                        if (securityService.hasPermission(ManagedPermission.UNMASK_PAN)) {
                            product.getIdentifiers()
                                   .setPan(unmaskedPan);
                        } else {
                            product.getIdentifiers()
                                   .setPan(unmaskedPan.substring(unmaskedPan.length() - 4));
                        }
                    } catch (EncryptionException e) {
                        //If something goes wrong here, set the PAN to null. Better safe than sorry, but also doesn't make sense to break the entire report just for one missing/broken field...
                        product.getIdentifiers()
                               .setPan(null);
                    }
                } else {
                    product.getIdentifiers()
                           .setPan(null);
                }
            }
            //For Greencard products, try to get the purchase location and hierarchy
            if (product.getActivation() != null
                    && product.getActivation()
                              .getEntity() != null
                    && StringUtils.isNotBlank(product.getActivation()
                                                     .getEntity()
                                                     .getType())
                    && StringUtils.isNotBlank(product.getActivation()
                                                     .getEntity()
                                                     .getId())) {
                EnhancedLocation location = null;
                //Look up location based on activationLocationType
                if (product.getActivation()
                           .getEntity()
                           .getType()
                           .equals("4")) {
                    location = getLocationForExportByTerminal(product.getActivation()
                                                                     .getEntity()
                                                                     .getId());
                } else {
                    location = getLocationForExport(product.getActivation()
                                                           .getEntity()
                                                           .getId());
                }
                if (location != null) {
                    location.setHierarchy(getHierarchyForExport(location.getId()));
                }
                product.setPurchaseLocation(location);
            }
        }
        return product;
    }

    /**
     * Build transactions list by date range
     */
    private List<EnhancedTransaction> buildTransactionsForExport(AplsIdentifier identifierType, String identifier, ValidatedDateRange dateRange, int currentPages, int archivePages, TransactionHistoryRequestSupport.SortOrder sortOrder, AplsPlatform platform, Boolean isBillable, String transactionFilter, String accountType, String token) {
        List<EnhancedTransaction> transactions = new ArrayList<>();
        //Get histories depending on sortOrder
        if (sortOrder == TransactionHistoryRequestSupport.SortOrder.DESC) {
            for (int i = 1; i < currentPages + 1; i++) {
                transactions.addAll(getTransactionsForExport(identifierType, identifier, false, dateRange, i, sortOrder, platform, isBillable, transactionFilter, accountType, token));
            }
            for (int i = 1; i < archivePages + 1; i++) {
                transactions.addAll(getTransactionsForExport(identifierType, identifier, true, dateRange, i, sortOrder, platform, isBillable, transactionFilter, accountType, token));
            }
        } else {
            for (int i = 1; i < archivePages + 1; i++) {
                transactions.addAll(getTransactionsForExport(identifierType, identifier, true, dateRange, i, sortOrder, platform, isBillable, transactionFilter, accountType, token));
            }
            for (int i = 1; i < currentPages + 1; i++) {
                transactions.addAll(getTransactionsForExport(identifierType, identifier, false, dateRange, i, sortOrder, platform, isBillable, transactionFilter, accountType, token));
            }
        }
        return transactions;
    }

    /**
     * Build transactions list by cherry-picking
     */
    private List<EnhancedTransaction> buildTransactionsForExport(AplsIdentifier identifierType, String identifier, ValidatedDateRange dateRange, TransactionSearchReq currentSelections, TransactionSearchReq archiveSelections, TransactionHistoryRequestSupport.SortOrder sortOrder, AplsPlatform platform, String transactionFilter, String accountType, String token) {
        List<EnhancedTransaction> transactions = new ArrayList<>();

        //If GREENCARD, merge the two lists of selections together so we only have to make a single request
        if (platform == AplsPlatform.GREENCARD) {
            TransactionSearchReq combinedSelections = new TransactionSearchReq();
            //TODO This needs fixing in APLS so we don't have to do this
            combinedSelections.setTransactions(new ArrayList<>());

            if (currentSelections != null && !currentSelections.getTransactions()
                                                               .isEmpty()) {
                combinedSelections.getTransactions()
                                  .addAll(currentSelections.getTransactions());
            }
            if (archiveSelections != null && !archiveSelections.getTransactions()
                                                               .isEmpty()) {
                combinedSelections.getTransactions()
                                  .addAll(archiveSelections.getTransactions());
            }
            currentSelections = combinedSelections;
        }

        //Get histories depending on sortOrder
        if (sortOrder == TransactionHistoryRequestSupport.SortOrder.DESC) {
            transactions.addAll(getTransactionsForExport(identifierType, identifier, dateRange, currentSelections, false, sortOrder, platform, transactionFilter, accountType, token));
            if (platform == AplsPlatform.GREENCARD) {
                transactions.addAll(getTransactionsForExport(identifierType, identifier, dateRange, archiveSelections, true, sortOrder, platform, transactionFilter, accountType, token));
            }
        } else {
            if (platform != AplsPlatform.GREENCARD) {
                transactions.addAll(getTransactionsForExport(identifierType, identifier, dateRange, archiveSelections, true, sortOrder, platform, transactionFilter, accountType, token));
            }
            transactions.addAll(getTransactionsForExport(identifierType, identifier, dateRange, currentSelections, false, sortOrder, platform, transactionFilter, accountType, token));
        }
        return transactions;
    }

    /**
     * Simply gets the location data.
     */
    private EnhancedLocation getLocationForExport(String identifier) {
        try {
            AplsRequestLocation aplsRequestLocation = new AplsRequestLocation();
            aplsRequestLocation.setLocationId(identifier);

            EnhancedLocations locations = nodeService.getLocations(aplsRequestLocation);
            return locations.getFirst();
        } catch (Exception e) {
            CsCoreLogger.error(ERROR_GET_LOCATION)
                        .keyValue("identifier", identifier)
                        .exception(e)
                        .build();
            return null;
        }
    }

    private EnhancedLocation getLocationForExportByTerminal(String identifier) {
        try {
            AplsRequestLocation aplsRequestLocation = new AplsRequestLocation();
            aplsRequestLocation.setTerminalId(identifier);

            EnhancedHierarchies hierarchies = nodeService.getHierarchies(aplsRequestLocation);
            EnhancedHierarchy hierarchy = hierarchies.getFirst();
            EnhancedLocation location = hierarchy.getLocation();
            return getLocationForExport(location.getId());
        } catch (Exception e) {
            return null;
        }
    }

    /**
     * Simply gets the customer data.
     */
    private EnhancedCustomer getCustomerForExport(String identifier) {
        try {
            return customerService.findOne(identifier);
        } catch (Exception e) {
            CsCoreLogger.error(ERROR_GET_CUSTOMER)
                        .keyValue("identifier", identifier)
                        .exception(e)
                        .build();
            return null;
        }
    }

    /**
     * Simply gets the product data.
     */
    private EnhancedCard getProductForExport(AplsIdentifier identifierType, String identifier, AplsPlatform platform) {
        try {
            EnhancedCards productsResponseDto = cardService.search(identifierType, identifier, platform, false);
            if (productsResponseDto != null && productsResponseDto.getCards() != null && productsResponseDto.getCards()
                                                                                                            .size() == 1) {
                return productsResponseDto.getCards()
                                          .get(0);
            } else {
                throw new NotFoundException();
            }
        } catch (Exception e) {
            CsCoreLogger.error(ERROR_GET_PRODUCT)
                        .keyValue("identifierType", identifierType)
                        .keyValue("identifier", identifier)
                        .keyValue("platform", platform)
                        .exception(e)
                        .build();
            throw new ExportException(ERROR_GET_PRODUCT, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Simply gets the hierarchy data.
     */
    private EnhancedHierarchy getHierarchyForExport(String identifier) {
        try {
            AplsRequestLocation aplsRequestLocation = new AplsRequestLocation();
            aplsRequestLocation.setLocationId(identifier);

            EnhancedHierarchies hierarchies = nodeService.getHierarchies(aplsRequestLocation);
            return hierarchies.getFirst();
        } catch (Exception e) {
            CsCoreLogger.error(ERROR_GET_HIERARCHY)
                        .keyValue("identifier", identifier)
                        .exception(e)
                        .build();
            throw new ExportException(ERROR_GET_HIERARCHY, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Simply gets the terminal data.
     */
    private List<EnhancedTerminal> getTerminalsForExport(String identifier) {
        try {
            AplsRequestLocation aplsRequestLocation = new AplsRequestLocation();
            aplsRequestLocation.setLocationId(identifier);

            return nodeService.getTerminals(aplsRequestLocation)
                              .getTerminals();
        } catch (Exception e) {
            CsCoreLogger.error(ERROR_GET_TERMINALS)
                        .keyValue("identifier", identifier)
                        .exception(e)
                        .build();
            throw new ExportException(ERROR_GET_TERMINALS, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Retrieves transactions by date range.
     */
    private List<EnhancedTransaction> getTransactionsForExport(AplsIdentifier identifierType, String identifier, boolean archive, ValidatedDateRange dateRange, int page, TransactionHistoryRequestSupport.SortOrder sortOrder, AplsPlatform platform, Boolean isBillable, String transactionFilter, String accountType, String token) {
        TransactionSearchRequestView request = new TransactionSearchRequestView();
        request.setIdentifierType(identifierType);
        request.setIdentifier(identifier);
        request.setStartDate(dateRange.getStartDateString());
        request.setEndDate(dateRange.getEndDateString());
        request.setIsArchive(archive);
        request.setIsBillable(isBillable);
        request.setSortOrder(sortOrder);
        request.setPlatform(platform);
        request.setTransactionFilter(transactionFilter);
        request.setAccountType(accountType);
        request.setToken(token);
        request.setPage(page);
        request.setResultsPerPage(500);

        try {
            EnhancedTransactions responseDto = transactionService.search(request);
            if (responseDto != null && responseDto.getTransactions() != null && !responseDto.getTransactions()
                                                                                            .isEmpty()) {
                return responseDto.getTransactions();
            } else {
                throw new NotFoundException();
            }
        } catch (Exception e) {
            CsCoreLogger.error(ERROR_GET_TRANSACTIONS)
                        .json("request", request)
                        .exception(e)
                        .build();
            throw new ExportException(ERROR_GET_TRANSACTIONS, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Retrieves transactions by cherry-picking.
     */
    private List<EnhancedTransaction> getTransactionsForExport(AplsIdentifier identifierType, String identifier, ValidatedDateRange dateRange, TransactionSearchReq selections, boolean archive, TransactionHistoryRequestSupport.SortOrder sortOrder, AplsPlatform platform, String transactionFilter, String accountType, String token) {
        TransactionSearchRequestView request = new TransactionSearchRequestView();
        request.setIdentifierType(identifierType);
        request.setIdentifier(identifier);
        request.setStartDate(dateRange.getStartDateString());
        request.setEndDate(dateRange.getEndDateString());
        request.setIsArchive(archive);
        request.setSortOrder(sortOrder);
        request.setPlatform(platform);
        request.setTransactionFilter(transactionFilter);
        request.setAccountType(accountType);
        request.setToken(token);
        request.setPage(1);
        request.setResultsPerPage(500);

        try {
            List<EnhancedTransaction> transactions = new ArrayList<>();
            if (selections != null && !selections.getTransactions()
                                                 .isEmpty()) {
                switch (platform) {
                    //Some platforms do not support cherry-picking, so we need to fake it here.
                    case GREENCARD:
                    case CCL:
                    case VMS:
                        transactions = this.getNonCherryPickedTransactions(request, selections);
                        break;
                    //Otherwise, use the APLS REST service which handles cherry-picking for us.
                    default:
                        transactions = this.getCherryPickedTransactions(selections, archive, sortOrder, platform);
                        break;
                }
            }
            return transactions;
        } catch (Exception e) {
            CsCoreLogger.error(ERROR_GET_TRANSACTIONS)
                        .json("request", request)
                        .exception(e)
                        .build();
            throw new ExportException(ERROR_GET_TRANSACTIONS, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private List<EnhancedTransaction> getCherryPickedTransactions(TransactionSearchReq selections, boolean archive, TransactionHistoryRequestSupport.SortOrder sortOrder, AplsPlatform platform) {
        List<EnhancedTransaction> transactions = new ArrayList<>();

        EnhancedTransactions responseDto = transactionService.getSelected(selections, 1, 500, archive, sortOrder, platform);
        if (responseDto != null && responseDto.getTransactions() != null) {
            transactions.addAll(responseDto.getTransactions());
        } else {
            throw new NotFoundException();
        }

        return transactions;
    }

    private List<EnhancedTransaction> getNonCherryPickedTransactions(TransactionSearchRequestView request, TransactionSearchReq selections) {
        List<EnhancedTransaction> transactions = new ArrayList<>();

        EnhancedTransactions responseDto = transactionService.search(request);
        if (responseDto != null && responseDto.getTransactions() != null) {
            //Now that we got transactions back, we need to pick out just the ones that the user asked for
            for (EnhancedTransaction transaction : responseDto.getTransactions()) {
                for (Transaction requestDto : selections.getTransactions()) {
                    if (requestDto.getNLogId()
                                  .equals(transaction.getId())) {
                        transactions.add(transaction);
                    }
                }
            }
        } else {
            throw new NotFoundException();
        }

        return transactions;
    }

    /**
     * Constructs an appropriate value to plug into any export request's
     * Content-Disposition header
     */
    public String getContentDisposition(ExportFormat format) {
        String filename = getExportFilename(format);
        return String.format("attachment; filename=%s", filename);
    }

    /**
     * Builds the CSV file for Customer data.
     */
    private byte[] generateCustomerCsv(EnhancedCustomer customer, List<EnhancedTransaction> transactions, ExportFormat format) {
        try {
            List<CsvRecordBuilder> recordBuilders = new ArrayList<>();

            for (EnhancedTransaction transaction : transactions) {
                EnhancedTransaction transactionDetail = this.attemptToGetTransactionDetails(transaction, customer);
                recordBuilders.add(new VMSTransactionHistoryCsvRecordBuilder(customer, transactionDetail));
            }

            return generateCsv(recordBuilders);
        } catch (Exception e) {
            CsCoreLogger.error(ERROR_GENERATING_EXPORT_FILE)
                        .keyValue("customerId", customer.getId())
                        .keyValue("format", format)
                        .exception(e)
                        .build();
            throw new ExportException(ERROR_GENERATING_EXPORT_FILE, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    private EnhancedTransaction attemptToGetTransactionDetails(EnhancedTransaction transaction, EnhancedCustomer customer) {
        EnhancedTransaction transactionDetail = transaction;
        try {
            String deliveryChannel = transaction.findCodeByType(CodeType.DELIVERY_CHANNEL)
                                                .getCode();
            String requestCode = transaction.getRequest()
                                            .getCode();
            String responseCode = transaction.getResponse()
                                             .getCode();

            transactionDetail = transactionService.getTransactionDetails(AplsIdentifier.CUSTOMERID, customer.getId(), AplsPlatform.VMS, transaction.getId(), transaction.getBusinessDate()
                                                                                                                                                                        .getValue()
                                                                                                                                                                        .toInstant()
                                                                                                                                                                        .toEpochMilli(), deliveryChannel, requestCode, responseCode);
        } catch (Exception e) {
            //Do nothing
        }

        return transactionDetail;
    }

    /**
     * Builds the CSV file for Product data.
     */
    private byte[] generateCsv(EnhancedCard card, ExportFormat format) {
        try {
            List<CsvRecordBuilder> recordBuilders = new ArrayList<>();

            List<EnhancedTransaction> transactions = card.getTransactions();
            for (EnhancedTransaction transaction : transactions) {
                recordBuilders.add(new ProductHistoryCsvRecordBuilder(card, transaction));
            }

            return generateCsv(recordBuilders);
        } catch (Exception e) {
            CsCoreLogger.error(ERROR_GENERATING_EXPORT_FILE)
                        .keyValue("serialNumber", card.getIdentifiers()
                                                      .getSerialNumber())
                        .keyValue("van", card.getIdentifiers()
                                             .getVan())
                        .keyValue("pin", card.getIdentifiers()
                                             .getPin())
                        .keyValue("format", format)
                        .exception(e)
                        .build();
            throw new ExportException(ERROR_GENERATING_EXPORT_FILE, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Builds the CSV file for the list of row.  The field data set in the TableDataBuilder dictates what data in the
     * row is mapped to the csv file.
     */
    private byte[] generateCsv(List<? extends Object> list, TableDataBuilder tableData) {
        try {
            StringWriter writer = new StringWriter();
            CSVPrinter csvPrinter = new CSVPrinter(writer, CSVFormat.EXCEL.withQuoteMode(QuoteMode.ALL));

            //Build header row
            for (int i = 0; i < tableData.size(); i++) {
                csvPrinter.print(tableData.getHeader(i));
            }
            csvPrinter.println();

            for (Object row : list) {
                for (int i = 0; i < tableData.size(); i++) {
                    csvPrinter.print(tableData.getString(i, row));
                }
                csvPrinter.println();
            }

            csvPrinter.close();

            return writer.toString()
                         .getBytes(StandardCharsets.UTF_8);
        } catch (Exception e) {
            CsCoreLogger.error("Failed to generate CSV file")
                        .exception(e)
                        .build();
            throw new ExportException(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Builds the CSV file for Location data.
     */
    private byte[] generateCsv(EnhancedLocation location, ExportFormat format) {
        try {
            List<CsvRecordBuilder> recordBuilders = new ArrayList<>();
            for (EnhancedTransaction transaction : location.getTransactions()) {
                recordBuilders.add(new LocationHistoryCsvRecordBuilder(location, transaction));
            }
            return generateCsv(recordBuilders);
        } catch (Exception e) {
            CsCoreLogger.error(ERROR_GENERATING_EXPORT_FILE)
                        .keyValue("locationId", location.getId())
                        .keyValue("format", format)
                        .exception(e)
                        .build();
            throw new ExportException(ERROR_GENERATING_EXPORT_FILE, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Takes builders created in the above generateCsv() methods and writes them to a file.
     */
    private byte[] generateCsv(List<CsvRecordBuilder> recordBuilders) {
        try {
            StringWriter writer = new StringWriter();
            CSVPrinter csvPrinter = new CSVPrinter(writer, CSVFormat.EXCEL.withQuoteMode(QuoteMode.ALL));

            //Build header row
            csvPrinter.printRecord(recordBuilders.get(0)
                                                 .buildHeader());

            //Build record rows
            for (CsvRecordBuilder recordBuilder : recordBuilders) {
                csvPrinter.printRecord(recordBuilder.buildRecord());
            }
            csvPrinter.close();

            return writer.toString()
                         .getBytes(StandardCharsets.UTF_8);
        } catch (Exception e) {
            CsCoreLogger.error("Failed to generate CSV file")
                        .exception(e)
                        .build();
            throw new ExportException(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Generate an excel workbook based upon the row data and the definitions set in the TableDataBuilder.
     *
     * @param list
     * @param tableData
     * @return
     */
    private byte[] generateXlsx(List<? extends Object> list, TableDataBuilder tableData) {
        byte[] bytes = null;
        try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream(); Workbook workbook = new XSSFWorkbook()) {

            Sheet sheet = workbook.createSheet("Export");
            Row row;
            Cell cell;

            // Header row
            row = sheet.createRow(0);
            for (int i = 0; i < tableData.size(); i++) {
                cell = row.createCell(i);
                cell.setCellValue(tableData.getHeader(i));
            }

            // Rest of data
            for (int j = 0; j < list.size(); j++) {
                row = sheet.createRow(j + 1);

                for (int i = 0; i < tableData.size(); i++) {
                    tableData.getCell(workbook, row, i, list.get(j));
                }
            }

            workbook.write(outputStream);

            bytes = outputStream.toByteArray();
        } catch (Exception e) {
            CsCoreLogger.error("Failed to generate XLSX")
                        .exception(e)
                        .build();
            throw new ExportException(ERROR_GENERATING_EXPORT_FILE, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return bytes;
    }

    private byte[] generateXlsx(EnhancedCustomer customer, String selectedCardLastFour, List<EnhancedTransaction> transactions) {
        byte[] bytes = null;
        try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream(); Workbook workbook = new XSSFWorkbook()) {

            new CustomerSheetBuilder(customer, selectedCardLastFour).build(workbook);
            new TransactionHistorySheetBuilder(transactions).build(workbook);
            new AccountHolderSheetBuilder(customer).build(workbook);

            workbook.write(outputStream);

            bytes = outputStream.toByteArray();
        } catch (Exception e) {
            CsCoreLogger.error("Failed to generate XLSX")
                        .keyValue("customerId", customer.getId())
                        .exception(e)
                        .build();
            throw new ExportException(ERROR_GENERATING_EXPORT_FILE, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return bytes;
    }

    /**
     * Builds the XLSX file for Product data.
     */
    private byte[] generateXlsx(EnhancedCard product) {
        byte[] bytes = null;
        try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream(); Workbook workbook = new XSSFWorkbook()) {
            new TransactionHistorySheetBuilder(product.getTransactions()).build(workbook);
            new ProductSheetBuilder(product).build(workbook);

            List<EnhancedCardAccountHistory> accountHistories = product.getAccountHistories();
            new AccountHistorySheetBuilder(accountHistories).build(workbook);

            workbook.write(outputStream);

            bytes = outputStream.toByteArray();
        } catch (Exception e) {
            CsCoreLogger.error(ERROR_GENERATING_EXPORT_FILE)
                        .keyValue("serialNumber", product.getIdentifiers()
                                                         .getSerialNumber())
                        .keyValue("van", product.getIdentifiers()
                                                .getVan())
                        .keyValue("pin", product.getIdentifiers()
                                                .getPin())
                        .exception(e)
                        .build();
            throw new ExportException(ERROR_GENERATING_EXPORT_FILE, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return bytes;
    }

    /**
     * Builds the XLSX file for Location data.
     */
    private byte[] generateXlsx(EnhancedLocation location) {
        byte[] bytes = null;
        try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream(); Workbook workbook = new XSSFWorkbook()) {
            new TransactionHistorySheetBuilder(location.getTransactions()).build(workbook);
            new LocationSheetBuilder(location).build(workbook);
            new TerminalsSheetBuilder(location.getTerminals()).build(workbook);
            workbook.write(outputStream);

            bytes = outputStream.toByteArray();
        } catch (Exception e) {
            CsCoreLogger.error(ERROR_GENERATING_EXPORT_FILE)
                        .keyValue("locationId", location.getId())
                        .exception(e)
                        .build();
            throw new ExportException(ERROR_GENERATING_EXPORT_FILE, HttpStatus.INTERNAL_SERVER_ERROR);
        }

        return bytes;
    }

    /**
     * Builds the PDF file for Product data.
     */
    private byte[] generatePdf(EnhancedCard card, ValidatedDateRange dateRange, Set<HTMLDocumentComponent> selectedComponents, Set<HTMLDocumentOption> selectedOptions) {
        try {
            //Begin build document
            HTMLDocumentBuilder builder = new HTMLDocumentBuilder(selectedOptions);

            if (card.getPlatform() == AplsPlatform.GREENCARD) {
                builder.appendElement(new GreencardProductHeaderElementBuilder(card));
            } else {
                builder.appendElement(new ProductHeaderElementBuilder(card));
            }

            //Append components
            for (HTMLDocumentComponent component : selectedComponents) {
                switch (component) {
                    case DEFAULT_FOOTER:
                        builder.appendElement(new FooterElementBuilder(userService.currentUser()
                                                                                  .getUsername()
                                                                                  .toLowerCase()));
                        break;
                    case PRODUCT_DETAILS:
                        if (card.getPlatform() == AplsPlatform.GREENCARD) {
                            builder.appendElement(new GreencardProductDetailsElementBuilder(card));
                        } else {
                            builder.appendElement(new ProductDetailsElementBuilder(card));
                        }
                        break;
                    case PRODUCT_HISTORY_DETAILS:
                        if (card.getPlatform() == AplsPlatform.GREENCARD) {
                            builder.appendElement(new GreencardProductHistoryDetailsElementBuilder(card.getTransactions(), dateRange.getStartDate(), dateRange.getEndDate()));
                        } else {
                            builder.appendElement(new ProductHistoryDetailsElementBuilder(card.getTransactions(), dateRange.getStartDate(), dateRange.getEndDate()));
                        }
                        break;
                    case TRANSACTION_SUMMARY:
                        builder.appendElement(new TransactionSummaryElementBuilder(card.getTransactions()));
                        break;
                    default:
                        //Ignore any non-product components
                        break;
                }
            }

            String xhtml = builder.build()
                                  .toHTMLString();

            return generatePdf(xhtml);
        } catch (Exception e) {
            CsCoreLogger.error(ERROR_GENERATING_EXPORT_FILE)
                        .keyValue("serialNumber", card.getIdentifiers()
                                                      .getSerialNumber())
                        .keyValue("van", card.getIdentifiers()
                                             .getVan())
                        .keyValue("pin", card.getIdentifiers()
                                             .getPin())
                        .exception(e)
                        .build();
            throw new ExportException(ERROR_GENERATING_EXPORT_FILE, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Builds the PDF file for Location data.
     */
    private byte[] generatePdf(EnhancedLocation location, ValidatedDateRange dateRange, Set<HTMLDocumentComponent> selectedComponents, Set<HTMLDocumentOption> selectedOptions) {
        try {
            //Begin build document
            HTMLDocumentBuilder builder = new HTMLDocumentBuilder(selectedOptions);

            builder.appendElement(new LocationHeaderElementBuilder(location));

            //Append components
            for (HTMLDocumentComponent component : selectedComponents) {
                switch (component) {
                    case DEFAULT_FOOTER:
                        builder.appendElement(new FooterElementBuilder(userService.currentUser()
                                                                                  .getUsername()
                                                                                  .toLowerCase()));
                        break;
                    case LOCATION_DETAILS:
                        builder.appendElement(new LocationDetailsElementBuilder(location));
                        break;
                    case LOCATION_HISTORY_DETAILS:
                        builder.appendElement(new LocationHistoryDetailsElementBuilder(location.getTransactions(), dateRange.getStartDate(), dateRange.getEndDate()));
                        break;
                    case TERMINAL_DETAILS:
                        builder.appendElement(new TerminalsElementBuilder(location.getTerminals()));
                        break;
                    case TRANSACTION_SUMMARY:
                        builder.appendElement(new TransactionSummaryElementBuilder(location.getTransactions()));
                        break;
                    default:
                        //Ignore any non-location components
                        break;
                }
            }

            String xhtml = builder.build()
                                  .toHTMLString();

            return generatePdf(xhtml);
        } catch (Exception e) {
            CsCoreLogger.error(ERROR_GENERATING_EXPORT_FILE)
                        .keyValue("locationId", location.getId())
                        .exception(e)
                        .build();
            throw new ExportException(ERROR_GENERATING_EXPORT_FILE, HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    /**
     * Formats the filename to be used in conjunction with the Content-Disposition
     * header in response to export requests
     */
    private String getExportFilename(ExportFormat format) {
        String timestamp = new SimpleDateFormat("MM_dd_yy").format(new Date());
        return String.format("cca-export_%s.%s", timestamp, format.getExtension()
                                                                  .toLowerCase());
    }

    /**
     * Renders the given HTML String template into a complete PDF file
     */
    private byte[] generatePdf(String xhtml) {
        byte[] pdfBytes = null;

        try (ByteArrayOutputStream outputStream = new ByteArrayOutputStream()) {
            ITextRenderer renderer = buildRenderer();
            renderer.setDocumentFromString(xhtml);
            renderer.layout();
            renderer.createPDF(outputStream, true);

            pdfBytes = outputStream.toByteArray();
        } catch (Exception e) {
            CsCoreLogger.error("Error generating pdf")
                        .exception(e)
                        .build();
        }

        return pdfBytes;
    }

    /**
     * Builds a PDF renderer complete with encoded img tag handler
     */
    private ITextRenderer buildRenderer() {
        ITextRenderer renderer = new ITextRenderer();
        SharedContext sharedContext = renderer.getSharedContext();
        sharedContext.setPrint(true);
        sharedContext.setInteractive(false);
        sharedContext.setReplacedElementFactory(new Base64ImgReplacedElementFactory());
        sharedContext.getTextRenderer()
                     .setSmoothingThreshold(0);

        return renderer;
    }
}
