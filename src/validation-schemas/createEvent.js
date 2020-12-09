const eventSchema = {
    "properties": {
        "contact_number": {
            "type": "string",
            "minLength": 3,
            "maxLength": 8,
        },
        "description": {
            "type": "string",
            "minLength": 10,
            "maxLength": 300,
        }
    }
}

export default eventSchema