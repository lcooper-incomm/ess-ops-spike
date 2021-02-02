package com.incomm.cca.model.domain.session.dispute;

import com.incomm.cca.model.domain.User;
import org.junit.Before;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.runners.MockitoJUnitRunner;

@RunWith( MockitoJUnitRunner.class )
public class DisputeProbingQuestionTest {
	
	private DisputeProbingQuestion question;
	
	@Before
	public void init() {
		question = new DisputeProbingQuestion();
        question.setDisputeComponent(new DisputeComponent());
		question.setCreatedBy( new User() );
		question.setQuestion( "My question" );
		question.setAnswer( "My answer" );
	}
	
	@Test
	public void itShouldValidateSuccessfully() {
		question.validate();
	}
	
	@Test( expected = IllegalArgumentException.class )
	public void itShouldRequireDisputeComponent() {
		question.setDisputeComponent( null );
		question.validate();
	}
	
	@Test( expected = IllegalArgumentException.class )
	public void itShouldRequireCreatedBy() {
		question.setCreatedBy( null );
		question.validate();
	}
	
	@Test( expected = IllegalArgumentException.class )
	public void itShouldRequireQuestion() {
		question.setQuestion( null );
		question.validate();
	}
	
	@Test( expected = IllegalArgumentException.class )
	public void itShouldRequireAnswer() {
		question.setAnswer( null );
		question.validate();
	}
	
	@Test( expected = IllegalArgumentException.class )
	public void itShouldCheckQuestionLength() {
		question.setAnswer( "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?" );
		question.validate();
	}
	
	@Test( expected = IllegalArgumentException.class )
	public void itShouldCheckAnswerLength() {
		question.setAnswer( "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui dolorem eum fugiat quo voluptas nulla pariatur?" );
		question.validate();
	}
	
	
}
