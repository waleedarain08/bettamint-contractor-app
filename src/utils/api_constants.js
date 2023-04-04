export const base_url = "https://api-sandbox.bettamint.com/api";
// export const base_url = "https://api-prod.bettamint.com/api";

export const PROJECT_GETALL_URL = "/dashboard/Project/getall";

export const responseHandle = (response) => {
	if (response && response?.data && response?.status === 200) {
		return response.data;
	}
};
