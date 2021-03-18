import { Button, Card } from 'react-bootstrap'
import styled from 'styled-components'

const StyledStories = styled.div`
  overflow: scroll;
  margin-bottom: 100px;
  padding-bottom: 100px;
`

const StoryBox = ({ stories }) => {
  return (
    <StyledStories>
      <h1 >International News about COVID-19</h1>
      <div className="story-card-container">
        {stories.map((stories) => {
          return (
            <Card key={stories.id} style={{ width: '44.65vw' }}>
              <Card.Img
                variant='top'
                alt={stories.title}
                src={stories.urlToImage}
              />
              <Card.Body>
                <Card.Title>{stories.title}</Card.Title>
                <Card.Subtitle>{stories.publishedAt}.</Card.Subtitle>
                <Card.Text>{stories.description}</Card.Text>
                <Button variant='primary' target='_blank' href={stories.url}>
                  Go to story
                </Button>
              </Card.Body>
            </Card>
          )
        })}
      </div>
    </StyledStories>
  )
}

export default StoryBox
