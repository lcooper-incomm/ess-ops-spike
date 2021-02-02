package com.incomm.cca.controller;

import org.springframework.boot.web.servlet.error.ErrorController;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class RedirectController implements ErrorController {

    @GetMapping({"/search/**", "/detail/**", "/profile/**", "/reports/**", "/services/**", "/control-panel/**", "/login/**", "/dashboard/**", "/case-workspace/**"})
    public String angularRedirect() {
        return "/";
    }

    @GetMapping("/error")
    public String error() {
        return "error-page.html";
    }

    @Override
    public String getErrorPath() {
        return "/error";
    }
}
