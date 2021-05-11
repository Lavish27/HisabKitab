export interface Metadata{
    filters: {
        content: {
            filterId: number, filterName: string, 
            filterType: string, filterOptionsUriSuffix: string, links: {href: string}[]
        }[]
    },

    columns:{
        content: {
            columnId: number, columnName: string, columnMappingName: string
        }[]
    }

}