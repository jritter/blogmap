# Blogmap

## How to Build Container image

```bash
buildah bud -t blogmap:latest .
```

## How to run it with podman

```bash
podman run -p 8080:8080 --rm -d -i -t blogmap:latest
```

[![Container Repository on Quay](https://quay.io/repository/jritter/blogmap/status "Container Repository on Quay")](https://quay.io/repository/jritter/blogmap)
