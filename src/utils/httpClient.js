import process from "process";
import publicHttpClient from "./publicHttpClient";
import protectedHttpClient from "./protectedHttpClient";

export const get = (
	url,
	{ headers = {}, params = {}, responseType = "json" } = {},
	authenticate = false
) => {
	return authenticate
		? protectedHttpClient({
				method: "GET",
				url,
				params,
				responseType,
		  })
		: publicHttpClient({
				method: "GET",
				url,
				params,
				responseType,
		  });
};

export const post = (
	url,
	{ headers = {}, body = {}, params = {}, responseType = "json" } = {},
	authenticate = false
) => {
	return authenticate
		? protectedHttpClient({
				method: "POST",
				url,
				params,
				responseType,
				data: body,
		  })
		: publicHttpClient({
				method: "POST",
				url,
				params,
				responseType,
				data: body,
		  });
};

export const put = (
	url,
	{ headers = {}, body = {}, params = {}, responseType = "json" } = {},
	authenticate = false
) => {
	return authenticate
		? protectedHttpClient({
				method: "PUT",
				url,
				params,
				responseType,
				data: body,
		  })
		: publicHttpClient({
				method: "PUT",
				url,
				params,
				responseType,
				data: body,
		  });
};

export const remove = (
	url,
	{ headers = {}, params = {}, responseType = "json" } = {},
	authenticate = false
) => {
	return authenticate
		? protectedHttpClient({
				method: "DELETE",
				url,
				params,
				responseType,
		  })
		: publicHttpClient({
				method: "DELETE",
				url,
				params,
				responseType,
		  });
};

export const upload = (file) => {
	const baseUrl =
		process.env.REACT_APP_BASE_URL || "http://localhost:8080/api";

	return new Promise((resolve, reject) => {
		const xhttp = new XMLHttpRequest();
		const formData = new FormData();

		formData.append("csv", file, file.name);

		xhttp.onreadystatechange = () => {
			if (xhttp.readyState === 4) {
				if (xhttp.status === 200) {
					resolve(xhttp.response);
				} else {
					reject(xhttp.response);
				}
			}
		};

		xhttp.open(
			"POST",
			`${baseUrl}/artists/import/csv/?token=${localStorage.getItem(
				"token"
			)}`,
			true
		);
		xhttp.send(formData || null);
	});
};
