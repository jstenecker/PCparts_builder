//This serves as the home page for the website, giving brief description of its purpose

const Home = () => {
    return (
        <div style={{ textAlign: 'center', margin: '2rem', padding: '1rem', fontFamily: 'Arial, sans-serif' }}>
            <h1>Welcome to PC Parts Builder!</h1>
            <p style={{ fontSize: '1.2rem', lineHeight: '1.6rem', color: '#333', maxWidth: '600px', margin: '1rem auto' }}>
                At PC Parts Builder, we make it easy to build your dream PC! Whether you are a gamer, creator, or enthusiast, 
                our platform helps you find compatible parts tailored to your needs.
            </p>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.6rem', color: '#555', maxWidth: '600px', margin: '1rem auto' }}>
                Use our intuitive PC Parts Builder tool to mix and match components like CPUs, GPUs, motherboards, RAM, 
                and more. Avoid compatibility headaches as we guide you to create a perfectly compatible build with 
                seamless functionality.
            </p>
            <p style={{ fontSize: '1.1rem', lineHeight: '1.6rem', color: '#555', maxWidth: '600px', margin: '1rem auto' }}>
                Get started now and bring your ideal PC to life!
            </p>
        </div>
    );
};

export default Home;
