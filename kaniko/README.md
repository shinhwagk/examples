```yaml
apiVersion: v1
kind: Pod
metadata:
  name: kaniko
spec:
  nodeSelector:
    kubernetes.io/hostname: 'cp1.k8s.lanhai.com'
  hostAliases:
  - hostnames:
    - gk.io
    - nexus
    ip: 35.220.149.55
  containers:
  - name: kaniko
    image: gcr.io/kaniko-project/executor:latest
    args: ["--dockerfile=Dockerfile",
            "--context=/opt",
            "--destination=gk.io/centos:9"]
    volumeMounts:
      - name: docker-config
        mountPath: /kaniko/.docker/config.json
      - name: build
        mountPath: /opt
      - name: cert
        mountPath: /kaniko/ssl/certs/GK.crt
  restartPolicy: Never
  volumes:
  - name: docker-config
    hostPath:
      path: /root/.docker/config.json
      type: File
  - name: build
    hostPath:
      path: /tmp/test
      type: Directory
  - name: cert
    hostPath:
      path: /etc/pki/ca-trust/source/anchors/GK.crt
      type: File
```