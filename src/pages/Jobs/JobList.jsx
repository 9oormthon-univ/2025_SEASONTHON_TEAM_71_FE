import styled from "styled-components"
import ex1 from "../../assets/img/ex1.svg"
import ex2 from "../../assets/img/ex2.svg"

export default function JobList () {
    return (
        <JobListWrapper>
            <JobListHeader>
                <Title>
                    <h4>AI가 분석한</h4>
                    <h1>상이 님에게 맞는 채용 공고</h1>
                </Title>
                 <AIRecom>
                    <JobCard>
                        <Logo>
                            <img src="/img/ex1.svg" />
                        </Logo>
                        <JobInfo>
                            <CompanyName>기업이름</CompanyName>
                            <JobTitle>직무명직무명</JobTitle>
                            <JobDetail>체험형 | 채용기간 | 요구역량및스킬키워드요약요구역량</JobDetail>
                        </JobInfo>
                    </JobCard>
                    <JobCard>
                        <Logo>
                            <img src="/img/ex2.svg" />
                        </Logo>
                        <JobInfo>
                            <CompanyName>기업이름</CompanyName>
                            <JobTitle>직무명직무명</JobTitle>
                            <JobDetail>체험형 | 채용기간 | 요구역량및스킬키워드요약요구역량</JobDetail>
                        </JobInfo>
                    </JobCard>
                 </AIRecom>
            </JobListHeader>

            <DivideLine />
        </JobListWrapper>
    )
}

const JobListWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    flex: 1;
`

const JobListHeader = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Title = styled.div`
    display: flex;
    flex-direction: column;
    text-align: left;
    width: 100%;
    height: 104px;
    background: linear-gradient(90deg, #1428C0 0%, #5697E1 50%, #DCFFC0 100%);

    h4 {
        font-size: 16px;
        font-family: "Pretendard-Medium";
        color: #FFFFFF;
    }

    h1 {
        font-size: 24px;
        font-family: "Pretendard-SemiBold";
        color: #FFFFFF;
    }
`

const AIRecom = styled.div`
    background-color: #F5F5F6;
    width: 100%;
    height: 178px;
    display: flex;
    flex-direction: column;
    /* justify-content: center;
    align-items: flex-start; */
    border: none;
    padding: 20px;
`
const JobCard = styled.div`
    display: flex;
    flex-direction: row;
    width: 100%;
`
const Logo = styled.div`
    img {
        width: 63px;
        height: 63px;
    }
`
const JobInfo = styled.div`
   display: flex;
   flex-direction: column;
   gap: 5px;
`
const CompanyName = styled.p`
    font-size: 10px;
    font-family: "Pretendard-Regular";
    color: #111111;
`
const JobTitle = styled.p`
    font-size: 16px;
    font-family: "Pretendard-Medium";
    color: #111111;
`
const JobDetail = styled.p`
    font-size: 10px;
    font-family: "Pretendard-Regular";
    color: #111111;
`

const DivideLine = styled.div`
    width: 100%;
    border-top: 1px solid #D9D9D9;
    margin: clamp(20px, 10vw, 40px) 0 clamp(10px, 5vw, 20px);
`