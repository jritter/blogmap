# How to Build Docker image

```
buildah bud -t blogmap:latest .
```

# How to run it with podman

```
podman run -p 8080:80 --rm -d -i -t blogmap:latest
```
