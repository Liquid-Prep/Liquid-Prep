import { Crop } from '../Crop';
import { BaseResponse } from './BaseResponse';

export class CropListResponse extends BaseResponse {
    data: Crop[];
}
