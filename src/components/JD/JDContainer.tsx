import React from "react";
import styled from "styled-components";
import { jobDetails } from "../../services/JD/jdData";
import StateBox from "./StateBox";
import calendarIcon from "../../assets/icons/icon_calendar.svg";
import linkIcon from "../../assets/icons/icon_link.svg";

interface JobContainerProps {
  jdId: string;
}

const JDContainer: React.FC<JobContainerProps> = ({ jdId }) => {
  const jdData = jobDetails[1]; // api data로 변경 , id를 통해 api 호출

  return (
    <JobContainer>
      <div className="job_box">
        <JobStatusBar>
          <StateBox className="job_status" status={jdData.status} />
          <div className="job_date">{jdData.date}</div>
        </JobStatusBar>
        <JobTopBox>
          <JobTopTitleBox>
            <div className="job_detail_dday">{"D-" + jdData.dday}</div>
            <div className="job_detail_title">{jdData.title}</div>
          </JobTopTitleBox>
          <JobTopDescription>{jdData.description}</JobTopDescription>
          <JobSubBox>
            <div className="period">
              <img src={calendarIcon} alt="calendar" width={16} height={16} />
              {jdData.recruitmentPeriod}
            </div>
            <div className="link">
              <img src={linkIcon} alt="link" width={16} height={16} />
              <a
                href={jdData.link}
                className="link"
                target="_blank"
                rel="noopener noreferrer"
              >
                {jdData.link}
              </a>
            </div>
          </JobSubBox>
        </JobTopBox>
        <ScrollDiv>
          <JobBottomBox>
            <div dangerouslySetInnerHTML={{ __html: jdData.content }} />
          </JobBottomBox>
        </ScrollDiv>
      </div>
    </JobContainer>
  );
};

export default JDContainer;

const ScrollDiv = styled.div`
    overflow-y: auto;
    &::-webkit-scrollbar {
        width: 4px;
    }
    &::-webkit-scrollbar-thumb {
        border-radius: 2px;
        background: #ccc;
    }
    ::-webkit-scrollbar-track {
    }
`;

const JobContainer = styled.div`
    display: flex;
    flex-direction: column;
    width: 100%;
    height: 40rem;
    align-items: flex-start;
    gap: 0.625rem;
    //padding: 2rem;
    flex-shrink: 0;
    border-radius: 0.9rem;
    border: 1px solid var(--neutral-200, #EEEFF7);
    background: var(--neutral-0, #FFF);
    //min-height: 100rem;
`;

const JobTopBox = styled.div`
    display: flex;
    width: 100%;
    flex-direction: column;
    padding: 1.5rem;
    padding-bottom: 0rem;
`;

const JobStatusBar = styled.div`
    display: flex;
    width: 100%;
    flex-direction: row;
    padding: 0.75rem 2rem;
    height: 3rem;
    background: ${(props) => props.theme.colors.neutral50};
    border-top-right-radius: 0.9rem;
    border-top-left-radius: 0.9rem;
    align-items: center;
    .job_date {
        color:  ${(props) => props.theme.colors.neutral500};
        ${(props) => props.theme.fonts.cap1};
        margin-left: 1rem;
    }
    
`;

const JobTopTitleBox = styled.div`
    display: flex;
    width: 100%;
    justify-content: center;
    align-items: flex-start;
    gap: 0.75rem;
    color: var(--neutral-700, #343A5D);
    font-size: 1.4rem;
    font-style: normal;
    font-weight: 600;
    .job_detail_dday{
        display: flex;
        height: 1.5rem;
        min-width: 5rem;
        flex:1;
        padding: 0.25rem 0.5rem;
        justify-content: center;
        align-items: center;
        gap: 0.625rem;
        border-radius: 3.125rem;
        border: 1px solid var(--main-500, #7D82FF);
        color: var(--main-500, #7D82FF);
        text-align: center;
        font-size: 0.875rem;
        font-style: normal;
        font-weight: 500;
        margin-top: 0.25rem;
    }
    .job_detail_title{
        flex: 12;
        display: flex;
        text-align: center;
        align-items: center;
        padding-top: 0.25rem;
    }
`;

const JobTopDescription = styled.div`
    color: var(--neutral-600, #63698D);
    font-size: 1rem;
    font-style: normal;
    font-weight: 600;
    line-height: 1.25rem; 
    padding: 1rem 0;
`;

const JobSubBox = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: var(--neutral-500, #A6AAC0);
    font-size: 0.875rem;
    font-style: normal;
    font-weight: 500;
    padding-bottom: 1rem;
    border-bottom: 1px solid #EAEBF3;
    .period{
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
    .link{
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: var(--neutral-500, #A6AAC0);
        ${(props) => props.theme.fonts.link};
    }
`;

const JobBottomBox = styled.div`
    height: 23rem;
    color: var(--neutral-700, #343A5D);
    //overflow-y: scroll;
    margin: 0rem 0rem 2rem 2rem;
    div {
        padding-right: 1rem;
    }
`;
