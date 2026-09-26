SHELL := /bin/bash

.PHONY: \
	push \
	sync \
	watch

current_dir:
	@echo -----------------------------
	@echo "current dir:"
	@echo "    $$(pwd)"
	@echo -----------------------------
	@echo


push:
	@git add . && (git commit -m "优化" || exit 0) \
		&& git push origin main

pull:
	@git pull origin main

sync:
	@sh sync-theme.sh

watch:
	@sh sync-theme.sh --watch

checkpoint: current_dir
	@if git diff --quiet && git diff --cached --quiet; then \
		echo "没有需要提交的变更"; \
	else \
		git add . && \
		git commit -m "checkpoint: 临时保存点 [$$(date +%Y%m%d-%H%M%S)]" && \
		echo "=== 已提交 ===" && \
		git --no-pager log -n 1; \
	fi

rollback: current_dir
	@echo "=== 警告：这将丢弃所有未提交的修改 ==="
	@echo "当前未提交的修改："
	@git status --short
	@echo ""
	@read -p "确定要丢弃所有修改吗？: " confirm && \
	if [ -z "$$confirm" ]; then \
		confirm="y"; \
	fi && \
	if [ "$$confirm" = "y" ] || [ "$$confirm" = "Y" ]; then \
		git checkout -- . && \
		echo "=== 回滚完成，工作区已清空 ===" && \
		git status; \
	else \
		echo "操作已取消"; \
	fi