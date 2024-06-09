import styles from './Pagination.module.scss'

interface PaginationProps {
    currentPage: number,
    totalPages: number,
    handlePageChange: Function
}

const Pagination: React.FC<PaginationProps> = ({currentPage, totalPages, handlePageChange}) => {
    return (
        <div className={styles.pagination}>
            <div className={styles.buttons}>
                <button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    Previous
                </button>
                <button 
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages} 
                    >
                    Next
                </button>
            </div>
            <div> Page {currentPage} of {totalPages} </div>
        </div>
    )
}

export default Pagination