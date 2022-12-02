import React, {useContext} from "react";
import Container from "./common/Container";
import { AuthContext } from "./poviders/AuthProvider";

const Home = () => {
    const [auth] = useContext(AuthContext);

    return (
        <h1>Home</h1>
    )
}

export default Home;