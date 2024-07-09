import React, { useState } from 'react'

const SearchOptions = ({setListFilter, list }) => {
    const [selectOptionOfSearching, setSelectOptionOfSearching] = useState("בחר אופן חיפוש");
    const optionOfSearching = [
        'ת"ז',
        "נקה סינון"
    ]
    const onOptionOfSearchingChangeHandler = (event) => {
        setSelectOptionOfSearching(event.target.value);
        if (event.target.value ==="נקה סינון")
            setListFilter([...list]);
    }
    const handleChangeTitle = (event) => {
        setListFilter([...list].filter((object) =>String(object.userId).includes(event.target.value)));
    }
    return (
        <>
            <h3>אפשרויות חיפוש</h3>
            <select onChange={onOptionOfSearchingChangeHandler}>
                <option>בחר אופן חיפוש</option>
                {optionOfSearching.map((option, index) => {
                    return (
                        <option key={index}>
                            {option}
                        </option>
                    );
                })}
            </select>
            {selectOptionOfSearching === 'ת"ז' &&
                <input
                    type="text"
                    placeholder='הכנס ת"ז'
                    onChange={handleChangeTitle}
                />}
        </>
    )
}

export default SearchOptions