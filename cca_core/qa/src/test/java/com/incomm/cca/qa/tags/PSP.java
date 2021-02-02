package com.incomm.cca.qa.tags;

import org.junit.jupiter.api.Tag;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

/**
 * Created by gscholes on 10/16/2019
 */
@Target( { ElementType.TYPE, ElementType.METHOD })
@Retention( RetentionPolicy.RUNTIME)
@Tag( "PSP")
public @interface PSP {
}
