import axios, { AxiosError, AxiosResponse } from "axios"

export const fetchData = async <T>(): Promise<AxiosResponse<T> | undefined> => {
	try {
		const res = await axios.get("https://gist.githubusercontent.com/ondrejbartas/1d1f070808fe582475a752fd8dd9bc5c/raw/03ff2c97e5b9576017be7ad70fa345ecf7dafc94/example_data.json");

		return await res.data as AxiosResponse<T>;
	} catch (err) {
		const errMessage = (err as AxiosError).message;
		console.error(errMessage);
	}
}
