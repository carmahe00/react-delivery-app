import { useState } from "react"

export const useForm = <T extends object>(initState: T)=>{
    const [state, setState] = useState(initState);

    const onChange = <K extends Object | string>(value: K, field: keyof T ) =>{
        setState({
            ...state,
            [field]: value
        })
    }

    const onChangeAllFields = (newSate:Partial<T>) =>{
        setState({
            ...state,
            newSate
        })
    }

    const resetForm = () => {
        setState(initState)
    }

    const isValidEmail = (email: string) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
    }

    const isNotEmptyString = (character: string) => {
        return character === ""
    }

    const compareFieldsEquals = (fieldOne: keyof T, fieldTwo: keyof T) =>{
        return state[fieldOne] === state[fieldTwo] ? true : false;
    }
    
    return {
        ...state,

        // properties
        form:state,

        // Methods
        isValidEmail,
        onChange,
        resetForm,
        isNotEmptyString,
        compareFieldsEquals,
        onChangeAllFields
    }
}