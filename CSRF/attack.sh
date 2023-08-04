#!/bin/bash

if [ $# -ne 1 ]; then
    echo "Usage: $0 <token>"
    exit 1
fi

token="$1"

curl --cookie "cookie={\"token\":\"$token\"}" \
     -X POST \
     -H "Content-Type: application/json" \
     http://localhost:3000/api/post \
     -d '{"title":"Ive Been Hacked!", "content":"This post has been sent from another browser!", "email":"hacked.com", "id":"", "link":""}'
