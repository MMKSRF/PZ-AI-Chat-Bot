import {useState} from "react";
import {createContext} from "react"
import PropTypes from "prop-types";

const UserPromptContext = createContext()

function UserPromptProvider({ children }) {
    const [input, setInput] = useState("");



    return <UserPromptContext.Provider value={{
        input,
        setInput
    }}>
        {children}
    </UserPromptContext.Provider>
}


UserPromptProvider.propTypes = {
    children: PropTypes.node.isRequired,
}

export default UserPromptProvider;