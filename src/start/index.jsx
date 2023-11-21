import Carousel from "react-bootstrap/Carousel";

function Start() {
  return (
    <Carousel data-bs-theme="dark" style={{ marginTop: "4rem" }}>
      <Carousel.Item>
        <img
          style={{ display: "center", width: "950px" }}
          src="./src/components/img/slide1.jpg"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          src="./src/components/img/slide2.jpg"
          alt="Second slide"
          style={{ display: "center", width: "950px" }}
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          style={{ display: "center", width: "950px" }}
          src="./src/components/img/slide3.jpg"
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default Start;
