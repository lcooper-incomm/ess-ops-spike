package com.incomm.cca;

import com.incomm.cca.togglz.TogglzFeature;
import org.junit.Before;
import org.junit.Rule;
import org.mockito.MockitoAnnotations;
import org.springframework.boot.test.context.SpringBootTest;
import org.togglz.junit.TogglzRule;

/**
 * Created by Allen on 10/5/2016.
 */
@SpringBootTest( classes = { ApplicationTest.class } )
public class CCATest {
	
	@Rule
	public TogglzRule togglzRule = TogglzRule.allEnabled( TogglzFeature.class );
	
	@Before
	public void initMocks() {
		MockitoAnnotations.initMocks( this );
	}
}
