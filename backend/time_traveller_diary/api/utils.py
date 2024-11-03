from django.contrib.auth import authenticate
import json

import jwt
import requests

def jwt_get_username_from_payload_handler(payload):
    # map the sub field from the access_token to the username
    username = payload.get('sub').replace('|', '.')

    # map the remote user to the built in django system user for authentication
    authenticate(remote_user=username)
    return username


# retrieve JWT token from auth0 to verify against the incoming access token
def jwt_decode_token(token):
    header = jwt.get_unverified_header(token)
    jwks = requests.get('https://{}/.well-known/jwks.json'.format('dev-ydcodecraft.ca.auth0.com')).json()
    public_key = None
    for jwk in jwks['keys']:
        if jwk['kid'] == header['kid']:
            public_key = jwt.algorithms.RSAAlgorithm.from_jwk(json.dumps(jwk))

    if public_key is None:
        raise Exception('Public key not found.')

    issuer = 'https://{}/'.format('dev-ydcodecraft.ca.auth0.com')
    return jwt.decode(token, public_key, audience='https://resource/api', issuer=issuer, algorithms=['RS256'])