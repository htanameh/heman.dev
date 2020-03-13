import React from 'react'
import { useStaticQuery, graphql } from 'gatsby'
import { Container, Card } from 'components/common'
import starIcon from 'assets/icons/star.svg'
import forkIcon from 'assets/icons/fork.svg'
import Chart from 'components/common/Frappe';
import { Wrapper, Grid, Item, Content, Stats } from './styles'

export const Projects = () => {
  const endDate = new Date();
  const startDate = new Date();
  startDate.setDate(startDate.getDate() - 365);
  const {
    github: {
      viewer: {
        repositories: { edges },
        contributionsCollection : { contributionCalendar}
      },
    },
  } = useStaticQuery(
    graphql`
      {
        github {
          viewer {
            repositories(first: 8, privacy: PUBLIC, orderBy: {field: STARGAZERS, direction: DESC}) {
              edges {
                node {
                  id
                  name
                  url
                  description
                  stargazers {
                    totalCount
                  }
                  forkCount
                }
              }
            }
            contributionsCollection {
              contributionCalendar {
                totalContributions
                colors
                weeks {
                  contributionDays {
                    date
                    contributionCount
                    weekday
                  }
                }
              }
            }
          }
        }
      }
    `
  )
  const dataPoints = contributionCalendar.weeks.reduce((obj ,week) => {
    const newObj = week.contributionDays.reduce((obj, day) => {
      return {
        ...obj,
        [`${new Date(day.date).getTime() / 1000}`] : day.contributionCount,
      }
    }, {});
    return {
      ...obj,
      ...newObj,
    }
  }, {});
  console.log(dataPoints);
  return (
    <Wrapper as={Container} id="projects">
      <h2>Projects</h2>
      <Grid>
        {edges.map(({ node }) => (
          <Item
            key={node.id}
            as="a"
            href={node.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Card>
              <Content>
                <h4>{node.name}</h4>
                <p>{node.description}</p>
              </Content>
              <Stats>
                <div>
                  <img src={starIcon} alt="stars" />
                  <span>{node.stargazers.totalCount}</span>
                </div>
                <div>
                  <img src={forkIcon} alt="forks" />
                  <span>{node.forkCount}</span>
                </div>
              </Stats>
            </Card>
          </Item>
        ))}
      </Grid>
      {/* Todo make heatmap responsive */}
      <div style={{ marginTop: '10px', marginLeft: '50px', width: '100px' }}>
        <Chart
          title="Github Contributions"
          type="heatmap"
          data={{
            dataPoints,
            start: startDate,
            end: endDate,
          }}
          discreteDomains={0}
          countLabel='commit'
        />
      </div>
    </Wrapper>
  )
}
