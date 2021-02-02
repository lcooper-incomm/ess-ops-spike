package com.incomm.cca.service;

import com.incomm.cca.model.view.external.zippopotamus.ZippopotamusPlaceView;
import com.incomm.cca.model.view.external.zippopotamus.ZippopotamusResponseView;
import org.junit.Assert;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.runners.MockitoJUnitRunner;

import java.util.Arrays;

@RunWith(MockitoJUnitRunner.class)
public class ZippopotamusServiceTest {

    @Test
    public void trimLongZipCode() {
        ZippopotamusResponseView view = new ZippopotamusResponseView();
        ZippopotamusPlaceView place = new ZippopotamusPlaceView();
        view.setPlaces(Arrays.asList(place));

        place.setPlaceName("Salt Lake City");
        view.trimCity();
        Assert.assertEquals(place.getPlaceName(), "Salt Lake City");

        place.setPlaceName("Salt Lake City (Millcreek)");
        view.trimCity();
        Assert.assertEquals(place.getPlaceName(), "Salt Lake City");
    }
}
