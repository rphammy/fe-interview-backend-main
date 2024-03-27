import axios from "axios";
import { Company } from "../../types";
export const useApi = () => {
  const baseURL = "http://localhost:3001"; //usually an env var

  const getCompanies = async (query: string) => {
    try {
      const response = await axios.get<Company[]>(
        `${baseURL}/search?_page=1&_limit=10&q=${query}`
      );
      return { data: response.data };
    } catch (error) {
      console.error(error); //replaced with actual logging
      return { error: "An error occured while fetching data" };
    }
  };

  const getStarredCount = async () => {
    try {
      const response = await axios.get<Company[]>(
        `${baseURL}/search?starred=true`
      );
      return { data: response.data, count: response.data.length };
    } catch (error) {
      console.error(error); //replaced with actual logging
      return { error: "An error occured while fetching data" };
    }
  };

  const updateStarred = async (id: string, starred: boolean) => {
    const body = {
      starred: starred,
    };

    const headers = {
      "Content-Type": "application/json",
    };

    try {
      await axios.patch<Company[]>(`${baseURL}/search/${id}`, body, {
        headers,
      });
      return { status: 200 };
    } catch (error) {
      console.error(error); //replaced with actual logging
      return { error: "An error occured while updating data" };
    }
  };

  return {
    getCompanies,
    getStarredCount,
    updateStarred,
  };
};
