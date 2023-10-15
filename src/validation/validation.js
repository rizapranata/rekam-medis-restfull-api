import { ResponseError } from "../error/response-error.js";

const validate = (schema, request) => {
    console.log("schema type:", schema.type);
    console.log("request validation:", request);
    const result = schema.validate(request, {
        abortEarly: false,
        allowUnknown: false //auto reject jika ada field yg tidak diketahui
    });
    if (result.error) {
        console.log("result error:", result.error);

        throw new ResponseError(400, result.error.message);
    }else{
        console.log("result value:", result.value);
        return result.value;
    }
}

export {
    validate // --> dipakai di service
}