#!/usr/bin/env bash
set -euo pipefail

# 用法：./scripts/verify-pages.sh https://lockiyu.github.io/QingWedding/
url="${1:-}"
if [[ ! "$url" =~ ^https:// ]]; then
  echo "请提供完整的 HTTPS Pages 地址，例如 https://用户名.github.io/wedding/" >&2
  exit 1
fi
url="${url%/}/"
html="$(curl --fail --silent --show-error --location --max-time 20 "$url")"
if [[ "$html" != *'我们的纪念册'* ]]; then
  echo "网址可访问，但返回内容不是本项目的首页：$url" >&2
  exit 1
fi
asset_path="$(printf '%s' "$html" | sed -n 's/.*src="\([^"]*\/assets\/index-[^"]*\.js\)".*/\1/p' | head -1)"
if [[ -z "$asset_path" ]]; then
  echo "首页缺少构建后的 JavaScript 路径。" >&2
  exit 1
fi
origin="$(printf '%s' "$url" | sed -E 's#^(https://[^/]+).*#\1#')"
curl --fail --silent --show-error --location --output /dev/null --max-time 20 "${origin}${asset_path}"
echo "验证通过：首页和主脚本均可从公网访问。"
echo "$url"
