package com.backend.inquiry.service;

import com.backend.inquiry.dto.request.CreateInquiryDto;
import com.backend.inquiry.dto.response.InquiryDto;
import com.backend.inquiry.entity.Inquiry;
import com.backend.inquiry.repository.InquiryRepository;
import com.backend.member.jwt.SecurityUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class InquiryServiceImpl implements InquiryService{
    private final InquiryRepository inquiryRepository;
    @Override
    public List<InquiryDto> getInquiry() {
        String currentMemberId = SecurityUtils.getCurrentMemberId().get();
        List<InquiryDto> inquiryDtos = inquiryRepository.findByMemberId(currentMemberId)
                .stream()
                .map(InquiryDto::of)
                .collect(Collectors.toList());
        return inquiryDtos;
    }

    @Override
    public void createInquiry(CreateInquiryDto createInquiryDto) {
        String currentMemberId = SecurityUtils.getCurrentMemberId().get();
        Inquiry inquiry = Inquiry.builder()
                .memberId(currentMemberId)
                .inquiryTitle(createInquiryDto.getInquiryTitle())
                .inquiryContent(createInquiryDto.getInquiryContent())
                .inquiryCategory(createInquiryDto.getInquiryCategory())
                .build();
        inquiryRepository.save(inquiry);
    }
}
