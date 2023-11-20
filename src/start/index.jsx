import Carousel from 'react-bootstrap/Carousel';

function Start() {
  return (
    <Carousel data-bs-theme="dark" style={{marginTop: "4rem"}}>
      <Carousel.Item
      >
        <img
          style={{display: "center", width: "950px"}}
          src="https://markey.id/wp-content/uploads/2019/01/20190103.jpg"
          alt="First slide"
        />
        <Carousel.Caption>
          <h5>First slide label</h5>
          <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          src="https://markey.id/wp-content/uploads/2019/01/20190103.jpg"
          alt="Second slide"
          style={{display: "center", width: "950px"}}
        />
        <Carousel.Caption>
          <h5>Second slide label</h5>
          <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
        </Carousel.Caption>
      </Carousel.Item>
      <Carousel.Item>
        <img
          style={{display: "center", width: "950px"}}
          src="https://markey.id/wp-content/uploads/2019/01/20190103.jpg"
          alt="Third slide"
        />
        <Carousel.Caption>
          <h5>Third slide label</h5>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption>
      </Carousel.Item>
    </Carousel>
  );
}

export default Start;