#!/bin/sh
#
# 把本仓库的 SeeYue 主题同步到 Typora 主题目录。
#
#   sh sync-theme.sh              同步一次
#   sh sync-theme.sh --watch      常驻监听，css / 字体一改动就自动同步（Ctrl+C 退出）
#   TYPORA_THEMES_DIR=... sh sync-theme.sh    主题目录不在默认位置时用这个指定
#
# SeeYue 资源目录做镜像同步，目标端多余文件会被删掉。
# 只用 POSIX shell：macOS / Linux / WSL / Windows 的 Git Bash 都能跑。

set -eu

SRC=$(cd "$(dirname "$0")" && pwd)
ENTRIES="see-yue-dark.css see-yue-pure.css see-yue-salt.css"
INTERVAL=1

themes_dir() {
    if [ -n "${TYPORA_THEMES_DIR:-}" ]; then
        printf '%s\n' "$TYPORA_THEMES_DIR"
        return
    fi
    case $(uname -s) in
        Darwin)
            printf '%s\n' "$HOME/Library/Application Support/abnerworks.Typora/themes"
            ;;
        MINGW* | MSYS* | CYGWIN*)
            # Git Bash 里 $APPDATA 是反斜杠路径，转成 POSIX 路径 cp / find 才不会踩坑
            if command -v cygpath > /dev/null 2>&1; then
                printf '%s\n' "$(cygpath -u "$APPDATA")/Typora/themes"
            else
                printf '%s\n' "$APPDATA/Typora/themes"
            fi
            ;;
        *)
            printf '%s\n' "${XDG_CONFIG_HOME:-$HOME/.config}/Typora/themes"
            ;;
    esac
}

# 反斜杠统一成斜杠，免得 Windows 上手填 TYPORA_THEMES_DIR 时被下面的目录校验挡掉
DEST=$(themes_dir | tr '\\' '/')

# 镜像同步会删目标端的多余文件，先确认目标确实是 Typora 主题目录，避免手滑清错目录
case $DEST in
    *Typora/themes | *Typora/themes/) ;;
    *)
        echo "目标路径不像 Typora 主题目录，已中止：$DEST" >&2
        exit 1
        ;;
esac

if [ ! -d "$DEST" ]; then
    echo "Typora 主题目录不存在：$DEST" >&2
    echo "先在 Typora 里「偏好设置 → 外观 → 打开主题文件夹」，或用 TYPORA_THEMES_DIR 指定。" >&2
    exit 1
fi

sync() {
    rm -rf "$DEST/SeeYue"
    cp -R "$SRC/SeeYue" "$DEST/SeeYue"

    for f in $ENTRIES; do
        cp "$SRC/$f" "$DEST/$f"
    done

    echo "[$(date '+%H:%M:%S')] 已同步 -> $DEST"
}

if [ "${1:-}" != "--watch" ]; then
    sync
    echo '提示：Typora 里切换一次主题（或重启）即可看到效果。'
    exit 0
fi

MARKER=$(mktemp "${TMPDIR:-/tmp}/seeyue-sync.XXXXXX")
# 信号被捕获后默认的终止行为就没了，INT / TERM 得自己 exit，否则 Ctrl+C 退不掉
trap 'rm -f "$MARKER"' EXIT
trap 'exit' INT TERM

# 只要仓库里有文件比上次同步新，就重来一遍
stale() {
    [ -n "$(find "$SRC/SeeYue" -type f -newer "$MARKER" 2> /dev/null | head -n 1)" ] && return 0
    for f in $ENTRIES; do
        [ "$SRC/$f" -nt "$MARKER" ] && return 0
    done
    return 1
}

echo "监听中：$SRC"
echo "  Ctrl+C 退出"
echo

sync
touch "$MARKER"

while :; do
    sleep "$INTERVAL"
    if stale; then
        sync
        touch "$MARKER"
    fi
done
