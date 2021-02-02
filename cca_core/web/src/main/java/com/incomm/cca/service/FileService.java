package com.incomm.cca.service;

import com.incomm.cscore.client.job.model.response.job.JobFilePasswordResponse;
import com.incomm.cscore.logging.CsCoreLogger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.io.BufferedReader;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;

@Service
public class FileService {

    @Autowired
    private MinionService minionService;

    public String parseCardNumbersFromCsv(InputStream inputStream) throws Exception {
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(inputStream, StandardCharsets.UTF_8))) {
            String contents = "";
            String line = null;
            while ((line = reader.readLine()) != null) {
                contents += line;
            }

            return contents;
        } catch (Exception e) {
            CsCoreLogger.error("Failed to parse card numbers from CSV")
                        .exception(e)
                        .build();
            throw e;
        }
    }

    public byte[] downloadMinionFile(String uuid) {
        try {
            return minionService.downloadFile(uuid);
        } catch (Exception e) {
            CsCoreLogger.error("Failed to download file from Minion")
                        .keyValue("uuid", uuid)
                        .exception(e)
                        .build();
            throw e;
        }
    }

    public String getContentDisposition(String filename) {
        return String.format("attachment; filename=%s", filename);
    }

    public JobFilePasswordResponse getMinionFilePassword(String uuid) {
        try {
            return minionService.getFilePassword(uuid);
        } catch (Exception e) {
            CsCoreLogger.error("Failed to find file password from Minion")
                        .keyValue("uuid", uuid)
                        .exception(e)
                        .build();

            throw e;
        }
    }
}
