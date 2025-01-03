const images = [
    { src: "/assets/image1.jpg", caption: "High-performance CPUs for your PC build." },
    { src: "/assets/image2.jpg", caption: "Next-generation GPUs for immersive gaming." },
    { src: "/assets/image3.jpg", caption: "Reliable RAM to enhance system performance." },
  ];
  
  const Home = () => {
    return (
      <div style={styles.container}>
        <h1 style={styles.title}>Welcome to PC Parts Builder!</h1>
        <p style={styles.description}>
          At PC Parts Builder, we make it easy to build your dream PC! Whether you are a gamer, creator, or enthusiast, our platform helps you find compatible parts tailored to your needs.
        </p>
        <p style={styles.description}>
          Use our intuitive PC Parts Builder tool to mix and match components like CPUs, GPUs, motherboards, RAM, and more. Avoid compatibility headaches as we guide you to create a perfectly compatible build with seamless functionality.
        </p>
        <p style={styles.description}>
          Get started now and bring your ideal PC to life!
        </p>
        <div style={styles.imagesWrapper}>
          {images.map((image, index) => (
            <div key={index} style={styles.imageContainer}>
              <img src={image.src} alt={image.caption} style={styles.image} />
              <p style={styles.caption}>{image.caption}</p>
            </div>
          ))}
        </div>
      </div>
    );
  };
  
  const styles = {
    container: {
      textAlign: "center",
      margin: "0 auto",
      padding: "1rem",
      fontFamily: "Arial, sans-serif",
      maxWidth: "100%", // Ensure no horizontal scroll
      overflowX: "hidden", // Prevent horizontal scroll
    },
    title: {
      fontSize: "2.5rem",
      color: "#333",
      marginBottom: "1rem",
    },
    description: {
      fontSize: "1.2rem",
      lineHeight: "1.6rem",
      color: "#555",
      maxWidth: "600px",
      margin: "1rem auto",
    },
    imagesWrapper: {
      display: "flex",
      flexDirection: "column",
      gap: "2rem",
      marginTop: "2rem",
      alignItems: "center",
    },
    imageContainer: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
    image: {
      width: "100%",
      maxWidth: "600px",
      borderRadius: "8px",
      boxShadow: "0 4px 10px rgba(0, 0, 0, 0.3)",
      marginBottom: "0.5rem",
    },
    caption: {
      fontSize: "1rem",
      color: "#777",
      textAlign: "center",
    },
  };
  
  export default Home;
  