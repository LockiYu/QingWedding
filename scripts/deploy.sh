#!/usr/bin/env bash
set -euo pipefail

# 用法：./scripts/deploy.sh "更新说明"
# 将改动提交到 main；GitHub Actions 负责构建与发布。
repo_root="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
cd "$repo_root"

if ! git rev-parse --is-inside-work-tree >/dev/null 2>&1; then
  echo "此目录还没有 Git 仓库。先按 README 的首次发布步骤连接 GitHub。" >&2
  exit 1
fi
if [[ "$(git branch --show-current)" != "main" ]]; then
  echo "当前不在 main 分支；请切换到 main 后再发布。" >&2
  exit 1
fi
if ! git remote get-url origin >/dev/null 2>&1; then
  echo "尚未设置 origin 远程仓库。" >&2
  exit 1
fi
if [[ -z "${1:-}" ]]; then
  echo "用法：./scripts/deploy.sh \"本次修改说明\"" >&2
  exit 1
fi

npm ci
npm test
npm run build

git add --all
if git diff --cached --quiet; then
  echo "没有需要发布的改动。"
  exit 0
fi
git commit -m "$1"
git push -u origin main
printf '\n已推送。GitHub Actions 将自动发布；请在仓库 Actions 中确认成功。\n'
