import { useEffect, useRef, useState } from "react";

export interface InfiniteScrollOptions<T> {
    fetchItems: (page: number) => Promise<T[]>;
    initialPage?: number;
}

export const useInfiniteScroll = <T>({
    fetchItems,
    initialPage = 1,
}: InfiniteScrollOptions<T>) => {
    const [items, setItems] = useState<T[]>([]);
    const [page, setPage] = useState(initialPage);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const observerRef = useRef<HTMLDivElement | null>(null);

    const fetchMoreItems = async () => {
        setLoading(true);
        try {
            setError(null);
            const newItems = await fetchItems(page);
            setItems((prevItems) => [...prevItems, ...newItems]);
            setPage((prevPage) => prevPage + 1);
        // eslint-disable-next-line @typescript-eslint/no-unused-vars
        } catch (err) {
            setError("Veriler yüklenirken bir hata oluştu.")
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if(!observerRef.current) return;

        const observer = new IntersectionObserver(
            (entries) => {
                if(entries[0].isIntersecting && !loading) {
                    fetchMoreItems();
                }
            },
            {
                root: null,
                rootMargin: "0px",
                threshold: 1.0,
            }
        );
    
        observer.observe(observerRef.current);

        return() => {
            if(observerRef.current) observer.unobserve(observerRef.current);
        };
    
    }, [loading]);

    return { items , loading , error , observerRef};


}