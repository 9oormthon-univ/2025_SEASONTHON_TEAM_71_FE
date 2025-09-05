import styled from "styled-components";
import { useState } from "react";
import { FaCirclePlus } from "react-icons/fa6";
import { IoMdArrowDropdown } from "react-icons/io";

const JobPostWrapper = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
`;

const CompanyInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 8px 20px;
  text-align: center;
`;

const CompanyName = styled.div`
  font-size: 20px;
  color: #111;
  margin-bottom: 12px;
  font-weight: 500;
`;

const ImgUpload = styled.div`
  width: 120px;
  height: 120px;
  background-color: #d9d9d9;
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`;

const FormContent = styled.div`
  padding: 0 20px;
`;

const DropdownContainer = styled.div`
  margin-bottom: 8px;
  position: relative;
`;

const Dropdown = styled.select`
  width: 100%;
  height: 48px;
  padding: 0 40px 0 8px;
  border: 1px solid #999;
  border-radius: 8px;
  background-color: #ffffff;
  font-size: 13px;
  color: #999;
  cursor: pointer;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;

  &:focus {
    outline: none;
  }
`;

const DropdownIcon = styled.div`
  position: absolute;
  right: 12px;
  top: 0;
  height: 48px;
  display: flex;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  color: #999;
`;

const Input = styled.input`
  width: 100%;
  height: 48px;
  padding: 0 8px;
  border: none;
  border-bottom: 2px solid #999;
  background-color: #ffffff;
  font-size: 13px;
  color: #999;
  margin-bottom: 16px;
  box-sizing: border-box;

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: #999999;
  }
`;

const DetailUploadArea = styled.div`
  width: 100%;
  height: 74px;
  background-color: #fff;
  border: 1px solid #999;
  border-radius: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-bottom: 4px;
  cursor: pointer;
`;

const DetailUploadText = styled.span`
  font-size: 16px;
  color: #111;
`;

const NoteText = styled.p`
  font-size: 10px;
  color: #666;
  text-align: right;
  margin-right: 8px;
`;

export default function JobPost() {
  const [selectedJob, setSelectedJob] = useState("");
  const [selectedType, setSelectedType] = useState("");
  const [selectedPeriod, setSelectedPeriod] = useState("");
  const [skills, setSkills] = useState("");

  return (
    <JobPostWrapper>
      {/* 기업정보 */}
      <CompanyInfo>
        <CompanyName>네오테크(NeTech)</CompanyName>
        <ImgUpload>
          <FaCirclePlus size={24} color="#fff" />
        </ImgUpload>
      </CompanyInfo>

      {/* 직무/형태/기간 선택 */}
      <FormContent>
        {/* 직무 선택 */}
        <DropdownContainer>
          <Dropdown
            value={selectedJob}
            onChange={(e) => setSelectedJob(e.target.value)}
          >
            <option value="">직무를 선택해주세요.</option>
            <option value="frontend">프론트엔드 개발자</option>
            <option value="backend">백엔드 개발자</option>
            <option value="fullstack">풀스택 개발자</option>
            <option value="designer">UI/UX디자이너</option>
          </Dropdown>
          <DropdownIcon>
            <IoMdArrowDropdown size={20} />
          </DropdownIcon>
        </DropdownContainer>
        {/* 형태 선택 */}
        <DropdownContainer>
          <Dropdown
            value={selectedType}
            onChange={(e) => setSelectedType(e.target.value)}
          >
            <option value="">채용형태를 선택해주세요.</option>
            <option value="fulltime">정규직</option>
            <option value="contract">계약직</option>
            <option value="intern">인턴</option>
            <option value="parttime">파트타임</option>
          </Dropdown>
          <DropdownIcon>
            <IoMdArrowDropdown size={20} />
          </DropdownIcon>
        </DropdownContainer>

        {/* 기간 선택 */}
        <DropdownContainer>
          <Dropdown
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
          >
            <option value="">채용기간을 선택해주세요.</option>
            <option value="immediate">즉시 채용</option>
            <option value="1month">1개월</option>
            <option value="3months">3개월</option>
            <option value="6months">6개월</option>
            <option value="1year">1년</option>
          </Dropdown>
          <DropdownIcon>
            <IoMdArrowDropdown size={20} />
          </DropdownIcon>
        </DropdownContainer>

        {/* 요구 역량 */}
        <Input
          placeholder="요구 역량 및 스킬 키워드를 간단히 작성해주세요."
          value={skills}
          onChange={(e) => setSkills(e.target.value)}
        />

        {/* 상세 설명 첨부 */}
        <DetailUploadArea>
          <DetailUploadText>채용직무 상세설명 첨부</DetailUploadText>
        </DetailUploadArea>

        <NoteText>공고 등록시 수정이 불가합니다</NoteText>
      </FormContent>

      {/* 취소/등록 버튼 */}
    </JobPostWrapper>
  );
}
