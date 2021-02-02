package com.incomm.cca.service;

import com.incomm.cca.model.domain.session.Session;
import com.incomm.cca.model.domain.session.dispute.DisputeComponent;
import com.incomm.cca.model.domain.session.dispute.DisputedTransaction;
import com.incomm.cca.repository.DisputedTransactionRepository;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.runners.MockitoJUnitRunner;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Map;

@RunWith(MockitoJUnitRunner.class)
public class DisputeServiceTest {

    @InjectMocks
    private DisputeService disputeService;

    @Mock
    private DisputedTransactionRepository disputedTransactionRepository;

    @Test
    public void findDisputedTransactions_WithMultipleDisputes() {
        String transactionId = "1";

        Session session1 = mockSession(1L);
        Session session2 = mockSession(2L);
        List<DisputedTransaction> disputedTransactions = Arrays.asList(
                mockDisputedTransaction(transactionId, session1),
                mockDisputedTransaction(transactionId, session2)
        );
        Mockito.when(disputedTransactionRepository.findByTransactionIdIn(Collections.singletonList(transactionId)))
               .thenReturn(disputedTransactions);

        Map<String, DisputedTransaction> result = disputeService.findDisputedTransactions(Collections.singletonList(transactionId));

        Assert.assertEquals(1, result.size());
        DisputedTransaction expected = disputedTransactions.get(0);
        DisputedTransaction actual = result.get(transactionId);
        Assert.assertEquals(expected, actual);
        Assert.assertEquals(session1, actual.getDisputeComponent()
                                            .getSession());
    }

    private DisputedTransaction mockDisputedTransaction(String transactionId, Session session) {
        DisputedTransaction disputedTransaction = new DisputedTransaction();
        disputedTransaction.setTransactionId(transactionId);

        DisputeComponent disputeComponent = new DisputeComponent();
        disputeComponent.setSession(session);
        disputedTransaction.setDisputeComponent(disputeComponent);

        return disputedTransaction;
    }

    private Session mockSession(Long id) {
        Session session = new Session();
        session.setId(id);
        return session;
    }
}
