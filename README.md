# Blogmap

## How to Build Docker image

```bash
buildah bud -t blogmap:latest .
```

## How to run it with podman

```bash
podman run -p 8080:80 --rm -d -i -t blogmap:latest
```

[![Docker Repository on Quay](https://quay.io/repository/jritter/blogmap/status "Docker Repository on Quay")](https://quay.io/repository/jritter/blogmap)