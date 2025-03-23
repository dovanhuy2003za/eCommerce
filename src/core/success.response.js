const StatusCode = {
    OK: 200,
    Created: 201
};

const ReasonStatusCode = {
    OK: "Success",
    Created: "Created"
};

class SuccessResponse {
    constructor(message, statusCode = StatusCode.OK, reasonStatusCode = ReasonStatusCode.OK, metadata = {}) {
        this.message = message || reasonStatusCode;
        this.status = statusCode;
        this.metadata = metadata;
    }

    send(res, headers = {}) {
        return res.status(this.status).set(headers).json(this);
    }
}

class OK extends SuccessResponse {
    constructor(message, metadata = {}) {
        super(message, StatusCode.OK, ReasonStatusCode.OK, metadata);
    }
}

class CREATED extends SuccessResponse {
    constructor(options={}, message, metadata = {}) {
        super(message, StatusCode.Created, ReasonStatusCode.Created, metadata)
        this.options =options
    }
}

module.exports = {
    OK,
    CREATED
};
