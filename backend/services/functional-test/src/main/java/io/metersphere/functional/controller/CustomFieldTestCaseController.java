package io.metersphere.functional.controller;

import jakarta.annotation.Resource;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import io.metersphere.functional.service.CustomFieldTestCaseService;


@RestController
@RequestMapping("/custom/field/test/case")
public class CustomFieldTestCaseController {

    @Resource
    private CustomFieldTestCaseService customFieldTestCaseService;

}