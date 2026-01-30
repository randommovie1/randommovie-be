import {app} from "../server";
import {asyncHandler} from "../configs/middleware.config";
import axios from "axios";
import {StatusCodes} from "http-status-codes";

const PATH: string = 'geolocation'

interface IpApiResponse {
    "query": string | undefined,
    "status": string | undefined,
    "country": string | undefined,
    "countryCode": string | undefined,
    "region": string | undefined,
    "regionName": string | undefined,
    "city": string | undefined,
    "zip": string | undefined,
    "lat": number | undefined,
    "lon": number | undefined,
    "timezone": string | undefined,
    "isp": string | undefined,
    "org": string | undefined,
    "as": string | undefined
}

export function setup(): void {
    const API: string = process.env.IP_API_ENDPOINT!
    app.get(`/${PATH}/:ip`, asyncHandler(async (req, res) => {
        const ip: string | undefined = <string>req.params['ip'];
        if (ip !== undefined) {
            const ipApiResponse = await axios.get(`${API}${ip}`);
            const parsed: IpApiResponse = ipApiResponse.data as IpApiResponse;
            return res.json(parsed.countryCode);
        }
        res.sendStatus(StatusCodes.INTERNAL_SERVER_ERROR);
    }))
}