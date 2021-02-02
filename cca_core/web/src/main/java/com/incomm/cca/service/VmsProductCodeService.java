package com.incomm.cca.service;

import com.incomm.apls.model.support.ProductDescription;
import com.incomm.apls.model.support.ProductDescriptionType;
import com.incomm.cca.exception.NotFoundException;
import com.incomm.cca.exception.SecurityViolationException;
import com.incomm.cca.model.domain.Partner;
import com.incomm.cca.model.domain.VmsProductCode;
import com.incomm.cca.model.domain.VmsProductType;
import com.incomm.cca.model.enums.ManagedPermission;
import com.incomm.cca.model.view.external.vms.VmsProductCodesSyncResults;
import com.incomm.cca.model.view.external.vms.VmsProductTypeSummaryView;
import com.incomm.cca.repository.VmsProductCodeRepository;
import com.incomm.cca.repository.VmsProductTypeRepository;
import com.incomm.cscore.client.apls.constant.AplsPlatform;
import com.incomm.cscore.logging.CsCoreLogger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class VmsProductCodeService {

    @Autowired
    private VmsProductCodeRepository codeRepository;
    @Autowired
    private VmsProductTypeRepository typeRepository;
    @Autowired
    private PartnerService partnerService;
    @Autowired
    private SecurityService securityService;
    @Autowired
    private ProductDescriptionService productDescriptionService;

    public List<VmsProductCode> getProductCodes(String partner) {
        try {
            return codeRepository.findAllForPartner(partner);
        } catch (Exception e) {
            CsCoreLogger.error("Failed to retrieve VMS product codes")
                        .keyValue("partner", partner)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    public List<VmsProductCode> getActiveProductCodes(String partner) {
        try {
            return codeRepository.findAllActiveForPartner(partner);
        } catch (Exception e) {
            CsCoreLogger.error("Failed to retrieve active VMS product codes")
                        .keyValue("partner", partner)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    @Transactional
    public VmsProductType updateProductType(Long productTypeId, Boolean enabled) {
        try {
            if (!securityService.hasPermission(ManagedPermission.VMS_MANAGE_PRODUCT_TYPES)) {
                throw new SecurityViolationException();
            }

            VmsProductType productType = typeRepository.findById(productTypeId)
                                                       .orElse(null);
            if (productType == null) {
                throw new NotFoundException("Product type not found");
            }

            productType.setEnabled(enabled);

            return productType;
        } catch (SecurityViolationException e) {
            CsCoreLogger.warn("Unauthorized attempt to update VMS product type")
                        .keyValue("id", productTypeId)
                        .keyValue("enabled", enabled)
                        .build();
            throw e;
        } catch (NotFoundException e) {
            CsCoreLogger.warn("Bad attempt to update VMS product type")
                        .keyValue("id", productTypeId)
                        .keyValue("enabled", enabled)
                        .keyValue("cause", e.getMessage())
                        .build();
            throw e;
        } catch (Exception e) {
            CsCoreLogger.error("Failed to update VMS product type")
                        .keyValue("id", productTypeId)
                        .keyValue("enabled", enabled)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    @Transactional
    public VmsProductCodesSyncResults syncProductCodes(String partner) {
        try {
            if (!securityService.hasPermission(ManagedPermission.VMS_MANAGE_PRODUCT_TYPES)) {
                throw new SecurityViolationException();
            }

            List<ProductDescription> rawDescriptions = productDescriptionService.findAll();
            List<VmsProductCode> ccaProductCodes = getProductCodes(partner);

            List<VmsProductTypeSummaryView> createdProductCodes = createMissingCCAProductCodes(rawDescriptions, ccaProductCodes, partner);
            List<VmsProductTypeSummaryView> deletedProductCodes = deleteObsoleteCCAProductCodes(rawDescriptions, ccaProductCodes);

            codeRepository.flush();
            typeRepository.flush();

            CsCoreLogger.info("Successfully synced VMS product codes")
                        .keyValue("partner", partner)
                        .keyValue("created", createdProductCodes.size())
                        .keyValue("deleted", deletedProductCodes.size())
                        .build();

            VmsProductCodesSyncResults results = new VmsProductCodesSyncResults();
            results.setCreatedProductTypes(createdProductCodes);
            results.setDeletedProductTypes(deletedProductCodes);

            return results;
        } catch (SecurityViolationException e) {
            CsCoreLogger.warn("Unauthorized attempt to sync VMS product codes")
                        .keyValue("partner", partner)
                        .build();
            throw e;
        } catch (IllegalArgumentException e) {
            CsCoreLogger.warn("Bad attempt to sync VMS product codes")
                        .keyValue("partner", partner)
                        .keyValue("cause", e.getMessage())
                        .build();
            throw e;
        } catch (Exception e) {
            CsCoreLogger.error("Failed to sync VMS product codes")
                        .keyValue("partner", partner)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    private List<VmsProductTypeSummaryView> createMissingCCAProductCodes(List<ProductDescription> rawProductCodes, List<VmsProductCode> ccaProductCodes, String partnerName) {
        try {
            List<VmsProductTypeSummaryView> createdRecords = new ArrayList<>();
            Partner partner = partnerService.findOneByNameAndPlatform(partnerName, AplsPlatform.VMS.toString());
            if (partner == null) {
                throw new IllegalArgumentException("No Partner found with this name");
            }

            for (ProductDescription rawProductCode : rawProductCodes) {
                VmsProductCode ccaProductCode = null;

                //Find existing CCA record for product code
                Optional<VmsProductCode> ccaProductCodeOptional = ccaProductCodes.stream()
                                                                                 .filter(vmsProductCode -> vmsProductCode.getCode()
                                                                                                                         .equals(rawProductCode.getCode()))
                                                                                 .findFirst();

                //Create product code record if it doesn't already exist
                if (ccaProductCodeOptional.isPresent()) {
                    ccaProductCode = ccaProductCodeOptional.get();
                } else {
                    ccaProductCode = newBasicProductCode(rawProductCode, partner);
                }

                //Sync the product types for the given product code
                List<VmsProductTypeSummaryView> createdProductTypes = createMissingCCAProductTypes(rawProductCode, ccaProductCode);

                createdRecords.addAll(createdProductTypes);
            }

            return createdRecords;
        } catch (Exception e) {
            CsCoreLogger.error("Failed to create missing VMS product codes")
                        .exception(e)
                        .build();
            throw e;
        }
    }

    private List<VmsProductTypeSummaryView> createMissingCCAProductTypes(ProductDescription rawProductCode, VmsProductCode ccaProductCode) {
        try {
            List<VmsProductTypeSummaryView> createdRecords = new ArrayList<>();

            for (ProductDescriptionType rawProductType : rawProductCode.getTypes()) {

                //Find existing CCA record for product type
                Optional<VmsProductType> ccaProductTypeOptional = ccaProductCode.getTypes()
                                                                                .stream()
                                                                                .filter(vmsProductType -> vmsProductType.getVmsId()
                                                                                                                        .equals(rawProductType.getId()))
                                                                                .findFirst();

                //Create product type record if it doesn't already exist
                if (!ccaProductTypeOptional.isPresent()) {
                    newProductType(rawProductType, ccaProductCode);

                    VmsProductTypeSummaryView summary = new VmsProductTypeSummaryView();
                    summary.setProductCode(rawProductCode.getCode());
                    summary.setProductCodeName(rawProductCode.getName());
                    summary.setProductTypeId(rawProductType.getId());
                    summary.setProductTypeName(rawProductType.getName());
                    createdRecords.add(summary);
                }
            }

            return createdRecords;
        } catch (Exception e) {
            CsCoreLogger.error("Failed to create missing VMS product types")
                        .exception(e)
                        .build();
            throw e;
        }
    }

    private List<VmsProductTypeSummaryView> deleteObsoleteCCAProductCodes(List<ProductDescription> rawProductCodes, List<VmsProductCode> ccaProductCodes) {
        try {
            List<VmsProductTypeSummaryView> deletedRecords = new ArrayList<>();

            for (VmsProductCode ccaProductCode : ccaProductCodes) {
                //Find raw product code for existing CCA product code
                Optional<ProductDescription> rawProductCodeOptional = rawProductCodes.stream()
                                                                                     .filter(productDescription -> productDescription.getCode()
                                                                                                                                     .equals(ccaProductCode.getCode()))
                                                                                     .findFirst();

                //Delete product code record if it isn't found
                if (rawProductCodeOptional.isPresent()) {
                    ProductDescription rawProductCode = rawProductCodeOptional.get();

                    //Sync the product types for the given product code
                    List<VmsProductTypeSummaryView> deletedProductTypes = deleteObsoleteCCAProductTypes(rawProductCode, ccaProductCode);
                    deletedRecords.addAll(deletedProductTypes);
                } else {
                    for (VmsProductType productType : ccaProductCode.getTypes()) {
                        VmsProductTypeSummaryView summary = new VmsProductTypeSummaryView();
                        summary.setProductCode(ccaProductCode.getCode());
                        summary.setProductCodeName(ccaProductCode.getName());
                        summary.setProductTypeName(productType.getName());
                        summary.setProductTypeId(productType.getVmsId());
                        deletedRecords.add(summary);
                    }
                    deleteProductCode(ccaProductCode);
                }
            }

            return deletedRecords;
        } catch (Exception e) {
            CsCoreLogger.error("Failed to delete obsolete VMS product codes")
                        .exception(e)
                        .build();
            throw e;
        }
    }

    private List<VmsProductTypeSummaryView> deleteObsoleteCCAProductTypes(ProductDescription rawProductCode, VmsProductCode ccaProductCode) {
        try {
            List<VmsProductTypeSummaryView> deletedRecords = new ArrayList<>();

            for (VmsProductType ccaProductType : ccaProductCode.getTypes()) {

                //Find existing raw product type for CCA record
                Optional<ProductDescriptionType> rawProductTypeOptional = rawProductCode.getTypes()
                                                                                        .stream()
                                                                                        .filter(productDescriptionType -> productDescriptionType.getId()
                                                                                                                                                .equals(ccaProductType.getVmsId()))
                                                                                        .findFirst();

                //Create product type record if it doesn't already exist
                if (!rawProductTypeOptional.isPresent()) {
                    VmsProductTypeSummaryView summary = new VmsProductTypeSummaryView();
                    summary.setProductCode(rawProductCode.getCode());
                    summary.setProductCodeName(rawProductCode.getName());
                    summary.setProductTypeId(ccaProductType.getVmsId());
                    summary.setProductTypeName(ccaProductType.getName());
                    deletedRecords.add(summary);

                    deleteProductType(ccaProductType);
                }
            }

            return deletedRecords;
        } catch (Exception e) {
            CsCoreLogger.error("Failed to delete obsolete VMS product types")
                        .exception(e)
                        .build();
            throw e;
        }
    }

    private VmsProductCode newBasicProductCode(ProductDescription productDescription, Partner partner) {
        VmsProductCode productCode = new VmsProductCode();
        productCode.setPartner(partner);
        productCode.setVmsId(productDescription.getId());
        productCode.setName(productDescription.getName());
        productCode.setCode(productDescription.getCode());
        return codeRepository.save(productCode);
    }

    private VmsProductType newProductType(ProductDescriptionType rawProductType, VmsProductCode vmsProductCode) {
        VmsProductType productType = new VmsProductType();
        productType.setCode(vmsProductCode);
        productType.setVmsId(rawProductType.getId());
        productType.setName(rawProductType.getName());
        return typeRepository.save(productType);
    }

    private void deleteProductCode(VmsProductCode vmsProductCode) {
        codeRepository.delete(vmsProductCode);
    }

    private void deleteProductType(VmsProductType vmsProductType) {
        typeRepository.delete(vmsProductType);
    }
}
