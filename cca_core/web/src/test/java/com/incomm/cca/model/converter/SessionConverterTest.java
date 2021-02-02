package com.incomm.cca.model.converter;

import com.incomm.cca.model.converter.complaint.ComplaintComponentConverter;
import com.incomm.cca.model.domain.session.Session;
import com.incomm.cca.model.domain.session.dispute.DisputeComponent;
import com.incomm.cscore.client.rest.converter.TimestampConverter;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.Spy;
import org.mockito.runners.MockitoJUnitRunner;

@RunWith( MockitoJUnitRunner.class )
public class SessionConverterTest {
	
	@Mock
	private CallComponentConverter callComponentConverter;
	@Mock
	private CardComponentConverter cardComponentConverter;
	@Mock
	private CcaCommentConverter commentConverter;
	@Mock
	private ComplaintComponentConverter complaintComponentConverter;
	@Mock
	private CustomerComponentConverter customerComponentConverter;
	@Spy
	private DisputeComponentConverter disputeComponentConverter;
	@Mock
	private DocumentComponentConverter documentComponentConverter;
	@Mock
	private EncorComponentConverter encorComponentConverter;
	@Mock
	private LawEnforcementComponentConverter lawEnforcementComponentConverter;
	@Mock
	private MerchantComponentConverter merchantComponentConverter;
	@Mock
	private PrivacyRequestComponentConverter privacyRequestComponentConverter;
	@Mock
	private QueueConverter queueConverter;
	@Mock
	private ReceiptComponentConverter receiptComponentConverter;
	@Mock
	private RefundRequestComponentConverter refundRequestComponentConverter;
	@Mock
	private SelectionConverter selectionConverter;
	@Mock
	private TeamConverter teamConverter;
	@Mock
	private TimestampConverter timestampConverter;
	@Mock
	private UserConverter userConverter;
	@Mock
	private WrapUpCodeConverter wrapUpCodeConverter;
	@Mock
	private WrapUpCodeCategoryConverter wrapUpCodeCategoryConverter;
	
	@InjectMocks
	private SessionConverter sessionConverter;
	
	@Test
	public void itShouldCallDisputeComponentConverter() {
		this.sessionConverter.convert( new Session() );
		
		Mockito.verify( this.disputeComponentConverter, Mockito.times( 1 ) )
               .convert(Mockito.any(DisputeComponent.class));
	}
}
