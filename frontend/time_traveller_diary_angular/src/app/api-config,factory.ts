import { Configuration } from "@ydcodecraft/time_travellers_diary_api";
import { environment } from "../environments/environment";


export function apiConfigFactory(): Configuration {
    return new Configuration({
        basePath: environment.backend.uri
    })
}