import axios, { AxiosResponse } from "axios";
import { AnswerWithData } from "../components/App.types";

export async function getPhotosByAxios(
  searchString: string,
  page: number = 1
): Promise<AxiosResponse> {
  const URL_KEY: string = "https://pixabay.com/api/";
  const myPIXABAY_KEY: string = "32936589-73134fb91afb2b55fe07bd374";
  const FILTER_PARAMETERS: string = `?key=${myPIXABAY_KEY}&q=${searchString}&image_type=photo&orientation=horizontal&safesearch=true&page=${page}&per_page=12`;
  const resp = await axios.get<AnswerWithData>(URL_KEY + FILTER_PARAMETERS);
  return resp;
}
