# root ca
openssl genrsa -out ca.key 4096
openssl req -x509 -new -nodes -key ca.key -days 999 -out ca.pem

# server site 
openssl genrsa -out server.key 1024
openssl req -new -key server.key -out server.csr
openssl x509 -req -days 999 -in server.csr -CA ca.pem -CAkey ca.key -set_serial 01 -out server.pem

# client site 
openssl genrsa -out client.key 1024
openssl req -new -key client.key -out client.csr
openssl x509 -req -days 999 -in client.csr -CA ca.pem -CAkey ca.key -set_serial 01 -out client.pem