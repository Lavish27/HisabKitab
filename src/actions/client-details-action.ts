import { ClientDetails } from 'src/app/Templates/client-details-model';
import { Action } from '.';

export const CLIENT_DETAILS_REQUEST = 'client details request';
export const CLIENT_DETAILS_SUCCESS = 'client details success';
export const CLIENT_DETAILS_FAILED = 'client details failed';

export class clientDetailsRequestAction implements Action{
    readonly type = CLIENT_DETAILS_REQUEST;
}

export class clientDetailsSuccessAction implements Action{
    readonly type = CLIENT_DETAILS_SUCCESS;
    constructor(public payload?: ClientDetails){

    }
}

export class clientDetailsFailedAction implements Action{
    readonly type = CLIENT_DETAILS_FAILED;
}
