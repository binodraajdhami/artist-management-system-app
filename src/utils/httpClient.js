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
