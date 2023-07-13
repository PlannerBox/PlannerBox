import { Injectable } from "@nestjs/common";

@Injectable()
export class JsonResult {
    public static Success(data: any, message: string = null) {
        return {
            success: true,
            data: data,
            message: message
        }
    }

    public static Ok(message: string) {
        return {
            success: true,
            message: message
        }
    }
    public static Error(message: string) {
        return {
            success: false,
            message: message
        }
    }
}