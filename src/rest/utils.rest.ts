import {app} from "../server";
import {asyncHandler} from "../configs/middleware.config";

const PATH: string = 'utils';

export function setup(): void {

    app.get(`/${PATH}/is-alive`, asyncHandler(async (req, res) => {
        console.log("I'm alive!");
        res.sendStatus(200);
    }))

}
