local _M = {}  -- Make sure there is a SPACE after 'local' and no space inside {}

local jwt = require("resty.jwt")
local cjson = require("cjson")
local key = os.getenv("JWT_SECRET")

function _M.check()
    -- Get headers (using the more robust method)
   local headers = ngx.req.get_headers()
    local auth_header = headers["authorization"]

    if not auth_header then
        return nil, "Missing Auth Header"
    end

	local token = auth_header:match("[Bb]earer%s+(.+)")
    if not token then
        return nil, "Invalid Token format"
    end

    local secret_bytes = ngx.decode_base64(key)
    if not secret_bytes then
        secret_bytes = key or "default_secret_if_env_missing"
    end

    local jwt_obj = jwt:verify(secret_bytes, token)
    if not jwt_obj.verified then 
        ngx.log(ngx.ERR, "JWT verification failed: ", jwt_obj.reason)
        return nil, jwt_obj.reason
    end

    local payload = jwt_obj.payload
    
    local username = payload.sub
    local user_id = payload.user_id
    
    if not username then
        ngx.log(ngx.ERR, "Missing username (sub) in token")
        return nil, "Missing username (sub) in token"
    end
    if not user_id then
        ngx.log(ngx.ERR, "Missing user_id in token")
        return nil, "Missing user_id in token"
    end

    ngx.req.set_header("X-username", username)
    ngx.req.set_header("X-userId", tostring(user_id))

    return payload, nil
end 

return _M