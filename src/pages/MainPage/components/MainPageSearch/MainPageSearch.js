import React from 'react'
import Select from 'react-select'

const MainPageSearch = () => {

    const options = [
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]

    return (
        <div className="mainPageSearch">
            <Select option={options}/>
        </div>
    );
};

export default MainPageSearch;
