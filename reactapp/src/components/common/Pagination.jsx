import { Button } from 'react-bootstrap'
import React from 'react'

const PaginationSection = ({ pages, handlePage, currentPage }) => {
    for (let i = 0; i < pages; i++) {
        return (
            <div>
                <Button style={{ backgroundColor: '#F251511a' ,borderColor:'#F25151'}} >{i + 1}</Button>
            </div>
        )
    }
}

export default PaginationSection