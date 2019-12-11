#!/bin/bash

curl https://itinerariodesconocido.ch/wp-json/wp/v2/posts?per_page=100 | jq > itinerario_desconocido_posts.json
