package bf.baba.customerservice.web;

import bf.baba.customerservice.config.GlobalConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RefreshScope
public class ConfigTestController {

    @Autowired
    private GlobalConfig globalConfig;

    @GetMapping("/globalconfig")
    public GlobalConfig globalConfig(){
        return globalConfig;
    }
}
