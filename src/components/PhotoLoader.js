import React from 'react';
const PhotoLoader = ({photo}) => {
    return (
        <div className={'photoLoader_wrap'}>
            <div className={'photoLoader_quote_1'}>
                "
            </div>
            <div className={'photoLoader_content'}>
                <img src={photo} className={'photoLoader_photo'} alt={photo}/>
            </div>
            <div className={'photoLoader_quote_2'}>
                "
            </div>
        </div>
    );
}
export default PhotoLoader;