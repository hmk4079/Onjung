package com.app.back.controller.profile;

import com.app.back.domain.profile.ProfileDTO;
import com.app.back.service.profile.ProfileService;
import lombok.RequiredArgsConstructor;
import net.coobird.thumbnailator.Thumbnailator;
import org.springframework.stereotype.Controller;
import org.springframework.util.FileCopyUtils;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.*;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.UUID;

@Controller
@RequestMapping("/profile")
@RequiredArgsConstructor
public class ProfileController {
    private final ProfileService profileService;

    @PostMapping("/upload")
    @ResponseBody
    public ProfileDTO upload(@RequestParam("file") MultipartFile file,
                             @RequestParam("memberId") Long memberId) throws IOException {
        String rootPath = "C:/upload/" + getPath();
        UUID uuid = UUID.randomUUID();

        File directory = new File(rootPath);
        if (!directory.exists()) {
            directory.mkdirs();
        }

        String originalFilename = file.getOriginalFilename();
        String newFileName = uuid.toString() + "_" + originalFilename;
        File savedFile = new File(rootPath, newFileName);

        file.transferTo(savedFile);

        ProfileDTO profileDTO = new ProfileDTO();
        profileDTO.setProfileFileName(newFileName);
        profileDTO.setProfileFilePath(getPath());
        profileDTO.setProfileFileSize(file.getSize());
        profileDTO.setProfileFileType(file.getContentType());
        profileDTO.setMemberId(memberId);

        if (file.getContentType() != null && file.getContentType().startsWith("image")) {
            String thumbnailFileName = "t_" + newFileName;
            File thumbnailFile = new File(rootPath, thumbnailFileName);
            try (InputStream inputStream = new FileInputStream(savedFile);
                 FileOutputStream fileOutputStream = new FileOutputStream(thumbnailFile)) {
                Thumbnailator.createThumbnail(inputStream, fileOutputStream, 100, 100);
            }
            profileDTO.setProfileFileName(thumbnailFileName);
        }

        profileService.save(profileDTO);

        return profileDTO;
    }

    private String getPath() {
        return LocalDate.now().format(DateTimeFormatter.ofPattern("yyyy/MM/dd"));
    }

    @GetMapping("/display")
    @ResponseBody
    public byte[] display(@RequestParam("memberId") Long memberId) throws IOException {
        ProfileDTO profileDTO = profileService.selectByMemberId(memberId);
        if (profileDTO == null) {
            // 기본 이미지 반환
            String defaultImagePath = "C:/upload/default_profile.jpg";
            File defaultImageFile = new File(defaultImagePath);
            return FileCopyUtils.copyToByteArray(defaultImageFile);
        }

        String displayPath = "C:/upload/" + profileDTO.getProfileFilePath() + "/" + profileDTO.getProfileFileName();
        File file = new File(displayPath);
        return FileCopyUtils.copyToByteArray(file);
    }
}
