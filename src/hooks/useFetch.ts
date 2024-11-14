import { useEffect, useState } from "react";

type Data<T> = T | null;
type ErrorType = Error | null;

interface Params<T> {
	data: Data<T>;
	loading: boolean;
	error: ErrorType;
}

export const useFetch = <T>(url:string): Params<T> =>{
const [data, setData] = useState<Data<T>>(null);
const [loading, setLoading] = useState(false);
const [error, setError] = useState<ErrorType>(null);

useEffect(()=>{
	// const controller = new AbortController();
	
	setLoading(true)
	
	const fetchData = async () =>{
	try{
		const response = await fetch(url);
		
		if(!response.ok){
			throw new Error("Error en la peticion");
		}
		
		const jsonData: T = await response.json();
		
		setData(jsonData);
		setError(null)
		
	}catch(err){
		setError(err as Error)
	} finally {
		setLoading(false)
	}
}

fetchData();

return () => {
	// controller.abort()
}
},[url])
	return {data, loading, error}
}


