import React from "react";
import styled, { css } from "styled-components";
import { JobAnnouncement } from "../../services/JD/jdData";

interface JobAnnouncementProps {
  announcement: JobAnnouncement;
}

const JobAnnouncementCard: React.FC<JobAnnouncementProps> = ({
  announcement,
}) => {
  const { title, description, recruitmentPeriod, status, dday } = announcement;

  return (
    <Container>
      <TopContainer>
        <StatusContainer>
          {status !== "마감" && <DdayContainer>{"D-" + dday}</DdayContainer>}
          {status !== "작성전" && <StateBox status={status}>{status}</StateBox>}
        </StatusContainer>
        <DateContainer>24.01.19</DateContainer>
      </TopContainer>
      <Title>{title}</Title>
      <Description>{description}</Description>
      <Info>{"모집기간: " + recruitmentPeriod}</Info>
    </Container>
  );
};

const Container = styled.div`
    border-radius: 0.75rem;
    display: flex;
    padding: 1.25rem;
    flex-direction: column;
    border: 1px solid var(--neutral-200, #EEEFF7);
    background: var(--neutral-0, #FFF);
`;

const TopContainer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-bottom: 1.25rem;
`;

const DdayContainer = styled.div`
    display: flex;
    font-size: 0.8rem;
    padding: 0.25rem 0.7rem;
    justify-content: center;
    align-items: center;
    gap: 0.625rem;
    border-radius: 2.5rem;
    margin-right: 0.5rem;
    color: #7D82FF;
    border: 1px solid var(--main-500, #7D82FF);
`;

const DateContainer = styled.div`
    color: var(--neutral-600, #63698D);
    text-align: right;
    font-size: 0.8rem;
    font-style: normal;
    font-weight: 400;
    line-height: 150%; 
    letter-spacing: 0.00463rem;
`;

const StatusContainer = styled.div`
    display: flex;
    flex-direction: row;
`;

const StateBox = styled.div<{ status?: string }>`
  padding: 0.25rem 0.7rem;
  border-radius: 0.25rem;
  font-size: 0.8rem;
  background-color: ${(props) => {
    switch (props.status) {
      case "작성중":
        return "#E5E6FF";
      case "지원완료":
        return "#E5E6FF";
      case "작성완료":
        return "#FFF5D1";
      case "마감":
        return "#EEEFF7";
      default:
        return "transparent";
    }
  }};
  color: ${(props) => {
    switch (props.status) {
      case "작성중":
        return "#5C70DB";
      case "지원완료":
        return "#5C70DB";
      case "작성완료":
        return "#FFA63E";
      case "마감":
        return "#63698D";
      default:
        return "transparent";
    }
  }};
`;

const Title = styled.div`
    color:#343A5D;
    font-size: 1rem;
    font-style: normal;
    font-weight: 500;
`;

const Description = styled.div`
    color: var(--neutral-600, #63698D);
    font-size: 0.8rem;
    font-weight: 500;
`;

const Info = styled.div`
    font-weight: bold;
    color: var(--neutral-500, #A6AAC0);
    font-size: 0.8rem;
    font-style: normal;
    font-weight: 400;
    margin-top: 1rem;
    line-height: 150%;
    letter-spacing: 0.00463rem;
`;

export default JobAnnouncementCard;
