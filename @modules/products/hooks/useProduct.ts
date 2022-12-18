import { IProduct, useProductStore } from "@shared";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";

export const useProduct = () => {
    const {getProduct} = useProductStore();
    const {query:{page , limit, search}, replace, isReady} = useRouter();
    const [products, setProducts] = useState<{data?:IProduct[], total?: number} | null>(null);
    const [queryParam , setQueryParam] = useState<{page: number, limit: number, search: string}>({page: 1, limit: 10, search: ''});

    useEffect(() => {
        if(!isReady) return 
        const nPage = page ? +page : 1;
        const nLimit = limit ? +limit : 10;
        const _search: string  = search as string ?? ''
        setQueryParam({page: nPage, limit: nLimit, search: _search})
        setProducts(getProduct((nPage -1),nLimit, _search))
    },[page, limit, isReady, getProduct, search])
    
    const paginatorLimit = useMemo(() => {
        const total = products?.total ?? 10
        return (Math.ceil(total / queryParam.limit))
    },[products?.total, queryParam.limit])


    const redirectTo = useMemo(() => {
        return `&limit=${queryParam.limit}&search=${queryParam.search}`
    },[queryParam.limit, queryParam.search])

    return useMemo(() => ({products, paginatorLimit, redirectTo, queryParam}),[products, paginatorLimit, redirectTo, queryParam])
}