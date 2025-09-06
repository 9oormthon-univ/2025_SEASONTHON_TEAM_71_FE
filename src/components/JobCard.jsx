// components/common/JobCard.jsx
import React from "react";
import styled from "styled-components";

function JobCard({
  companyName,
  title,
  summary,
  logoUrl,
  href,
  onClick,
  variant = "default",
  className,
}) {
  const content = (
    <>
      <Logo>
        <img
          src={logoUrl || "/img/logo-fallback.svg"}
          alt={`${companyName} logo`}
          loading="lazy"
          onError={(e) => {
            e.currentTarget.src = "/img/logo-fallback.svg";
          }}
        />
      </Logo>

      <JobInfo>
        <CompanyName>{companyName}</CompanyName>
        <JobTitle $variant={variant}>{title}</JobTitle>
        <JobDetail title={summary}>{summary}</JobDetail>
      </JobInfo>
    </>
  );

  return (
    <CardButton type="button" className={className} onClick={onClick}>
      {content}
    </CardButton>
  );
}

export default JobCard;

/* ===== styles ===== */
const baseCard = `
    display: flex;
    flex-direction: row;
    gap: 12px;
    width: 100%;
    border: none;
    text-align: left;
    background: none;
    padding: 0;
    height: 67px;
`;

const CardButton = styled.button`
  ${baseCard};
  border: none;
  cursor: pointer;
`;

const Logo = styled.div`
  /* border: 1px solid #D9D9D9;
    background-color: #FFFFFF;
    width: 63px;
    height: 63px; */

  img {
    width: 63px;
    height: 63px;
  }
`;
const JobInfo = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 63px;
`;
const CompanyName = styled.p`
  font-size: 10px;
  font-family: "Pretendard-Regular";
  color: #111111;
  line-height: 140%;
`;
const JobTitle = styled.p`
  font-size: 16px;
  font-family: "Pretendard-Medium";
  color: #111111;
  line-height: 140%;
`;
const JobDetail = styled.p`
  font-size: 10px;
  font-family: "Pretendard-Regular";
  color: #444444;
  margin-top: 5px;
`;
