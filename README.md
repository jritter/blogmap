[![Docker Repository on Quay](https://quay.io/repository/jritter/blogmap/status "Docker Repository on Quay")](https://quay.io/repository/jritter/blogmap)

# How to Build Docker image

```
buildah bud -t blogmap:latest .
```

# How to run it with podman

```
podman run -p 8080:80 --rm -d -i -t blogmap:latest
```
