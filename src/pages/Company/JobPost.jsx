import styled from "styled-components";
import { FaCirclePlus } from "react-icons/fa6";

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
  padding: 20px;
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

export default function JobPost() {
  return (
    <JobPostWrapper>
      <CompanyInfo>
        <CompanyName>네오테크(NeTech)</CompanyName>
        <ImgUpload>
          <FaCirclePlus size={24} color="#fff" />
        </ImgUpload>
      </CompanyInfo>
    </JobPostWrapper>
  );
}
