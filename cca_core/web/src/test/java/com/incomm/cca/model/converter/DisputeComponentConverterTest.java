package com.incomm.cca.model.converter;

import com.incomm.cca.model.domain.User;
import com.incomm.cca.model.domain.mapping.ActionReasonCodeMapping;
import com.incomm.cca.model.domain.session.dispute.DisputeComponent;
import com.incomm.cca.model.domain.session.dispute.DisputeProbingQuestion;
import com.incomm.cca.model.domain.session.dispute.DisputedTransaction;
import com.incomm.cca.model.view.auth.UserView;
import com.incomm.cca.model.view.mapping.ActionReasonCodeMappingView;
import com.incomm.cca.model.view.session.dispute.DisputeComponentView;
import com.incomm.cca.model.view.session.dispute.DisputeProbingQuestionView;
import com.incomm.cca.model.view.session.dispute.DisputeTransactionView;
import com.incomm.cscore.client.model.CsCoreTimestamp;
import com.incomm.cscore.client.rest.converter.TimestampConverter;
import org.junit.Assert;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.runners.MockitoJUnitRunner;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@RunWith(MockitoJUnitRunner.class)
public class DisputeComponentConverterTest {

    @Mock
    private TimestampConverter timestampConverter;
    @Mock
    private UserConverter userConverter;
    @Mock
    private MappingConverter mappingConverter;
    @Mock
    private IdentifierConverter identifierConverter;
    @InjectMocks
    private DisputeComponentConverter converter;
	private DisputeComponent disputeComponent;

    @Before
    public void init() {
        Mockito.when(this.timestampConverter.convert(Mockito.any(Date.class)))
               .thenReturn(new CsCoreTimestamp());
        Mockito.when(this.userConverter.convertSimple(Mockito.any()))
               .thenReturn(new UserView());
        Mockito.when(this.mappingConverter.convertActionReasonCodeMapping(Mockito.any()))
               .thenReturn(new ActionReasonCodeMappingView());

		this.disputeComponent = this.defaultTestDisputeDetail();
    }

    @Test
    public void itShouldConvertSuccessfully() {
		DisputeComponentView view = this.converter.convert(this.disputeComponent);
		Assert.assertEquals(this.disputeComponent.getId(), view.getId());
		Assert.assertEquals(this.disputeComponent.getDeliveryMethod(), view.getDeliveryMethod());

        Assert.assertNotNull(view.getProbingQuestions());
        Assert.assertEquals(1, view.getProbingQuestions()
                                   .size());

		DisputeProbingQuestion probingQuestion = this.disputeComponent.getProbingQuestions()
                                                                   .get(0);
        DisputeProbingQuestionView probingQuestionView = view.getProbingQuestions()
                                                             .get(0);
        Assert.assertNotNull(probingQuestionView);
        Assert.assertEquals(probingQuestion.getId(), probingQuestionView.getId());
        Assert.assertEquals(probingQuestion.getQuestion(), probingQuestion.getQuestion());
        Assert.assertEquals(probingQuestion.getAnswer(), probingQuestion.getAnswer());

        Assert.assertNotNull(view.getTransactions());
        Assert.assertEquals(1, view.getProbingQuestions()
                                   .size());

		DisputedTransaction transaction = this.disputeComponent.getTransactions()
                                                                 .get(0);
        DisputeTransactionView transactionView = view.getTransactions()
                                                     .get(0);
        Assert.assertNotNull(transactionView);
        Assert.assertEquals(transaction.getId(), transactionView.getId());
    }

    @Test
    public void itShouldHandleNullQuestionsArray() {
		this.disputeComponent.setProbingQuestions(null);
		DisputeComponentView view = this.converter.convert(this.disputeComponent);

        Assert.assertNotNull(view.getProbingQuestions());
        Assert.assertEquals(0, view.getProbingQuestions()
                                   .size());
    }

    @Test
    public void itShouldHandleNullTransactionsArray() {
		this.disputeComponent.setTransactions(null);
		DisputeComponentView view = this.converter.convert(this.disputeComponent);

        Assert.assertNotNull(view.getTransactions());
        Assert.assertEquals(0, view.getTransactions()
                                   .size());
    }

    @Test
    public void itShouldNotConvertNullValues() {
		this.disputeComponent.getTransactions()
                          .add(null);
		this.disputeComponent.getProbingQuestions()
                          .add(null);

		Assert.assertEquals(2, this.disputeComponent.getTransactions()
                                                 .size());
		Assert.assertEquals(2, this.disputeComponent.getProbingQuestions()
                                                 .size());

		DisputeComponentView view = this.converter.convert(this.disputeComponent);

        Assert.assertNotNull(view.getTransactions());
        Assert.assertEquals(1, view.getTransactions()
                                   .size());
        Assert.assertNotNull(view.getTransactions()
                                 .get(0));
        Assert.assertNotNull(view.getProbingQuestions());
        Assert.assertEquals(1, view.getProbingQuestions()
                                   .size());
        Assert.assertNotNull(view.getProbingQuestions()
                                 .get(0));
    }

	private DisputeComponent defaultTestDisputeDetail() {
		DisputeComponent disputeComponent = new DisputeComponent();
		disputeComponent.setDeliveryMethod("My Delivery Method");
		disputeComponent.setId(1L);

        List<DisputeProbingQuestion> questions = new ArrayList<>();
        DisputeProbingQuestion question = new DisputeProbingQuestion();
        question.setId(2L);
        question.setAnswer("My Answer");
        question.setQuestion("My Question");
        question.setCreatedBy(new User());
		question.setDisputeComponent(disputeComponent);
        questions.add(question);
		disputeComponent.setProbingQuestions(questions);

		List<DisputedTransaction> transactions = new ArrayList<>();
		DisputedTransaction transaction = new DisputedTransaction();
        transaction.setId(3L);
		transaction.setDisputeComponent(disputeComponent);
        transaction.setAmount("10.00");
        transaction.setBusinessDate(new Date());
        transaction.setCardNumber("123456******1234");
        transaction.setDeliveryChannelCode("deliveryCode");
        transaction.setMerchantName("merchantName");
        transaction.setRequestCode("requestCode");
        transaction.setResponseCode("responseCode");
        transaction.setTransactionId("123456789");
        transactions.add(transaction);
		disputeComponent.setTransactions(transactions);

		return disputeComponent;
    }
}
