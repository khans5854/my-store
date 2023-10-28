import { useRouter } from "next/router";
import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";

export const useHeader = () => {
    const [search , setSearch] = useState<string>('');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const router = useRouter();
  const isMounted = useRef(false);
  const handleClick = useCallback((event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  },[]);
  const handleClose = useCallback(() => {
    setAnchorEl(null);
  },[]);
  const searchHandler = useCallback((e: FormEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSearch(e.currentTarget.value)
  },[])
  useEffect(() => {
    if(!router.isReady) return 
    setSearch(router.query.search as string ?? '')
  },[router.isReady, router.query.search])
  useEffect(() => {
    let handler: ReturnType<typeof setTimeout>
    if(router.query.search === search) return
    if(isMounted.current){
       handler = setTimeout(() => {
        router.push({
          query: { ...router.query,page: 1, search: search },
       });
      }, 500);
    }
    return () => {
        clearTimeout(handler);
        isMounted.current = true;
    };
  },[search])

  return useMemo(() => ({search,searchHandler,handleClick,anchorEl, handleClose}),[search,searchHandler,handleClick, anchorEl, handleClose])
}