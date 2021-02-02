package com.incomm.cca.model.view;

import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.runners.MockitoJUnitRunner;

@RunWith(MockitoJUnitRunner.class)
public class TogglzFeatureViewTest {

    @Test
    public void itShouldHaveOneGroup() throws NoSuchFieldException {
        TogglzFeatureView togglzFeatureView = new TogglzFeatureView("CODEX_CACHE_REFRESH", true);

        Assert.assertEquals(togglzFeatureView.getGroups().get(0), "Scheduled Tasks");
    }

    @Test
    public void itShouldHaveNoGroups() throws NoSuchFieldException {
        TogglzFeatureView togglzFeatureView = new TogglzFeatureView("GOOGLEANALYTICS", true);

        Assert.assertEquals(togglzFeatureView.getGroups().size(), 0);
    }
}
