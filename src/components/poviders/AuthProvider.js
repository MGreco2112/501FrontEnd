import React, {useEffect, useState} from "react";

const AuthContext = React.createContext([{}, () => {}]);

const AuthProvider = (props) => {
    const [auth, setAuth] = useState({
        token: null,
        profile: null,
        roles: []
    });

    return (
        <AuthContext.Provider value={[auth, setAuth]}>
            {props.children}
        </AuthContext.Provider>
    )
}

export {AuthContext, AuthProvider};