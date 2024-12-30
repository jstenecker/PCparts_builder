import Button from "./Button";

const Navbar = () => {
    return (
        <>
        <Button label="Home" route="/"/>
        <Button label="Login" route="/login"/>
        <Button label="PC Builder" route="/pcbuilder"/>
        <Button label="Contact" route="/contact"/>
        </>
    )
}

export default Navbar;