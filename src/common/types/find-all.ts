export interface FindAll<T> {
    result: T[]
    pagination: {
        currentPage: number
        nextPage: number
        prevPage: number
        hasNextPage: boolean
        hasPrevPage: boolean
        lastPage: number
        count: number
        take: number
    }
}
