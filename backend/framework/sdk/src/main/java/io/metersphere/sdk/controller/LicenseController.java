package io.metersphere.sdk.controller;

import io.metersphere.sdk.constants.PermissionConstants;
import io.metersphere.sdk.dto.LicenseDTO;
import io.metersphere.sdk.log.annotation.Log;
import io.metersphere.sdk.log.constants.OperationLogType;
import io.metersphere.sdk.service.LicenseLogService;
import io.metersphere.sdk.service.LicenseService;
import io.metersphere.sdk.util.CommonBeanFactory;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.apache.shiro.authz.annotation.Logical;
import org.apache.shiro.authz.annotation.RequiresPermissions;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/license")
@Tag(name="license校验")
public class LicenseController {
    @GetMapping("/validate")
    @Operation(summary = "license校验")
    public LicenseDTO validate() {
        LicenseService licenseService = CommonBeanFactory.getBean(LicenseService.class);
        if (licenseService != null) {
            return licenseService.validate();
        }
        return new LicenseDTO();
    }

    @PostMapping("/add")
    @Operation(summary = "添加有效的License")
    @RequiresPermissions(value= {PermissionConstants.SYSTEM_AUTH_READ, PermissionConstants.SYSTEM_AUTH_READ_UPDATE}, logical = Logical.OR)
    @Log(type = OperationLogType.ADD, expression = "#msClass.addLog()", msClass = LicenseLogService.class)
    public LicenseDTO addLicense(@RequestBody String licenseCode) {
        LicenseService licenseService = CommonBeanFactory.getBean(LicenseService.class);
        if (licenseService != null) {
            return licenseService.addLicense(licenseCode);
        }
        return new LicenseDTO();
    }
}
