/* eslint-disable react/prop-types */
import { Helmet } from "react-helmet-async";



export default function Meta({title,description,keywords}){

    return (
        <Helmet>    
            <title>{title}</title>
            <meta name="description" content={description}  />
            <meta name="keywords" content={keywords}  />
        </Helmet>
    )
}

Meta.defaultProps = {
    title:'E-commerce shop',
    description:'Buy everything you need from online',
    keywords:'books,electronics,grocery,dairy'
}